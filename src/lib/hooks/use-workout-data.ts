'use client'

import { useEffect, useState } from 'react'
import type { WorkoutRecord, WeeklyStats } from '@/types/notion'

// 운동 데이터 및 통계를 관리하는 커스텀 훅
export function useWorkoutData() {
  const [records, setRecords] = useState<WorkoutRecord[]>([])
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/workouts')
        if (!response.ok) {
          throw new Error('운동 데이터를 불러올 수 없습니다')
        }

        const data = await response.json()
        setRecords(data.records || [])
        setWeeklyStats(data.weeklyStats || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    records,
    weeklyStats,
    isLoading,
    error,
  }
}
