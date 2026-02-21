'use client'

import type { WorkoutRecord } from '@/types/notion'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// 운동 기록 목록 표시 컴포넌트
interface WorkoutListProps {
  records: WorkoutRecord[]
  isLoading: boolean
}

// 운동 종류별 배지 색상
const typeColors: Record<string, string> = {
  상체: 'bg-blue-100 text-blue-800',
  하체: 'bg-green-100 text-green-800',
  유산소: 'bg-red-100 text-red-800',
  유연성: 'bg-purple-100 text-purple-800',
}

// 날짜 포맷팅
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  })
}

export function WorkoutList({ records, isLoading }: WorkoutListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-4 w-48" />
          </Card>
        ))}
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>운동 기록이 없습니다</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {records.map(record => (
        <Card key={record.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{record.name}</h3>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${typeColors[record.type] || 'bg-gray-100 text-gray-800'}`}
                >
                  {record.type}
                </span>
              </div>
              <p className="text-sm text-gray-500">{formatDate(record.date)}</p>
              {record.notes && (
                <p className="mt-1 text-sm text-gray-600">{record.notes}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold">{record.duration}</p>
              <p className="text-xs text-gray-500">분</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
