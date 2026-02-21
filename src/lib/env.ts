import { z } from 'zod'

// 환경변수 스키마 정의
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  // Notion API 관련 환경변수 (선택사항 - 런타임에만 필요)
  NOTION_TOKEN: z.string().optional(),
  NOTION_DATABASE_ID: z.string().optional(),
})

// 환경변수 파싱 및 검증
export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
})

// Notion 환경변수 검증 (API 라우트에서만 사용)
export function validateNotionEnv(): {
  notionToken: string
  notionDatabaseId: string
} {
  if (!env.NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN 환경변수가 설정되지 않았습니다')
  }
  if (!env.NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다')
  }
  return {
    notionToken: env.NOTION_TOKEN,
    notionDatabaseId: env.NOTION_DATABASE_ID,
  }
}

export type Env = z.infer<typeof envSchema>
