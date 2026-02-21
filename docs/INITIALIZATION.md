# 프로젝트 초기화 가이드

## 프로젝트 개요

**workout-tracker**는 Notion 데이터베이스에 저장된 운동 기록을 시각적으로 보여주는 Next.js 기반 대시보드입니다.

## 초기화 상태

프로젝트는 다음과 같이 최적화되어 있습니다:

### 제거된 항목

- ✅ 스타터 템플릿 데모 페이지 (로그인, 회원가입)
- ✅ 데모 섹션 컴포넌트 (hero, features, cta)
- ✅ 데모 헤더, 푸터, 네비게이션 컴포넌트
- ✅ 불필요한 Radix UI 패키지 (avatar, navigation-menu, progress)

### 추가된 항목

- ✅ Notion SDK 클라이언트 (`@notionhq/client@^3.1.3`)
- ✅ 타입 정의 (`src/types/notion.ts`)
- ✅ 스키마 정의 (`src/lib/schemas/workout.ts`)
- ✅ Notion API 유틸리티 (`src/lib/api/notion.ts`)
- ✅ 커스텀 훅 (`src/lib/hooks/use-workout-data.ts`)
- ✅ API 라우트 (`src/app/api/workouts/route.ts`)
- ✅ 대시보드 컴포넌트 (`src/components/dashboard/`)
- ✅ 환경변수 설정 (`.env.example`)

## 프로젝트 구조

```
workout-tracker/
├── src/
│   ├── app/
│   │   ├── api/workouts/route.ts      # API 엔드포인트 (운동 데이터 조회)
│   │   ├── layout.tsx                 # 루트 레이아웃
│   │   ├── page.tsx                   # 대시보드 홈페이지
│   │   └── globals.css                # 전역 스타일
│   ├── components/
│   │   ├── dashboard/                 # 대시보드 컴포넌트
│   │   │   ├── weekly-stats.tsx       # 주간 통계 표시
│   │   │   └── workout-list.tsx       # 운동 기록 목록
│   │   ├── layout/
│   │   │   └── container.tsx          # 컨테이너 래퍼
│   │   ├── providers/
│   │   │   └── theme-provider.tsx     # 테마 프로바이더
│   │   ├── ui/                        # shadcn/ui 컴포넌트
│   │   └── theme-toggle.tsx           # 테마 토글
│   ├── lib/
│   │   ├── api/
│   │   │   └── notion.ts              # Notion API 클라이언트
│   │   ├── hooks/
│   │   │   └── use-workout-data.ts    # 데이터 페칭 훅
│   │   ├── schemas/
│   │   │   └── workout.ts             # Zod 스키마
│   │   ├── env.ts                     # 환경변수 검증
│   │   └── utils.ts                   # 유틸리티 함수
│   ├── types/
│   │   └── notion.ts                  # TypeScript 타입 정의
│   └── styles/                        # 전역 스타일 (선택사항)
├── public/                            # 정적 자산
├── docs/                              # 프로젝트 문서
├── .env.example                       # 환경변수 예제
├── package.json                       # 의존성 및 스크립트
└── tsconfig.json                      # TypeScript 설정

```

## 개발 준비하기

### 1. 환경변수 설정

`.env.local` 파일을 생성하고 Notion API 자격증명을 입력하세요:

```bash
cp .env.example .env.local
```

```bash
# .env.local 편집
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

**Notion API 자격증명 얻는 방법:**

1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지 방문
2. "+ New integration" 클릭
3. 통합 이름 입력 및 생성
4. "Internal Integration Token" 복사 → `NOTION_TOKEN`
5. 데이터베이스 공유 및 ID 확인 → `NOTION_DATABASE_ID`

### 2. Notion 데이터베이스 구조

다음 필드로 Notion 데이터베이스를 구성하세요:

| 필드명 | 타입   | 설명                    |
| ------ | ------ | ----------------------- |
| 날짜   | Date   | 운동 날짜               |
| 운동명 | Title  | 운동 이름               |
| 종류   | Select | 상체/하체/유산소/유연성 |
| 시간   | Number | 운동 시간 (분)          |
| 메모   | Text   | 추가 메모 (선택사항)    |

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 주요 명령어

```bash
# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 검사
npm run typecheck

