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


function loadFixtures(currentYear, currentMonth) {

  axios.get(`/fixtures/${leagueId}?year=${currentYear}&month=${currentMonth}`)
    .then(response => {
      const fixtures = response.data;

      const tableBody = document.querySelector('tbody');
      tableBody.innerHTML = ''; // 기존 행 삭제

      fixtures.forEach(fixture => {
        const row = document.createElement('tr');

        // 경기일자 셀
        const dateCell = document.createElement('td');
        dateCell.textContent = new Date(fixture.fixture.date).toLocaleString();
        row.appendChild(dateCell);

        // Home Team logo 셀
        const homeLogoCell = document.createElement('td');
        const homeLogoImg = document.createElement('img');
        homeLogoImg.src = fixture.teams.home.logo;
        homeLogoImg.alt = `${fixture.teams.home.name} logo`;
        homeLogoImg.width = 50;
        homeLogoImg.height = 50;
        homeLogoCell.appendChild(homeLogoImg);
        row.appendChild(homeLogoCell);

        // Home Team name 셀
        const homeNameCell = document.createElement('td');
        homeNameCell.textContent = fixture.teams.home.name;
        row.appendChild(homeNameCell);

        // Score 셀
        const scoreCell = document.createElement('td');
        if (fixture.goals.home === null || fixture.goals.away === null) {
          scoreCell.textContent = '경기 전';
        } else {
          scoreCell.textContent = `${fixture.goals.home} - ${fixture.goals.away}`;
        }
        row.appendChild(scoreCell);

        // Away Team name 셀
        const awayNameCell = document.createElement('td');
        awayNameCell.textContent = fixture.teams.away.name;
        row.appendChild(awayNameCell);

        // Away Team logo 셀
        const awayLogoCell = document.createElement('td');
        const awayLogoImg = document.createElement('img');
        awayLogoImg.src = fixture.teams.away.logo;
        awayLogoImg.alt = `${fixture.teams.away.name} logo`;
        awayLogoImg.width = 50;
        awayLogoImg.height = 50;
        awayLogoCell.appendChild(awayLogoImg);
        row.appendChild(awayLogoCell);

        // 일정코드 셀
        const idCell = document.createElement('td');
        idCell.textContent = fixture.fixture.fixtureId;
        row.appendChild(idCell);

        // 승부예측 바로가기 셀
        const predictionCell = document.createElement('td');
        const predictionButton = document.createElement('button');
        predictionButton.textContent = '승부예측';
        predictionButton.classList.add('btn', 'btn-outline-dark');
        predictionButton.onclick = function () {
          window.location.href = '/predictions/<%= fixture.fixture.fixtureId %>'
        };
        predictionCell.appendChild(predictionButton);
        row.appendChild(predictionCell);

        tableBody.appendChild(row);
      });
    })
    .catch(console.error);
}

