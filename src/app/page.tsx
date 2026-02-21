'use client'

import { Container } from '@/components/layout/container'
import { WeeklyStat } from '@/components/dashboard/weekly-stats'
import { WorkoutList } from '@/components/dashboard/workout-list'
import { useWorkoutData } from '@/lib/hooks/use-workout-data'

export default function Home() {
  const { records, weeklyStats, isLoading, error } = useWorkoutData()

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <main className="flex-1">
        <Container className="py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">운동 기록 대시보드</h1>
            <p className="mt-2 text-gray-600">
              Notion의 운동 데이터를 시각적으로 확인하세요
            </p>
          </div>

          {/* 에러 상태 표시 */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="font-semibold">오류 발생</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {/* 주간 통계 */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">이번 주 통계</h2>
            <WeeklyStat stats={weeklyStats} isLoading={isLoading} />
          </div>

          {/* 운동 기록 목록 */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">최근 운동 기록</h2>
            <WorkoutList records={records} isLoading={isLoading} />
          </div>
        </Container>
      </main>
    </div>
  )
}
