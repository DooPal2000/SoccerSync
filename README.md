# ⚽ SoccerSync

<div align="center">

**다국 리그 경기 정보 및 분석 플랫폼**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-white.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

[데모 보기](https://youtu.be/AHs9yVf4z60) • [기여하기](#contributing) • [버그 신고](issues)

</div>

---

## 📋 프로젝트 개요

**SoccerSync**는 다양한 글로벌 리그의 경기 정보, 순위, 선수 분석 기능을 제공하는 종합 축구 플랫폼입니다. K리그, J리그, EPL, 라리가, 세리에A 등 주요 리그의 실시간 데이터를 API-Football-v1을 통해 제공하며, 승부 예측, 커뮤니티, 즐겨찾기 등 다양한 기능을 제공합니다.

### 지원 리그

| 리그 | League ID | 설명 |
|------|-----------|------|
| K리그1 | 292 | 한국 프로축구 1부 리그 |
| K리그2 | 293 | 한국 프로축구 2부 리그 |
| J리그1 | 98 | 일본 J1 리그 |
| J리그2 | 99 | 일본 J2 리그 |
| EPL | 39 | 잉글랜드 프리미어리그 |
| 라리가 | 140 | 스페인 1부 리그 |
| 세리에A | 135 | 이탈리아 1부 리그 |

### 주요 기능

- 🎯 **경기 일정 (Fixture)**: 다양한 리그의 경기 일정, 결과, 시간 정보 조회
- 📊 **리그 순위 (Standing)**: 실시간 리그 순위표와 승, 무, 패, 득실차 등 상세 정보
- 🔮 **승부 예측 (Prediction)**: 경기 승부 예측 및 관리
- 👤 **선수 분석**: 선수 ID를 통한 상세 스탯 및 경력 조회
- 🏢 **팀 분석**: 팀 스쿼드, 선수 명단 등 팀 상세 정보
- ⚔️ **리그 비교**: K리그 vs J리그 등 리그 간 비교 분석
- 💬 **커뮤니티**: 포스팅 및 댓글 기능을 통한 팬들과의 소통
- 🔐 **사용자 인증**: 안전한 회원가입 및 로그인 시스템
- ⭐ **즐겨찾기**: 관심 경기 즐겨찾기 기능

---

## 🛠 기술 스택

### Backend

| 기술 | 버전 | 설명 |
|------|------|------|
| Node.js | 18+ | JavaScript 런타임 |
| Express.js | 4.18+ | 웹 애플리케이션 프레임워크 |
| MongoDB | 6.0+ | NoSQL 데이터베이스 |
| Mongoose | 8.1+ | MongoDB ODM |
| Passport.js | 0.7+ | 사용자 인증 미들웨어 |

### Frontend

| 기술 | 버전 | 설명 |
|------|------|------|
| EJS | 3.1+ | 템플릿 엔진 |
| EJS-Mate | 4.0+ | 레이아웃 템플릿 |
| Bootstrap | 5.3+ | CSS 프레임워크 |
| AOS | 2.3+ | 스크롤 애니메이션 라이브러리 |
| Axios | HTTP 클라이언트 |
| SweetAlert2 | 알림 UI 라이브러리 |
| FontAwesome | 아이콘 라이브러리 |

### 주요 라이브러리

- **Axios**: HTTP 클라이언트 (API-Football-v1 연동)
- **Multer + Cloudinary**: 이미지 업로드 및 저장
- **Joi**: 데이터 유효성 검증
- **Express Session**: 세션 관리
- **Connect Flash**: 플래시 메시지

### API

- **API-Football-v1**: 축구 경기, 선수, 순위 데이터 제공 (RapidAPI)

---

## 📁 프로젝트 구조

```
SoccerSync/
├── controllers/       # 컨트롤러 로직
├── models/           # Mongoose 모델 (User, Fixture, Posting, Comment, TeamSquad, Player)
├── routes/           # Express 라우터
├── views/            # EJS 템플릿
│   ├── layouts/      # 레이아웃 템플릿
│   └── partials/     # 부분 템플릿 (navbar, footer, flash)
├── public/           # 정적 파일 (CSS, JS, 이미지)
├── utils/            # 유틸리티 함수 (catchAsync, ExpressError)
├── cloudinary/       # Cloudinary 설정
├── seeds/            # 데이터 시드
├── middleware.js     # 미들웨어
├── schemas.js        # Mongoose 스키마 유효성 검증
├── app.js            # 메인 애플리케이션 파일
└── package.json      # 프로젝트 의존성
```

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- MongoDB (로컬 또는 MongoDB Atlas)
- API-Football-v1 API Key (RapidAPI)
- Cloudinary 계정 (이미지 업로드용, 선택 사항)

### 설치 및 설정

1. **저장소 클론**

```bash
git clone https://github.com/kkyub/SoccerSync.git
cd SoccerSync
```

2. **의존성 설치**

```bash
npm install
```

3. **환경 변수 설정**

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/soccersync
# 또는 MongoDB Atlas 사용:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/soccersync

# API-Football-v1 (RapidAPI)
RAPIDAPI_KEY=your_rapidapi_key_here

# Session Secret
SESSION_SECRET=your_secret_key_here

# Cloudinary (이미지 업로드)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **데이터베이스 연결 확인**

```bash
# MongoDB가 실행 중인지 확인
# 로컬 MongoDB: mongod
# MongoDB Atlas: 웹 대시보드에서 클러스터 상태 확인
```

### 실행

**개발 모드**

```bash
npm run dev
```

애플리케이션이 `http://localhost:3000`에서 실행됩니다. nodemon이 파일 변경을 자동으로 감지하여 재시작합니다.

**프로덕션 모드**

```bash
npm start
```

---

## 📊 메뉴 및 기능 설명

### 경기 일정 (Fixture)
- **지원 리그**: K리그1, K리그2, J리그1, J리그2, EPL, 라리가, 세리에A
- 월별 경기 일정 조회 (이전/다음 달 탐색)
- 실시간 경기 결과 및 스코어
- 승부예측 바로가기
- 즐겨찾기 기능 (로그인 필요)
- 승패 팀 하이라이트 (초록/빨강/회색 배경)

### 리그 순위 (Standing)
- **지원 리그**: K리그1, K리그2, J리그1, J리그2, EPL, 라리가, 세리에A
- 실시간 리그 순위표
- 승, 무, 패, 득점, 실점, 득실차, 승점 등 상세 정보

### 팀 분석
- 팀 ID 검색으로 팀 스쿼드 조회
- 선수 명단 및 포지션 확인
- 선수 클릭 시 상세 정보 이동

### 선수 분석
- 선수 ID 검색으로 상세 스탯 조회
- 경력, 포지션, 능력치 등 상세 정보

### 승부 예측 (Prediction)
- 경기 승부 예측 기능
- 다른 사용자들과 예측 비교

### 리그 비교 (K리그 vs J리그)
- 리그 간 데이터 비교
- 비교 분석 시각화

### 커뮤니티 (Postings)
- 포스팅 작성 및 조회
- 댓글 기능
- 이미지 업로드 (Cloudinary 연동)

### 사용자 인증
- 회원가입 및 로그인
- Passport.js 기반 Local Strategy
- 세션 기반 인증

---

## 🎨 데모

실제 구현 모습을 보려면 아래 링크를 참고하세요:

[![SoccerSync Demo](https://img.youtube.com/vi/AHs9yVf4z60/0.jpg)](https://youtu.be/AHs9yVf4z60)

---

## 📝 API 문서

### 사용된 API

- **API-Football-v1** (RapidAPI)
  - 경기 일정 및 결과 (`/v3/fixtures`)
  - 리그 순위 (`/v3/standings`)
  - 선수 스쿼드 (`/v3/players/squads`)
  - 선수 정보 (`/v3/players`)

### 주요 라우트

| 경로 | 설명 |
|------|------|
| `/fixtures/:leagueId` | 특정 리그 경기 일정 |
| `/standings/:leagueId` | 특정 리그 순위 |
| `/analysis/teams` | 팀 검색 페이지 |
| `/analysis/teams/:teamId` | 특정 팀 스쿼드 |
| `/analysis/players` | 선수 검색 페이지 |
| `/analysis/players/:playerId` | 특정 선수 정보 |
| `/predictions/:fixtureId` | 특정 경기 승부 예측 |
| `/postings` | 회원게시판 |

### 데이터 모델

**User**
```javascript
{
  email: String (unique, required),
  username: String,
  favorites: [Number]  // 즐겨찾는 경기 fixtureId
}
```

**Fixture**
```javascript
{
  fixtureId: Number (unique, index),
  referee: String,
  venue: Object,
  status: Object,
  league: Object,
  teams: Object,
  goals: Object,
  score: Object
}
```

**TeamSquad**
```javascript
{
  team: {
    id: Number,
    name: String,
    logo: String
  },
  players: [ObjectId]  // Player 참조
}
```

**Player**
```javascript
{
  id: Number (unique),
  name: String,
  age: Number,
  number: Number,
  position: String,
  photo: String
}
```

---

## 🤝 기여하기

기여를 환영합니다! 기여하고 싶으시다면 다음 단계를 따르세요:

1. 포크하여 저장소 복사
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 푸시 (`git push origin feature/AmazingFeature`)
5. 풀 리퀘스트 생성

---

## 📄 라이선스

이 프로젝트는 ISC 라이선스 하에 라이선스되었습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

---

## 👨‍💻 개발자

개인 프로젝트로 개발되었습니다.

---

## 🙏 감사의 말씀

- [API-Football-v1](https://rapidapi.com/api-sports/api/api-football/) - 축구 데이터 API 제공
- [Bootstrap](https://getbootstrap.com/) - UI 프레임워크
- [Cloudinary](https://cloudinary.com/) - 이미지 저장소

---

<div align="center">

**SoccerSync를 사용해 주셔서 감사합니다!** ⚽

</div>
