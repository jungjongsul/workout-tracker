import { NextResponse } from 'next/server'
import { fetchWorkoutRecords } from '@/lib/api/notion'
import type { WeeklyStats, WorkoutRecord } from '@/types/notion'

// 주간 통계 계산 함수
function calculateWeeklyStats(records: WorkoutRecord[]): WeeklyStats | null {
  if (records.length === 0) {
    return null
  }

  // 이번 주 시작 날짜 계산 (월요일 기준)
  const today = new Date()
  const dayOfWeek = today.getDay()
  const diffToMonday = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  const weekStartDate = new Date(today.setDate(diffToMonday))
  weekStartDate.setHours(0, 0, 0, 0)

  // 이번 주 기록만 필터링
  const weekRecords = records.filter(record => {
    const recordDate = new Date(record.date)
    return recordDate >= weekStartDate
  })

  // 통계 계산
  const totalWorkouts = weekRecords.length
  const totalDuration = weekRecords.reduce(
    (sum, record) => sum + record.duration,
    0
  )
  const averageDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0

  // 운동 종류별 카운트
  const workoutsByType = {
    상체: 0,
    하체: 0,
    유산소: 0,
    유연성: 0,
  } as Record<string, number>

  weekRecords.forEach(record => {
    if (record.type in workoutsByType) {
      workoutsByType[record.type]++
    }
  })

  return {
    weekStartDate: weekStartDate.toISOString(),
    totalWorkouts,
    totalDuration,
    averageDuration,
    workoutsByType,
  }
}

// GET /api/workouts - 운동 기록 및 통계 조회
export async function GET() {
  try {
    // Notion에서 운동 기록 조회
    const records = await fetchWorkoutRecords()

    // 주간 통계 계산
    const weeklyStats = calculateWeeklyStats(records)

    return NextResponse.json({
      success: true,
      records,
      weeklyStats,
    })
  } catch (error) {
    console.error('API 에러:', error)
    return NextResponse.json(
      {
        success: false,
        error: '운동 기록을 불러올 수 없습니다',
      },
      { status: 500 }
    )
  }
}
