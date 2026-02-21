# 🏋️ Workout Tracker

운동 기록 대시보드 - Notion 데이터베이스를 활용한 시각적 운동 관리 도구

## 📋 개요

**Workout Tracker**는 Notion 데이터베이스에 저장된 운동 데이터를 시각적 대시보드로 보여주는 Next.js 기반 웹 애플리케이션입니다. 주간 운동 통계, 운동 기록 목록, 운동 종류별 필터링을 제공합니다.

## ✨ 주요 기능

- **F001**: Notion API를 통한 운동 데이터 조회
- **F002**: 주간 요약 통계 (운동 일수, 총 시간, 평균 시간)
- **F003**: 운동 기록 목록 (테이블 형식)
- **F004**: 운동 종류 필터 (상체/하체/유산소/유연성)
- **F005**: 기간 필터 (주간/월간)
- **F010**: 에러 상태 처리
- **F011**: 로딩 상태 처리 (스켈레톤 UI)

## 🛠️ 기술 스택

| 항목            | 버전                           |
| --------------- | ------------------------------ |
| Next.js         | 15.5.3 (App Router, Turbopack) |
| React           | 19.1.0                         |
| TypeScript      | 5 (strict mode)                |
| TailwindCSS     | v4                             |
| shadcn/ui       | latest (new-york style)        |
| Notion SDK      | ^3.1.3                         |
| Zod             | ^4.1.11                        |
| React Hook Form | ^7.63.0                        |

## 🚀 시작하기

### 전제 조건

- Node.js 18+ 필요
- npm 또는 yarn, pnpm

### 1. 저장소 클론

```bash
git clone <repository-url>
cd workout-tracker
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일 편집:

```bash
# Notion API 설정
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

**Notion API 자격증명 얻는 방법:**

1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지 방문
2. "+ New integration" 클릭
3. 통합 생성 및 "Internal Integration Token" 복사
4. 데이터베이스 공유 및 ID 확인

### 4. 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000`에서 애플리케이션 실행 확인

## 📚 Notion 데이터베이스 구조

다음 필드를 가진 Notion 데이터베이스를 생성하세요:

| 필드명 | 타입      | 필수 | 설명                       |
| ------ | --------- | ---- | -------------------------- |
| 날짜   | Date      | ✅   | 운동 날짜                  |
| 운동명 | Title     | ✅   | 운동 이름                  |
| 종류   | Select    | ✅   | 상체, 하체, 유산소, 유연성 |
| 시간   | Number    | ✅   | 운동 시간 (분)             |
| 메모   | Rich Text | ❌   | 추가 메모                  |

## 📖 명령어

```bash
# 개발 서버 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 검사
npm run typecheck

# ESLint 검사
npm run lint

# 자동 수정
npm run lint:fix

# 포맷 확인
npm run format:check

# 자동 포맷팅
npm run format

# 모든 검사 실행 (추천)
npm run check-all
```

## 🏗️ 프로젝트 구조

```
src/
├── app/                      # Next.js 페이지 및 라우팅
│   ├── api/workouts/         # Notion 데이터 조회 API
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # 대시보드 홈페이지
│   └── globals.css           # 전역 스타일
├── components/
│   ├── dashboard/            # 대시보드 컴포넌트
│   │   ├── weekly-stats.tsx  # 주간 통계
│   │   └── workout-list.tsx  # 운동 기록 목록
│   ├── ui/                   # shadcn/ui 컴포넌트
│   ├── layout/               # 레이아웃 컴포넌트
│   ├── providers/            # Context 프로바이더
│   └── theme-toggle.tsx      # 테마 토글
├── lib/
│   ├── api/notion.ts         # Notion API 클라이언트
│   ├── hooks/                # 커스텀 훅
│   ├── schemas/              # Zod 스키마
│   ├── env.ts                # 환경변수 검증
│   └── utils.ts              # 유틸리티
└── types/
    └── notion.ts             # TypeScript 타입
```

## 💡 개발 가이드

자세한 초기화 및 개발 가이드는 `docs/INITIALIZATION.md`를 참고하세요.

## 🔌 API 엔드포인트

### GET /api/workouts

운동 기록 및 주간 통계를 조회합니다.

**응답 예시:**

```json
{
  "success": true,
  "records": [...],
  "weeklyStats": {
    "totalWorkouts": 5,
    "totalDuration": 300,
    "averageDuration": 60
  }
}
```

## 🐛 문제 해결

### 환경변수 오류

```bash
# .env.local 파일 생성 확인
# 캐시 정리 후 재실행
rm -rf .next
npm run dev
```

### Notion API 오류

- API 토큰이 유효한지 확인
- 데이터베이스 ID가 정확한지 확인
- 통합이 데이터베이스에 공유되었는지 확인

### 포트 충돌

```bash
npm run dev -- -p 3001
```

## 📝 코딩 규칙

- **TypeScript**: strict mode 활성화, `any` 타입 금지
- **파일명**: kebab-case (예: `weekly-stats.tsx`)
- **컴포넌트**: PascalCase (예: `WeeklyStat`)
- **변수/함수**: camelCase (예: `fetchWorkoutRecords`)
- **최대 줄 수**: 300줄 유지

자세한 규칙은 `CLAUDE.md`를 참고하세요.

## 🚢 배포

Vercel에 배포하기 (권장):

```bash
npm install -g vercel
vercel
```

배포 환경 변수 설정:

1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables
3. `NOTION_TOKEN`, `NOTION_DATABASE_ID` 추가

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org)
- [Notion API 가이드](https://developers.notion.com)
- [React 공식 문서](https://react.dev)
- [TypeScript 공식 문서](https://www.typescriptlang.org)
- [TailwindCSS 공식 문서](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🤝 기여

개선 사항이나 버그 제보는 Issues를 통해 알려주세요.

---

**Happy Tracking!** 🎯
