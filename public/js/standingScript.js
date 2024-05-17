
let CurrSeason = season;
document.addEventListener('DOMContentLoaded', function () {
  // 모든 "팀 분석" 버튼을 선택
  const analyzeButtons = document.querySelectorAll('.analyze-btn');

  analyzeButtons.forEach(button => {
    button.addEventListener('click', function () {
      // 클릭된 버튼에서 팀 ID를 가져옴
      const teamId = this.getAttribute('data-team-id');

      // API 엔드포인트 
      window.location.href = `/analysis/teams/${teamId}`;
    });
  });

});
function displayStandings(data) {
  const tableContainer = document.getElementById('standings-table');
  tableContainer.innerHTML = ''; // 기존 테이블 삭제
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-hover');

  // 테이블 헤더 생성
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  // 헤더에 필요한 컬럼들 추가
  headerRow.innerHTML = '<th>순위</th><th></th><th>팀명</th><th>경기 수</th><th>승리</th><th>무승부</th><th>패배</th><th>승점</th><th>골 득실차</th>';
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 테이블 바디 생성
  const tbody = document.createElement('tbody');

  // 데이터에서 마지막 배열의 정보를 가져와서 행을 생성하고 tbody에 추가
  const lastStandings = data.league.standings[data.league.standings.length - 1];
  lastStandings.forEach(team => {
    const row = document.createElement('tr');
    // 팀 데이터에서 필요한 정보들을 추가
    row.innerHTML = `<td>${team.rank}</td>
                      <td><img src="${team.team.logo}" alt="${team.team.name}" style="max-width: 40px; max-height: 40px;"></td>
                       <td>${team.team.name}</td>
                       <td>${team.all.played}</td>
                       <td>${team.all.win}</td>
                       <td>${team.all.draw}</td>
                       <td>${team.all.lose}</td>
                       <td>${team.points}</td>
                       <td>${team.goalsDiff}</td>`;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // 테이블을 컨테이너에 추가
  tableContainer.appendChild(table);
}
// 이전 시즌 버튼 클릭 시
document.getElementById('prevYearBtn').addEventListener('click', function () {
  changeStandingSeason(-1);
});

// 다음 시즌 버튼 클릭 시
document.getElementById('nextYearBtn').addEventListener('click', function () {
  changeStandingSeason(1);
});


function updateSeasonDisplay(season) {
  const seasonDisplay = document.getElementById('year');
  seasonDisplay.textContent = season + ' 시즌 순위표';
}


function changeStandingSeason(num) {
  CurrSeason += num;
  axios.get(`/standings/${leagueId}?season=${CurrSeason}`)
    .then(response => {
      console.log(response.data);
      console.log(response.data.league.standings);
      displayStandings(response.data);
      updateSeasonDisplay(response.data.league.season)
    })
    .catch(console.error);
}

