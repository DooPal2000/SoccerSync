
let CurrSeason = season;

function displayStandings(data) {
  const tableContainer = document.getElementById('standings-table');
  tableContainer.innerHTML = ''; // 기존 테이블 삭제
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-hover');

  // 테이블 헤더 생성
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  // 헤더에 필요한 컬럼들 추가
  headerRow.innerHTML = '<th>Rank</th><th>Team</th><th>Logo</th><th>Played</th><th>Win</th><th>Draw</th><th>Lose</th><th>Points</th><th>GoalsDiff</th>';
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
                       <td>${team.team.name}</td>
                       <td><img src="${team.team.logo}" alt="${team.team.name}" style="max-width: 40px; max-height: 40px;"></td>
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

