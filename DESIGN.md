# **데이터 분석**

###   데이터 구조 파악 방법

-   데이터를 보다 잘 파악하기 위해 트리 구조로 정리하였습니다. 시각적으로 표현함으로써 필드 간 관계를 훨씬 잘 이해할 수 있었습니다.
    
    ```
    root
    ├── project
    │   ├── name: string (ex. "샘플 아파트 단지")
    │   └── unit: string (ex. "px")
    │
    ├── disciplines (전체 공종 목록)
    │   └── Array<{ name: string }>
    │
    └── drawings (도면 데이터)
        └── [drawingId] (ex. "01", "09")
            ├── id: string
            ├── name: string
            ├── image: string (도면 원본 파일명)
            ├── parent: string | null (상위 도면 ID)
            ├── position: Position | null (상위 도면에서 도면이 차지하는 영역)
            │   ├── vertices: number[][] (다각형 좌표)
            │   └── imageTransform: Transform (이미지 정렬 변환)
            │       ├── x, y: number
            │       ├── scale: number
            │       └── rotation: number
            │
            └── disciplines (도면 내 공종별 상세 데이터, 옵션)
                └── [disciplineName] (ex. "건축", "구조")
                    ├── image?: string (공종 자체의 도면 이미지)
                    │
                    ├── imageTransform?: Transform (공종 이미지를 기준 도면 위에 정렬하기 위한 변환)
                    │   ├── relativeTo: string (기준 이미지 파일명)
                    │   └── x, y, scale, rotation: number
                    │
                    ├── polygon?: Polygon (해당 공종이 다루는 관심 영역)
                    │   ├── vertices: Vertex[]
                    │   └── polygonTransform (폴리곤 렌더링 변환)
                    │       └── x, y, scale, rotation: number
                    │
                    ├── regions (하위 영역 분할, 옵션)
                    │   └── [regionName] (ex. "A")
                    │       ├── polygon: Polygon (해당 영역의 폴리곤 데이터)
                    │       └── revisions: Revision[] (해당 영역의 리비전 배열)
                    │
                    └── revisions?: Revision[] (리비전 이력 배열)
                        ├── version: string (ex. "REV1")
                        ├── image: string (리비전의 도면 이미지 파일명)
                        ├── date: string (발행일)
                        ├── description: string (리비전 설명)
                        ├── changes: string[] (변경 내역)
                        ├── imageTransform?: Transform (리비전 이미지 정렬 변환)
                        │   └── relativeTo, x, y, scale, rotation
                        └── polygon?: Polygon (리비전별 관심 영역)
                            └── vertices, polygonTransform
    
    ```
    
-   데이터 구조를 더 구체적으로 이해하기 위해 기능 구현 전에 먼저 타입을 정의하면서 이해도를 높였습니다.
    
    ```tsx
    // drawing.ts
    export interface Discipline {
      imageTransform?: Transform;
      image?: string;
      polygon?: Polygon;
      regions?: Record<string, Region>; // ex) "Region A": { ... }
      revisions?: Revision[];
    }
    
    export interface Drawing {
      id: string;
      name: string;
      image: string;
      parent: string | null;
      position: Position | null;
      disciplines?: Record<string, Discipline>;
    }
    ...
    ```
        
###   더 나은 데이터 표현 방법

-   **파일 분리**
    -   문제
        -   현재는 `metadata.json` 하나에 모든 정보가 담겨 있습니다. 도면이 많아질수록 JSON 파일 크기가 커져서 초기 로딩 성능이 저하됩니다.
    -   개선 제안 - 파일 분리
        -   파일을 다음과 같이 분리할 수 있습니다.
            
            ```
            metadata.json
            drawings/
             ├── 01.json
             ├── 02.json
             └── ...
            ```
            
        -   `metadata.json`: 프로젝트 전체 메타데이터 및 도면 목록(ID / 이름)만 포함
            
        -   `/drawings/n.json`: n번 도면의 상세 데이터
            
    -   장점
        -   사용자가 특정 도면을 클릭할 때만 해당 JSON을 로드(lazy loading)하여 초기 로딩 속도를 개선할 수 있습니다.


# **접근 방식**

과제를 아래 순서로 진행했습니다.

1.  명세 분석 → 목표 파악 및 문제 정의
2.  유사 서비스들 리서치(도면 관리 서비스)
3.  리서치를 바탕으로 UI/UX 설계
4.  구현할 기능 및 UI 리스트업
5.  프로젝트 설정
6.  기능 구현

# **UI 설계 결정**

