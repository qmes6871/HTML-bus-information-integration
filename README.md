# 경산시 교통정보센터 - 정적 HTML 버전

이 디렉토리는 백엔드 개발자에게 인계하기 위해 순수 HTML/CSS/JavaScript로 변환된 프론트엔드 파일들을 포함하고 있습니다.

## 파일 구조

```
static/
├── index.html          # 메인 페이지
├── _template.html      # 새 페이지 생성용 템플릿
├── favicon.ico         # 파비콘
├── css/
│   └── styles.css     # 모든 스타일 (Tailwind CSS를 순수 CSS로 변환)
├── js/
│   └── main.js        # 인터랙티브 기능 (메뉴, 검색 등)
├── images/            # 모든 이미지 파일
│   ├── logo.png
│   ├── bis-bg.png
│   ├── its-bg.png
│   ├── ks-menu-banner.jpg
│   └── ...
├── center/            # 센터소개 페이지들
│   ├── intro.html     # 센터소개 (완성)
│   ├── location.html  # 오시는길 (템플릿에서 복제 필요)
│   ├── its.html       # ITS 안내 (템플릿에서 복제 필요)
│   └── bis.html       # BIS 안내 (템플릿에서 복제 필요)
├── bus/               # 버스정보 페이지들
├── traffic/           # 교통정보 페이지들
└── support/           # 고객센터 페이지들
```

## 로컬에서 실행하는 방법

### 방법 1: 직접 브라우저에서 열기
1. `index.html` 파일을 브라우저로 드래그 앤 드롭하거나
2. 파일 탐색기에서 `index.html`을 더블클릭

**주의**: 일부 브라우저에서는 보안 정책으로 인해 로컬 파일 시스템의 이미지가 로드되지 않을 수 있습니다. 이 경우 아래 방법 2를 사용하세요.

### 방법 2: 간단한 HTTP 서버 사용 (권장)

#### Python이 설치된 경우:
```bash
cd static
python -m http.server 8000
```
그 다음 브라우저에서 `http://localhost:8000` 접속

#### Node.js가 설치된 경우:
```bash
# npx를 사용한 방법 (설치 불필요)
cd static
npx http-server -p 8000
```
그 다음 브라우저에서 `http://localhost:8000` 접속

#### PHP가 설치된 경우:
```bash
cd static
php -S localhost:8000
```
그 다음 브라우저에서 `http://localhost:8000` 접속

## 주요 기능

### 1. 반응형 디자인
- 모바일, 태블릿, 데스크탑 모두 지원
- 모바일에서는 햄버거 메뉴로 자동 전환

### 2. 인터랙티브 메뉴
- 데스크탑: 호버 시 메가메뉴 표시
- 모바일: 햄버거 메뉴와 아코디언 서브메뉴

### 3. 검색 기능
- 버스 정보 통합 검색
- 노선번호, 유형, 정류소, 지역별 탭 전환

### 4. 애니메이션
- 페이지 로드 시 부드러운 fade-in 효과
- 메뉴 전환 시 슬라이드 애니메이션

## 백엔드 통합 가이드

### 1. 동적 데이터 연결
현재 하드코딩된 데이터를 백엔드 API로 교체해야 합니다:

- **공지사항**: `index.html`의 `notice-list` 섹션
- **교통 정보**: `index.html`의 `traffic-list` 섹션
- **이용자 수**: 소형 카드의 이용자 수 데이터

### 2. 검색 기능 구현
`js/main.js`의 `handleSearch()` 함수를 수정하여 실제 API 호출로 변경:

```javascript
function handleSearch() {
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    const query = searchInput.value.trim();
    if (query) {
      // 여기에 백엔드 API 호출 추가
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          // 검색 결과 처리
        });
    }
  }
}
```

### 3. 실시간 데이터 업데이트
교통 정보나 버스 도착 정보를 실시간으로 업데이트하려면:

```javascript
// 주기적 업데이트 예시
setInterval(() => {
  fetch('/api/traffic-info')
    .then(response => response.json())
    .then(data => {
      updateTrafficList(data);
    });
}, 30000); // 30초마다 업데이트
```

### 4. 라우팅
현재 모든 링크는 하드코딩된 경로를 사용합니다. 백엔드 라우팅 시스템에 맞게 수정:

- `/bus/search` → 버스 검색 페이지
- `/center/intro` → 센터 소개 페이지
- `/traffic/cctv` → CCTV 정보 페이지
- 등등...

## 브라우저 호환성

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 수정 및 커스터마이징

### 색상 변경
`css/styles.css`의 `:root` 섹션에서 CSS 변수 수정:

```css
:root {
  --blue-primary: #007db8;
  --green-primary: #2aa85f;
  --red-accent: #e74c3c;
  /* ... */
}
```

### 레이아웃 조정
`css/styles.css`에서 해당 클래스의 스타일 수정

### 새로운 페이지 추가

현재 `center/intro.html`만 완성되어 있습니다. 나머지 페이지는 아래 방법으로 생성하세요:

1. **`_template.html` 파일을 복사**
   ```bash
   # 예: 오시는길 페이지 생성
   cp _template.html center/location.html
   ```

2. **복사한 파일을 열어서 수정**
   - `<title>` 태그 수정
   - Breadcrumb (홈 > 메뉴 > 현재페이지) 수정
   - 사이드바 메뉴 제목과 링크 수정
   - 메인 콘텐츠 부분 작성

3. **경로 주의사항**
   - 서브 디렉토리(`center/`, `bus/` 등) 안의 페이지는 상위 경로로 리소스를 참조합니다
   - CSS: `../css/styles.css`
   - JS: `../js/main.js`
   - 이미지: `../images/logo.png`
   - 메인 페이지: `../index.html`

4. **예시: center/location.html 생성**
   ```html
   <!-- _template.html을 복사 후 수정 -->
   <title>오시는길 - 경산시 교통정보센터</title>

   <!-- Breadcrumb 수정 -->
   <span>센터소개</span>
   ...
   <span style="color: #374151;">오시는길</span>

   <!-- 사이드바 수정 -->
   <span style="font-size: 1.25rem; font-weight: bold;">센터소개</span>
   ...
   <nav>
     <a href="intro.html">센터소개</a>
     <a href="location.html" style="color: #1a5c9e; font-weight: bold; ...">오시는길</a>
     <a href="its.html">ITS 안내</a>
     <a href="bis.html">BIS 안내</a>
   </nav>

   <!-- 메인 콘텐츠 -->
   <h2>오시는길</h2>
   <p>교통정보센터 위치 안내...</p>
   ```

5. **이미 완성된 페이지 참고**
   - `center/intro.html`: 탭 기능이 있는 복잡한 페이지 예시
   - 이 파일을 참고하여 동적 기능이 필요한 페이지 작성

## 문제 해결

### 이미지가 표시되지 않는 경우
- HTTP 서버를 통해 실행하고 있는지 확인
- 이미지 경로가 올바른지 확인 (`images/` 폴더 내)

### 메뉴가 작동하지 않는 경우
- 브라우저 콘솔에서 JavaScript 오류 확인
- `js/main.js` 파일이 올바르게 로드되었는지 확인

### 모바일에서 레이아웃이 깨지는 경우
- 브라우저의 개발자 도구를 사용하여 미디어 쿼리 확인
- `css/styles.css`의 반응형 스타일 조정

## 라이선스

Copyright(c) 2025 Gyeongsan Traffic information Center. ALL RIGHTS RESERVED.
