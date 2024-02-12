let yearMonth = document.getElementById('yearMonth');
let leagueId = '<%= leagueId %>';


// 현재 년월 정보 가져오기
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요

// 현재 년월을 표시
document.getElementById('yearMonth').innerText = `${currentYear}년 ${currentMonth}월`;

// 이전 달 버튼 클릭 시
document.getElementById('prevMonthBtn').addEventListener('click', function () {
    // 현재 년월을 변경하고 다시 표시
    // (여기에서는 간단하게 현재 월을 감소시킴. 필요에 따라 더 복잡한 로직을 추가할 수 있음)
    currentMonth--;
    if (currentMonth === 0) {
        currentYear--;
        currentMonth = 12;
    }
    document.getElementById('yearMonth').innerText = `${currentYear}년 ${currentMonth}월`;

});

// 다음 달 버튼 클릭 시
document.getElementById('nextMonthBtn').addEventListener('click', function () {
    // 현재 년월을 변경하고 다시 표시
    // (여기에서는 간단하게 현재 월을 증가시킴. 필요에 따라 더 복잡한 로직을 추가할 수 있음)
    currentMonth++;
    if (currentMonth === 13) {
        currentYear++;
        currentMonth = 1;
    }
    document.getElementById('yearMonth').innerText = `${currentYear}년 ${currentMonth}월`;
    
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
  
