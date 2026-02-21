import { z } from 'zod'

// 운동 기록 스키마
export const workoutRecordSchema = z.object({
  id: z.string(),
  date: z.string().datetime(),
  name: z.string().min(1, '운동 이름은 필수입니다'),
  type: z.enum(['상체', '하체', '유산소', '유연성']),
  duration: z.number().positive('운동 시간은 양수여야 합니다'),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
})

export type WorkoutRecord = z.infer<typeof workoutRecordSchema>

// 필터 옵션 스키마
export const filterOptionsSchema = z.object({
  exerciseType: z
    .enum(['상체', '하체', '유산소', '유연성', 'all'])
    .default('all'),
  period: z.enum(['week', 'month']).default('week'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

export type FilterOptions = z.infer<typeof filterOptionsSchema>
