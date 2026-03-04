# Drawing Explorer

도면 탐색 및 컨텍스트 확인 사이트

![Screen+Recording+2026-03-04+at+10 30 45 PM](https://github.com/user-attachments/assets/13fe1c7a-086e-444d-9c6d-95b11d9a08aa)


## 실행 방법

```bash
npm install
npm run dev
```

## 기술 스택

- 언어
  - TypeScript
- 주요 라이브러리 및 프레임워크
  - React + Vite
  - 상태관리: Zustand
  - 스타일링: modern-normalize + styled-components + Tailwind CSS
  - UI 컴포넌트: Shadcn
- ETC
  - ESLint, Prettier

## 구현 기능

### 도면 리스트

  <img width="700"  alt="image" src="https://github.com/user-attachments/assets/4a74ba91-024f-4644-aadd-793d7095b02f" />
  
  - metadata.json의 정보를 테이블 형태로 보여줍니다.
  - 스위치를 통해 최신 도면 리스트만 볼 수 있습니다.
  - 각 행에는 도면 이름, 공종, 영역, 버전, 날짜, 설명, 최신/과거 상태가 표시됩니다.
  - 테이블의 행을 클릭하면 해당 리비전의 상세 정보를 모달로 보여줍니다.

### 도면 뷰어 모달

  <img width="700"  alt="image" src="https://github.com/user-attachments/assets/a04831ca-875c-4890-aebb-61dcde97bf4e" />
  
  - 도면 컨텍스트, 도면 이미지, 버전 이력을 보여줍니다.
  - 헤더에는 도면 이름과 함께 최신 리비전인 경우 latest 배지를 표시해 최신 상태인지 한눈에 파악할 수 있습니다.
  - 동일 도면/공종/영역의 버전 이력 리스트 표시 및 선택 전환
  - ESC 키 입력 / 닫기 버튼 및 오버레이 영역 클릭 시 모달이 닫힙니다.

### 버전 이력

  <img width="700"  alt="image" src="https://github.com/user-attachments/assets/85fd482b-ae4a-44a2-a225-b7cdca73b36f" />
  
  - 같은 도면·공종·영역에 속하는 리비전이 여러 개 있는 경우 아래의 UI를 보여줍니다.
    - 모달 좌측의 “버전 이력” 사이드 바
    - “변경 이력 추적” 버튼
  - 각 리비전은 카드 형태로 버전, 날짜, 설명, 최신 여부(latest 배지)를 보여줍니다.
  - 카드를 클릭하면 해당 리비전이 현재 선택 리비전으로 전환되고, 이미지와 컨텍스트 영역이 갱신됩니다.

## 미완성 기능

- [ ] 변경 이력 추적
- [ ] 공종 간 간섭 확인
