'use client'

import type { WeeklyStats } from '@/types/notion'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// 주간 통계 표시 컴포넌트
interface WeeklyStatsProps {
  stats: WeeklyStats | null
  isLoading: boolean
}

export function WeeklyStat({ stats, isLoading }: WeeklyStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-6 w-12" />
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500">
        <p>이번 주 운동 기록이 없습니다</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card className="p-4">
        <p className="text-sm text-gray-500">이번 주 운동 일수</p>
        <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
        <p className="text-xs text-gray-400">일</p>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-gray-500">총 운동 시간</p>
        <p className="text-2xl font-bold">{stats.totalDuration}</p>
        <p className="text-xs text-gray-400">분</p>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-gray-500">평균 운동 시간</p>
        <p className="text-2xl font-bold">
          {Math.round(stats.averageDuration)}
        </p>
        <p className="text-xs text-gray-400">분</p>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-gray-500">운동 종류</p>
        <p className="text-2xl font-bold">
          {
            Object.values(stats.workoutsByType).filter(count => count > 0)
              .length
          }
        </p>
        <p className="text-xs text-gray-400">종류</p>
      </Card>
    </div>
  )
}
