// Notion 관련 타입 정의

// 운동 유형
export type ExerciseType = '상체' | '하체' | '유산소' | '유연성'

// 운동 기록 데이터
export interface WorkoutRecord {
  id: string
  date: string // ISO 8601 형식
  name: string // 운동 이름
  type: ExerciseType
  duration: number // 분 단위
  notes?: string
  createdAt: string
}

// 주간 통계
export interface WeeklyStats {
  weekStartDate: string // ISO 8601 형식
  totalWorkouts: number
  totalDuration: number // 분 단위
  averageDuration: number // 분 단위
  workoutsByType: Record<ExerciseType, number>
}

// 필터 옵션
export interface FilterOptions {
  exerciseType?: ExerciseType | 'all'
  period: 'week' | 'month'
  startDate?: string
  endDate?: string
}

// API 응답
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
