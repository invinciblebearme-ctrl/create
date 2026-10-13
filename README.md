# CREATE 모형 연구학교 — 메인 홈페이지 (1단계)

기존 학습자료실의 파스텔 색상·둥근 카드·Nunito/Noto Sans KR 스타일을 활용한 React + Vite 메인 페이지입니다.

## 실행

1. Node.js LTS 설치
2. 이 폴더(`package.json`이 있는 곳)의 탐색기 주소창에 `cmd` 입력
3. `npm install`
4. `npm run dev`
5. 터미널에 표시되는 `http://localhost:5173/` 접속

## 구성

- `src/main.jsx`: 메인 페이지, 카테고리 필터, 검색, 준비 중 상세창
- `src/content.js`: 6개 콘텐츠의 제목·설명·링크를 관리하는 설정 파일
- `src/style.css`: 공통 디자인과 반응형 스타일
- `vite.config.js`: Vite 설정

## 콘텐츠 링크 연결

`src/content.js`에서 해당 콘텐츠의 `url: ''`을 실제 URL로 변경합니다.

```js
url: 'https://example.com/my-tool'
```

URL이 없으면 '콘텐츠 준비 중' 상태와 안내창을 보여 줍니다. URL이 있으면 '바로 이용'으로 표시되며 버튼을 누르면 연결됩니다.

**현재 1단계에서는 실제 PDF, 영상, 패들렛 자료실, 관리자 화면이 구현되어 있지 않습니다.** 2단계에서 전자책 뷰어를 만들고 각 기능을 연결하는 것을 전제로 설계했습니다.

## GitHub Pages 배포

- `npm run build` → `dist` 생성
- GitHub Actions 또는 GitHub Pages 배포 설정을 이용해 `dist` 폴더 게시
- 프로젝트 저장소 하위 경로로 배포할 때 `VITE_BASE_PATH=/저장소명/ npm run build` (Windows CMD: `set VITE_BASE_PATH=/저장소명/` 실행 후 `npm run build`)
- 기본 `base: './'` 설정은 정적 상대 경로를 사용합니다.

## 참고

- 사이트 제목은 임시로 'CREATE 모형 연구학교'를 사용했습니다. 정식 학교명·연구 주제·로고가 정해지면 교체하세요.
- 인증이나 데이터 수정 기능은 1단계 범위에 포함하지 않았습니다.
