# 바이탈사인 (VITALSIGN) — 희귀질환 다학제 협진 플랫폼

건양대학교 의료IT공학과 창의설계2 팀 프로젝트 · v9.1.7

여러 진료과 의사가 희귀질환 케이스를 두고 협진 요청 → 회신 → 감별진단 합의 → 확진까지 함께 진행하는 웹 앱입니다.
**모든 케이스는 교육용 가상 데이터이며 실제 환자 정보가 아닙니다.** 임상 판단을 대체하지 않습니다.

## 주요 기능

- 협진함: 회신 기한(SLA) 기반 우선순위 추천 (규칙 기반)
- 협진 케이스: 감별진단 합의 보드, 진단 여정, 가계도, 약물 안전 점검, 질환 매칭
- 협진방: 케이스별 대화방 · 단체방 · 긴급 메시지 수신 확인 · 사진 가리기
- 협진팀 모집: 모집 → 신청/초대 → 단체방 개설
- 화상 협진: 초대/입장 코드 방식 (Jitsi)
- 다학제 회의, 확진 라이브러리, 열람 기록(Audit)

## 구조

단일 파일 앱입니다. 빌드 과정이 없습니다.

```
index.html                    앱 전체 (HTML + CSS + JS)
manifest.webmanifest          PWA 설정
sw.js                         서비스 워커 (알림 · 오프라인 대체)
database.rules.example.json   Firebase Realtime DB 규칙 예시
```

## 실행 방법

### 1) 로컬에서 보기
`index.html`을 브라우저로 열면 됩니다. 서비스 워커·브라우저 알림은 `https` 또는 `localhost`에서만 동작하므로, 필요하면 아래처럼 실행하세요.

```bash
python3 -m http.server 8000
# http://localhost:8000
```

### 2) GitHub Pages로 배포
1. 저장소 Settings → Pages
2. Source: `Deploy from a branch` → Branch: `main` / `/(root)`
3. 몇 분 뒤 `https://<계정>.github.io/<저장소>/` 에서 접속

## Firebase 설정

`index.html` 안의 `firebaseConfig`를 본인 프로젝트 값으로 바꿉니다.
Firebase 웹 API 키는 공개되는 것이 정상이며, **보호는 Realtime Database 규칙과 Authentication 설정이 담당합니다.**

필요한 설정:
- Authentication: 이메일/비밀번호, 익명 로그인 사용
- Realtime Database: `database.rules.example.json` 참고 (로그인한 사용자만 읽기/쓰기)
- Authentication → 설정 → 승인된 도메인에 `<계정>.github.io` 추가

Firebase가 연결되지 않으면 이 브라우저 안에서만 동작하는 로컬 시연 모드로 열립니다.

## 알려진 한계 (공개 저장소 전 확인)

- 등록 코드(`ACCESS_PASSWORD`)와 사용자 인증이 클라이언트 코드 기반이라 실서비스 보안 수준이 아닙니다.
- 신원이 이름 문자열 기준이어서 `auth.uid` 기반 규칙으로 개선이 필요합니다.
- 질환 매칭·약물 위험 점수·SLA 시간은 교육용 규칙이며 임상 검증을 거치지 않았습니다.
- 푸시/문자 알림은 서버가 없어 앱이 열려 있을 때만 동작합니다.
- 화상 협진은 공개 Jitsi(`meet.jit.si`)를 사용합니다.
- 실제 환자 정보를 입력하지 마세요.

## 팀

건양대학교 의료IT공학과 · 하유진 · 이아연 · 심가원

## 라이선스

학습용 프로젝트입니다. 라이선스를 정하면 `LICENSE` 파일을 추가하세요.