# ESLint 검사
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier 포맷팅 확인
npm run format:check

# Prettier 자동 포맷팅
npm run format

# 모든 검사 실행 (추천)
npm run check-all
```

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router, Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui
- **External API**: @notionhq/client (Notion SDK)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Validation**: Zod
- **Dev Tools**: ESLint, Prettier, Husky, lint-staged

## 코딩 규칙

### TypeScript

- Strict mode 활성화
- `any` 타입 금지
- 모든 함수 파라미터에 명시적 타입 지정

### 네이밍

- 파일명: kebab-case (예: `weekly-stats.tsx`)
- 컴포넌트: PascalCase (예: `WeeklyStat`)
- 변수/함수: camelCase (예: `fetchWorkoutRecords`)
- 상수: UPPER_SNAKE_CASE (예: `MAX_RETRY_COUNT`)

### 컴포넌트

- 기본적으로 서버 컴포넌트 사용
- `"use client"` 지시어는 브라우저 API/훅 필요 시에만 사용
- 컴포넌트는 최대 300줄 유지

### 임포트

```typescript
// 1. 외부 라이브러리
import React from 'react'

// 2. 내부 라이브러리 (@/ 경로)
import { Button } from '@/components/ui/button'
import { fetchWorkoutRecords } from '@/lib/api/notion'

// 3. 스타일
import './component.css'
```

## API 엔드포인트

### GET /api/workouts

운동 기록 및 주간 통계를 조회합니다.

**응답:**

```json
{
  "success": true,
  "records": [
    {
      "id": "notion-page-id",
      "date": "2025-02-22T00:00:00.000Z",
      "name": "운동명",
      "type": "상체",
      "duration": 60,
      "notes": "메모",
      "createdAt": "2025-02-22T10:30:00.000Z"
    }
  ],
  "weeklyStats": {
    "weekStartDate": "2025-02-17T00:00:00.000Z",
    "totalWorkouts": 5,
    "totalDuration": 300,
    "averageDuration": 60,
    "workoutsByType": {
      "상체": 2,
      "하체": 1,
      "유산소": 2,
      "유연성": 0
    }
  }
}
```

## 개발 팁

### 환경변수 오류

빌드 시 `NOTION_TOKEN` 또는 `NOTION_DATABASE_ID` 오류가 발생하면:

1. `.env.local` 파일 생성 확인
2. 환경변수 올바르게 입력 확인
3. `.next` 캐시 삭제: `rm -rf .next`

### Notion API 오류

런타임에 Notion API 오류가 발생하면:

1. API 토큰이 유효한지 확인
2. 데이터베이스 ID가 정확한지 확인
3. 통합이 데이터베이스에 공유되었는지 확인
4. 필드명이 정확한지 확인 (한글 대소문자 주의)

### 포트 충돌

3000 포트가 사용 중이면:

```bash
npm run dev -- -p 3001
```

## 다음 단계

1. **필터링 기능**: 운동 종류별/기간별 필터 추가
2. **통계 차트**: 그래프 라이브러리(recharts 등) 추가
3. **데이터 추가/수정**: 대시보드에서 Notion 데이터 수정 기능
4. **인증**: 사용자 인증 추가 (선택사항)
5. **배포**: Vercel 배포 설정

## 문제 해결

### 빌드 실패

```bash
# 캐시 정리 후 다시 빌드
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### 타입 에러

```bash
npm run typecheck
```

### 포맷팅 에러

```bash
npm run format
```

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org)
- [Notion API 가이드](https://developers.notion.com)
- [React 공식 문서](https://react.dev)
- [TypeScript 공식 문서](https://www.typescriptlang.org)
- [TailwindCSS 공식 문서](https://tailwindcss.com)
- [shadcn/ui 컴포넌트 라이브러리](https://ui.shadcn.com)

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
