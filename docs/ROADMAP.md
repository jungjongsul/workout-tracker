# 운동 루틴 & 기록 대시보드 MVP 개발 로드맵

Notion 데이터베이스에 기록된 운동 데이터를 시각적 대시보드로 조회하여 운동 습관을 파악할 수 있는 개인 전용 웹 애플리케이션

## 개요

운동 루틴 & 기록 대시보드는 Notion으로 운동 기록을 관리하는 사용자를 위한 읽기 전용 대시보드로 다음 기능을 제공합니다:

- **Notion API 연동**: 서버 컴포넌트에서 직접 Notion 데이터베이스를 조회하여 운동 기록을 가져옴 (F001)
- **주간 요약 통계**: 이번 주 운동 일수, 총 운동 시간, 평균 운동 시간을 카드 형식으로 제공 (F002)
- **운동 기록 테이블**: 운동명, 종류, 세트/횟수, 날짜, 소요 시간, 기분을 테이블로 표시 (F003)
- **필터 기능**: 운동 종류(상체/하체/유산소/유연성) 및 기간(주간/월간) 필터링 (F004, F005)
- **에러/로딩 상태 처리**: API 실패 시 에러 안내 및 데이터 조회 중 스켈레톤 UI 표시 (F010, F011)

## 현재 프로젝트 상태

프로젝트 초기 설정이 완료된 상태이며, 기본적인 구조와 일부 컴포넌트가 구현되어 있습니다:

- Next.js 15.5.3 + TypeScript + TailwindCSS v4 + shadcn/ui 설정 완료
- Notion API 클라이언트 및 API 라우트 구현됨 (`/api/workouts`)
- 기본 타입 정의 완료 (`WorkoutRecord`, `WeeklyStats`, `FilterOptions`)
- 기본 대시보드 컴포넌트 구현됨 (`WeeklyStat`, `WorkoutList`)
- 현재 클라이언트 사이드 데이터 페칭 방식 사용 중 (PRD는 서버 컴포넌트 방식 명시)

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 완료 표시로 갱신

---

## 개발 단계

### Phase 1: 애플리케이션 구조 재설계 및 골격 구축

> 현재 클라이언트 사이드 데이터 페칭 구조를 PRD에 명시된 서버 컴포넌트 + URL searchParams 기반 아키텍처로 전환하고, 전체 라우트 구조와 타입 시스템을 정비합니다.

- **Task 001: 라우트 구조 재설계 및 페이지 골격 생성** - 우선순위
  - See: `/tasks/001-route-restructure.md`
  - PRD 기능: F001 (기반 구조)
  - `/workouts` 라우트를 메인 대시보드 페이지로 생성 (`app/workouts/page.tsx`)
  - 루트 `/` 페이지에서 `/workouts`로 리다이렉트 설정
  - `loading.tsx`, `error.tsx` 파일 골격 생성 (F010, F011 대비)
  - 대시보드 전용 레이아웃 컴포넌트 골격 구현 (`app/workouts/layout.tsx`)

- **Task 002: 타입 시스템 확장 및 데이터 모델 정비**
  - See: `/tasks/002-type-system.md`
  - PRD 기능: F001, F003 (데이터 모델)
  - PRD 데이터 모델에 맞게 `WorkoutRecord` 타입 확장 (`sets`, `reps`, `mood` 필드 추가)
  - `WorkoutSummary` 타입을 PRD 명세 기반으로 재정의 (`periodLabel` 필드 추가)
  - Notion API 응답 파서 업데이트 (새 필드 매핑)
  - Zod 스키마 동기화 (`workoutRecordSchema` 업데이트)
  - URL searchParams용 필터 타입 정의 (`exerciseType`, `period` 쿼리 파라미터)

### Phase 2: UI/UX 완성 (더미 데이터 활용)

> 실제 Notion API 연동 전에 하드코딩된 더미 데이터를 활용하여 모든 UI 컴포넌트와 사용자 플로우를 완성합니다.

- **Task 003: 더미 데이터 및 공통 유틸리티 구현**
  - See: `/tasks/003-dummy-data.md`
  - PRD 기능: F001, F002, F003 (데이터 기반)
  - 더미 운동 기록 데이터 생성 (`lib/mock/workout-data.ts`)
  - 더미 주간/월간 통계 데이터 생성
  - 날짜 관련 유틸리티 함수 작성 (주간/월간 시작일 계산, 날짜 포맷팅)
  - 통계 계산 유틸리티 분리 (API 라우트에서 순수 함수로 추출)

