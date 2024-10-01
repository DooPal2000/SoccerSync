let yearMonth = document.getElementById('yearMonth');


// 현재 년월 정보 가져오기
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요


const leagueId = document.getElementById('fixtureData').dataset.leagueId;
const leagueName = document.getElementById('fixtureData').dataset.leagueName;

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
  loadFixtures(currentYear, currentMonth);
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
  loadFixtures(currentYear, currentMonth);
});



async function loadFixtures(currentYear, currentMonth) {
  try {
    const response = await axios.get(`/fixtures/${leagueId}?year=${currentYear}&month=${currentMonth}`);
    const fixtures = response.data;

    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // 기존 행 삭제

    fixtures.forEach(fixture => {
      const row = document.createElement('tr');

      // 경기일자 셀
      const dateCell = document.createElement('td');
      dateCell.classList.add('text-center'); // 클래스 추가
      const dateString = new Date(fixture.fixture.date).toLocaleString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
      dateCell.textContent = dateString;
      row.appendChild(dateCell);

      // Home Team logo 셀
      const homeLogoCell = document.createElement('td');
      homeLogoCell.classList.add('text-center'); // 클래스 추가
      const homeLogoImg = document.createElement('img');
      homeLogoImg.src = fixture.teams.home.logo;
      homeLogoImg.alt = `${fixture.teams.home.name} logo`;
      homeLogoImg.width = 50;
      homeLogoImg.height = 50;
      homeLogoCell.appendChild(homeLogoImg);
      row.appendChild(homeLogoCell);

      // Home Team name 셀
      const homeNameCell = document.createElement('td');
      homeNameCell.classList.add('text-center'); // 클래스 추가
      homeNameCell.textContent = fixture.teams.home.name;
      row.appendChild(homeNameCell);

      // Score 셀
      const scoreCell = document.createElement('td');
      scoreCell.classList.add('text-center'); // 클래스 추가
      if (fixture.goals.home === null || fixture.goals.away === null) {
        scoreCell.textContent = '경기 전';
      } else {
        scoreCell.textContent = `${fixture.goals.home} - ${fixture.goals.away}`;
      }
      row.appendChild(scoreCell);



      // Away Team name 셀
      const awayNameCell = document.createElement('td');
      awayNameCell.classList.add('text-center'); // 클래스 추가
      awayNameCell.textContent = fixture.teams.away.name;
      row.appendChild(awayNameCell);

      // Away Team logo 셀
      const awayLogoCell = document.createElement('td');
      awayLogoCell.classList.add('text-center'); // 클래스 추가
      const awayLogoImg = document.createElement('img');
      awayLogoImg.src = fixture.teams.away.logo;
      awayLogoImg.alt = `${fixture.teams.away.name} logo`;
      awayLogoImg.width = 50;
      awayLogoImg.height = 50;
      awayLogoCell.appendChild(awayLogoImg);
      row.appendChild(awayLogoCell);

      if (fixture.goals.home > fixture.goals.away) {
        homeNameCell.style.backgroundColor = 'lightgreen'; // 이긴 팀은 청색으로
        awayNameCell.style.backgroundColor = 'lightcoral'; // 진 팀은 붉은 색으로
      } else if (fixture.goals.home < fixture.goals.away) {
        homeNameCell.style.backgroundColor = 'lightcoral'; // 진 팀은 붉은 색으로
        awayNameCell.style.backgroundColor = 'lightgreen'; // 이긴 팀은 청색으로
      } else {
        homeNameCell.style.backgroundColor = 'lightgray'; // 
        awayNameCell.style.backgroundColor = 'lightgray';
      }


      // 일정코드 셀
      const idCell = document.createElement('td');
      idCell.classList.add('text-center'); // 클래스 추가
      idCell.textContent = fixture.fixture.fixtureId;
      row.appendChild(idCell);

      // 승부예측 바로가기 셀
      const predictionCell = document.createElement('td');
      predictionCell.classList.add('text-center'); // 클래스 추가
      const predictionButton = document.createElement('button');
      predictionButton.textContent = '승부예측';
      predictionButton.classList.add('btn', 'btn-outline-dark');
      predictionButton.onclick = function () {
        window.location.href = `/predictions/${fixture.fixture.fixtureId}`;
      };
      predictionCell.appendChild(predictionButton);
      row.appendChild(predictionCell);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}
