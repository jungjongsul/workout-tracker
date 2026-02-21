// Notion API 클라이언트 및 유틸리티

import { Client } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { validateNotionEnv } from '@/lib/env'
import type { WorkoutRecord } from '@/types/notion'

// Notion 클라이언트 초기화 (동적)
let notionClientInstance: Client | null = null

function getNotionClient(): Client {
  if (!notionClientInstance) {
    const { notionToken } = validateNotionEnv()
    notionClientInstance = new Client({
      auth: notionToken,
    })
  }
  return notionClientInstance
}

export { getNotionClient as notionClient }

// 타입 가드 함수들
function isDateProperty(prop: unknown): prop is {
  type: 'date'
  date: { start: string; end: string | null } | null
} {
  if (typeof prop !== 'object' || prop === null) return false
  return (prop as Record<string, unknown>).type === 'date'
}

function isTitleProperty(prop: unknown): prop is {
  type: 'title'
  title: Array<{ plain_text: string }>
} {
  if (typeof prop !== 'object' || prop === null) return false
  return (prop as Record<string, unknown>).type === 'title'
}

function isSelectProperty(prop: unknown): prop is {
  type: 'select'
  select: { name: string } | null
} {
  if (typeof prop !== 'object' || prop === null) return false
  return (prop as Record<string, unknown>).type === 'select'
}

function isNumberProperty(prop: unknown): prop is {
  type: 'number'
  number: number | null
} {
  if (typeof prop !== 'object' || prop === null) return false
  return (prop as Record<string, unknown>).type === 'number'
}

function isRichTextProperty(prop: unknown): prop is {
  type: 'rich_text'
  rich_text: Array<{ plain_text: string }>
} {
  if (typeof prop !== 'object' || prop === null) return false
  return (prop as Record<string, unknown>).type === 'rich_text'
}

// Notion 데이터베이스에서 운동 기록 조회
export async function fetchWorkoutRecords(): Promise<WorkoutRecord[]> {
  try {
    const { notionDatabaseId } = validateNotionEnv()
    const client = getNotionClient()

    const response = await client.databases.query({
      database_id: notionDatabaseId,
      sorts: [
        {
          property: '날짜',
          direction: 'descending',
        },
      ],
    })

    // Notion 페이지를 WorkoutRecord로 변환
    const records = response.results
      .map(page => {
        if (page.object !== 'page' || !('properties' in page)) {
          return null
        }

        const pageWithProps = page as PageObjectResponse
        const properties = pageWithProps.properties as Record<string, unknown>

        // 필수 필드 추출
        const dateProperty = properties['날짜']
        const nameProperty = properties['운동명']
        const typeProperty = properties['종류']
        const durationProperty = properties['시간']

        if (
          !dateProperty ||
          !nameProperty ||
          !typeProperty ||
          !durationProperty
        ) {
          console.warn('필수 필드 누락:', page.id)
          return null
        }

        // 속성 값 추출 (타입 가드 사용)
        let date: string | null = null
        if (isDateProperty(dateProperty) && dateProperty.date?.start) {
          date = dateProperty.date.start
        }

        let name: string | null = null
        if (isTitleProperty(nameProperty) && nameProperty.title.length > 0) {
          name = nameProperty.title[0].plain_text
        }

        let type: string | null = null
        if (isSelectProperty(typeProperty) && typeProperty.select?.name) {
          type = typeProperty.select.name
        }

        let duration: number | null = null
        if (
          isNumberProperty(durationProperty) &&
          durationProperty.number !== null
        ) {
          duration = durationProperty.number
        }

        if (!date || !name || !type || duration === null) {
          console.warn('데이터 파싱 실패:', page.id)
          return null
        }

        // 메모 속성 추출
        let notes: string | undefined
        const notesProperty = properties['메모']
        if (
          isRichTextProperty(notesProperty) &&
          notesProperty.rich_text.length > 0
        ) {
          notes = notesProperty.rich_text[0].plain_text
        }

        return {
          id: page.id,
          date,
          name,
          type,
          duration,
          notes,
          createdAt: pageWithProps.created_time,
        } as WorkoutRecord
      })
      .filter((record): record is WorkoutRecord => record !== null)

    return records
  } catch (error) {
    console.error('Notion 데이터 조회 실패:', error)
    throw new Error('운동 기록을 불러올 수 없습니다')
  }
}
