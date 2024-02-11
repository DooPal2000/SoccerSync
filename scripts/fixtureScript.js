let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();
let yearMonth = document.getElementById('yearMonth');
let fixtures = [];
let leagueId = '292';

// 버튼 클릭 이벤트 리스너 등록
document.getElementById('prevMonthBtn').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  loadFixtures();
});

document.getElementById('nextMonthBtn').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  loadFixtures();
});

function loadFixtures() {
  const from = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
  const to = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate()}`;

  axios.get(`/fixture/${leagueId}?from=${from}&to=${to}&season=${currentYear}`)
    .then(response => {
      fixtures = response.data.fixtureDB;
      renderFixtures();
    })
    .catch(console.error);
}

// // 페이지 로드 시 경기 일정 로드
// window.onload = loadFixtures();

// let currentMonth = new Date().getMonth() + 1;
// let currentYear = new Date().getFullYear();
// let yearMonth = document.getElementById('yearMonth');
// let fixtures = [];

// // window.onload = loadFixtures;



// // 버튼 클릭 이벤트 리스너 등록
// document.getElementById('prevMonthBtn').addEventListener('click', () => {
// 	currentMonth--;
// 	if (currentMonth < 1) {
// 		currentMonth = 12;
// 		currentYear--;
// 	}
// 	loadFixtures();
// });

// document.getElementById('nextMonthBtn').addEventListener('click', () => {
// 	currentMonth++;
// 	if (currentMonth > 12) {
// 		currentMonth = 1;
// 		currentYear++;
// 	}
// 	loadFixtures();
// });

// document.addEventListener("click", (event) => {
//   if (event.target.classList.contains("btn-outline-dark")) {
//     const fixtureCode = event.target.dataset.fixtureCode;
    
//     if (!fixtureCode) {
//       alert("일정코드가 입력되지 않았습니다.");
//     } else {
//       // 이 경우 prediction.jsp로 이동하고 fixtureCode를 넘겨줍니다.
//       window.location.href = `prediction.jsp?fixtureCode=${fixtureCode}`;
//     }
//   }
// });

// function loadFixtures() {
//     axios.get(`/api/fixture/${leagueId}`) // 서버에 재요청 보내기
//       .then(response => {
//         fixtureDB = response.data; // 데이터 업데이트
//         renderFixtures(fixtureDB); // 화면 업데이트
//       })
//       .catch(console.error);
//   }
  