- **Task 004: 주간 요약 통계 카드 UI 리뉴얼**
  - See: `/tasks/004-weekly-stats-ui.md`
  - PRD 기능: F002
  - shadcn/ui Card 컴포넌트 활용하여 3개 통계 카드 재설계 (운동 일수, 총 시간, 평균 시간)
  - Lucide 아이콘 적용 (Calendar, Clock, TrendingUp 등)
  - 반응형 그리드 레이아웃 (모바일 1열, 태블릿 2열, 데스크톱 3열)
  - 데이터 없음 상태의 빈 카드 UI 구현
  - 스켈레톤 로딩 UI 개선 (F011)

- **Task 005: 운동 기록 테이블 UI 구현**
  - See: `/tasks/005-workout-table-ui.md`
  - PRD 기능: F003
  - 현재 카드 리스트를 PRD 명세에 맞는 테이블 형식으로 전환
  - shadcn/ui Table 컴포넌트 추가 및 적용
  - 테이블 컬럼: 날짜, 운동명, 종류(Badge), 세트, 횟수, 소요 시간, 기분(Badge)
  - "기록된 운동이 없습니다" 빈 상태 UI 구현
  - 테이블 스켈레톤 로딩 UI 구현 (F011)
  - 모바일 반응형 테이블 처리 (스크롤 또는 카드 전환)

- **Task 006: 필터 UI 컴포넌트 구현**
  - See: `/tasks/006-filter-ui.md`
  - PRD 기능: F004, F005
  - 운동 종류 필터: shadcn/ui Select 드롭다운 (전체/상체/하체/유산소/유연성)
  - 기간 필터: 버튼 토글 그룹 (전체/주간/월간)
  - 새로고침 버튼 구현 (Notion 데이터 재조회용)
  - 필터 상태를 URL searchParams로 반영 (`?type=상체&period=week`)
  - 필터 영역 반응형 레이아웃 (모바일: 세로 배치, 데스크톱: 가로 배치)

- **Task 007: 에러 UI 및 전체 페이지 조립**
  - See: `/tasks/007-error-ui-assembly.md`
  - PRD 기능: F010, F011
  - `error.tsx` 에러 바운더리 컴포넌트 구현 (에러 메시지 + 재시도 버튼)
  - `loading.tsx` 전체 페이지 스켈레톤 UI 구현
  - `not-found.tsx` 404 페이지 구현
  - 모든 컴포넌트를 `/workouts/page.tsx`에 조립하여 전체 대시보드 완성
  - 더미 데이터로 전체 사용자 플로우 검증 (요약 확인 -> 필터 변경 -> 목록 탐색)

### Phase 3: 핵심 기능 구현 (Notion API 연동)

> 더미 데이터를 실제 Notion API 호출로 교체하고, 필터 로직과 통계 계산을 서버 사이드로 전환합니다.

- **Task 008: 서버 컴포넌트 기반 Notion API 연동 전환** - 우선순위
  - See: `/tasks/008-rsc-notion-integration.md`
  - PRD 기능: F001
  - 현재 클라이언트 사이드 데이터 페칭(`useWorkoutData` 훅)을 서버 컴포넌트 직접 호출로 전환
  - `lib/api/notion.ts`의 `fetchWorkoutRecords()` 함수에 새 필드(sets, reps, mood) 파싱 추가
  - `/workouts/page.tsx`를 서버 컴포넌트로 전환하여 Notion API 직접 호출
  - 기존 `/api/workouts` API 라우트 유지 또는 제거 결정
  - Playwright MCP를 활용한 API 응답 검증 테스트

- **Task 009: URL searchParams 기반 필터 로직 구현**
  - See: `/tasks/009-filter-logic.md`
  - PRD 기능: F004, F005
  - 서버 컴포넌트에서 `searchParams`를 받아 Notion API 쿼리에 필터 적용
  - 운동 종류 필터: Notion API의 `filter` 파라미터로 Select 속성 필터링
  - 기간 필터: `date` 속성의 `on_or_after` 조건으로 주간/월간 범위 적용
  - 필터 변경 시 `router.push`로 URL 업데이트하여 서버 재렌더링 트리거
  - Playwright MCP로 필터 적용 후 데이터 변경 E2E 테스트

