# lxmdi-mi-portal-home-frontend
## 설치 및 실행

#### 1. yarn 설치

yarn이 설치되어 있는 경우 해당 과정 생략합니다.

```
npm install --global yarn
```

#### 2. yarn berry로 버전업

```
yarn set version berry
```

📍 yarn 버전 변경 방법

```
yarn set version <classic | berry>
```

#### 3. Vscode 설정

##### 3-1. ZipFS - vscode extension 설치

yarn berry에선 zip으로 모듈을 관리 하는데 vscode에서 이 모듈을 쉽게 읽어오기 위해 extension을 설치합니다.

##### 3-2. TypeScript 설정
vscode의 타입스크립트 참조 경로를 설정하기 위한 단계로, 
`src` 폴더 내 특정 파일을 열어놓은 후 `ctrl + shift + p` 단축키로 Command palette를 띄웁니다.
입력창에 `typescript select`를 검색하여 `TypeScript: TypeScript 버전 선택.. `를 선택하고 다음 창에서 `작업 영역 버전 사용`을 선택합니다.

\(위 3번 과정이 진행되지 않아 코드에 빨간 밑줄이 그어져도 실행하는데 문제는 없습니다.\)

#### 4. 의존성 설치

```
yarn install
```

#### 5. 실행

```
yarn dev
```


## 폴더 구조

```
src
├── app           // ROUTER & 서버 페이지 컴포넌트
├── components    // 공통 컴포넌트 정의
│   ├── pages     // 클라이언트 페이지 컴포넌트
│   └── ui        // ui 컴포넌트 (ex. button, input, ...)
├── global        // 전역 설정
├── hooks         // 커스텀 HOOK
├── layout        // 레이아웃 (ex. header, footer, ...) 및 layout.tsx에서 사용될 컴포넌트 정의
├── services      // API 함수 및 엔드포인트 정의
├── store         // 전역 상태 관리
├── types         // 타입스크립트 타입 정의
└── utils         // 유틸리티 함수
```

## Version

Yarn v4.4.0
Node v18.20.3
Next v14.2.5