### 설계 목표
-   과제의 핵심 목표를 "사용자가 원하는 정보에 빠르게 도달할 수 있게 한다"로 정의했습니다.
-   이를 위해 복잡한 데이터가 잘 정리되어 최대한 깔끔하고 직관적인 디자인이 필요하다고 판단했습니다.

###   선택한 레이아웃
-   **도면 리스트**
    -   도면 리비전 데이터를 테이블로 표현하여 다양한 정보를 가독성 있게 확인할 수 있습니다.
    -   Badge를 통해 도면의 최신 여부를 즉시 파악할 수 있습니다.

-   **도면 뷰어 모달**
    -   도면 리스트에서 도면 클릭 시 모달로 상세 정보를 표시했습니다.
    -   모달이 아닌 전체 화면도 고려했지만, 현장에서 가볍게 확인하는 사용자 입장에서는 전체 화면이 부담스럽게 느껴질 수 있다고 판단했습니다.
    -   모달은 화면 전환 없이 빠르게 확인하고 닫을 수 있어 더 적합하다고 생각했습니다.
    -   모달 내에는 컨텍스트 정보와 도면 이미지를 함께 배치하고, 동일 도면의 버전 이력 리스트를 제공해 버전 간 빠른 비교가 가능하도록 했습니다.
    -   Badge를 통해 도면의 최신 여부를 바로 파악할 수 있도록 하였습니다.



# **기술 선택**
    
### 상태 관리 - Zustand

-   기준
    
    -   크기
        -   전역으로 관리할 상태가 많지 않기 때문에, 많은 기능이 있는 라이브러리보다 가벼운 Zustand가 적합하다고 판단
    -   사용 난이도
    -   러닝 커브
-   선택 이유
    
    -   크기가 작음
    -   API 구조가 단순 → 사용 간단
    -   러닝 커브가 낮음
    
    → 빠르게 도입 및 적용
        
###   css 초기화 - modern-normalize

-   기준
    -   크기
    -   브라우저 지원 범위
-   선택 이유
    -   normalize.css보다 파일 크기가 작음
    -   최신 브라우저 지원
###   스타일링 - styled-components + Tailwind CSS

-   기준
    -   사용 난이도
    -   유지보수성
-   선택 이유
    -   styled-components
        -   익숙한 도구 → 빠른 구현 가능
        -   컴포넌트 이름으로 빠르게 역할 파악 가능
    -   Tailwind CSS
        -   사용 난도 낮음
        -   클래스 작명 필요 없음 → 빠른 개발 속도
        -   shadcn 사용 시 필수
     

-   스타일이 단순할 때 → Tailwind
-   적용할 스타일이 많을 때 → styled-components


###   UI 컴포넌트 - Shadcn

-   기준
    -   러닝 커브
    -   커스터마이징
    -   크기
-   선택 이유
    -   러닝 커브 낮음
    -   커스터마이징 용이
    -   필요한 컴포넌트만 추가하는 구조라 불필요한 코드 없음 → 크기 작음
    -   사용 난도 낮음

# **어려웠던 점 및 개선 방안**

###   어려웠던 점
-   **낯선 용어**
    -   건축 관련 용어가 익숙하지 않아서 명세를 처음 읽었을 때 문제를 파악하는 데에 시간이 걸렸습니다.
    -   명세의 ‘용어 설명’을 통해 용어를 익히니까 문제 이해가 수월해졌습니다.

-   **복잡한 데이터 분석**
    -   계층이 깊고 복잡한 데이터 구조를 파악하기 위해 전체 필드를 트리 구조로 정리했습니다.
    -   구조를 시각화하니 필드 간의 관계가 한눈에 들어와서 데이터 파악이 수월해졌습니다.

-   **UI/UX 설계**
    -   도메인이 낯설어서 UI/UX를 어떻게 설계해야 할지 감을 잡기 어려웠습니다.
    -   유사 서비스들을 리서치하고, Lovable로 프로토타입을 만들었습니다.
    -   이를 통해 혼자서는 생각하지 못했던 좋은 아이디어를 얻을 수 있었고, UI 설계하는 데에 도움이 되었습니다.

###   개선 방안

-   반응형 적용

-   **도면 목록 화면**
    -   공종별 필터 (전체 / 건축 / 구조 / 설비 등)
    -   도면별 펼치기 / 접기 기능
    -   도면 검색 기능
    -   날짜 순 정렬
    -   즐겨찾기
-   **도면 뷰어**
    -   변경 이력 추적
    -   공종 간 간섭 확인
    -   전체 화면 보기
        -   확대 / 축소
-   **코드**
    -   리팩토링