- **Task 010: 통계 계산 로직 서버 사이드 전환 및 검증**
  - See: `/tasks/010-stats-server-logic.md`
  - PRD 기능: F002
  - 주간/월간 통계 계산을 서버 사이드 순수 함수로 구현
  - 기간 필터에 따른 동적 통계 계산 (주간 선택 시 이번 주, 월간 선택 시 이번 달)
  - `periodLabel` 동적 생성 ("이번 주" / "이번 달")
  - 데이터 없는 경우의 통계 처리 (0 표시)
  - Playwright MCP로 통계 정확도 검증 테스트

- **Task 011: 에러 핸들링 강화 및 통합 테스트**
  - See: `/tasks/011-error-handling-integration.md`
  - PRD 기능: F010, F011
  - Notion API 실패 시 `error.tsx` 에러 바운더리 동작 검증
  - 환경변수 미설정 시 명확한 에러 메시지 표시
  - 네트워크 타임아웃 처리 및 재시도 안내
  - 서버 컴포넌트 Suspense 경계와 `loading.tsx` 연동 검증
  - Playwright MCP를 사용한 전체 사용자 플로우 E2E 테스트
    - 대시보드 진입 -> 주간 요약 확인 -> 필터 변경 -> 목록 확인
    - 에러 시나리오 테스트 (잘못된 토큰, DB ID 등)
    - 빈 데이터 상태 테스트

### Phase 4: 최적화 및 배포

> 성능 최적화, 접근성 개선, Vercel 배포 파이프라인을 구축합니다.

- **Task 012: 성능 최적화 및 캐싱 전략 구현**
  - See: `/tasks/012-performance-optimization.md`
  - Notion API 응답 캐싱 전략 구현 (Next.js `revalidate` 또는 `unstable_cache`)
  - 새로고침 버튼 클릭 시 캐시 무효화 (`revalidatePath` 활용)
  - 메타데이터 최적화 (title, description, OG 태그)
  - 번들 사이즈 분석 및 불필요한 의존성 제거

- **Task 013: 접근성 개선 및 최종 QA**
  - See: `/tasks/013-accessibility-qa.md`
  - 시맨틱 HTML 태그 적용 (nav, main, section, article)
  - ARIA 속성 추가 (테이블 aria-label, 필터 aria-describedby 등)
  - 키보드 네비게이션 지원 (Tab, Enter, Escape)
  - 다크 모드 대시보드 UI 검증
  - 반응형 디자인 최종 점검 (모바일, 태블릿, 데스크톱)
  - `npm run check-all` 및 `npm run build` 통과 확인

- **Task 014: Vercel 배포 및 환경 설정**
  - See: `/tasks/014-vercel-deployment.md`
  - Vercel 프로젝트 연결 및 환경변수 설정 (NOTION_TOKEN, NOTION_DATABASE_ID)
  - 프로덕션 빌드 검증
  - 배포 후 라이브 환경 동작 확인
  - `.env.example` 파일 작성 (환경변수 가이드)

---

## PRD 기능 매핑 요약

| PRD 기능 | 설명                | 구현 Task               |
| -------- | ------------------- | ----------------------- |
| F001     | Notion 데이터 조회  | Task 001, 002, 003, 008 |
| F002     | 주간 요약 통계      | Task 004, 010           |
| F003     | 운동 기록 목록 표시 | Task 002, 005           |
| F004     | 운동 종류 필터      | Task 006, 009           |
| F005     | 기간 필터           | Task 006, 009           |
| F010     | 에러 상태 처리      | Task 007, 011           |
| F011     | 로딩 상태 처리      | Task 004, 005, 007, 011 |

## 기술 스택 요약

| 분류         | 기술                                    | 용도                       |
| ------------ | --------------------------------------- | -------------------------- |
| Framework    | Next.js 15.5.3 (App Router + Turbopack) | 풀스택 프레임워크          |
| Runtime      | React 19.1.0 + TypeScript 5             | UI 렌더링 + 타입 안전성    |
| Styling      | TailwindCSS v4 + shadcn/ui (new-york)   | 유틸리티 CSS + UI 컴포넌트 |
| External API | @notionhq/client                        | Notion 데이터베이스 연동   |
| Validation   | Zod                                     | 스키마 검증                |
| Icons        | Lucide React                            | 아이콘 시스템              |
| Deployment   | Vercel                                  | 배포 플랫폼                |
