  document.addEventListener('DOMContentLoaded', function () {
    // 서버에서 받은 JSON 데이터

    // 테이블 생성 함수
    function displayStandings(data) {
      const tableContainer = document.getElementById('standings-table');
      const table = document.createElement('table');
      table.classList.add('table');

      // 테이블 헤더 생성
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      // 헤더에 필요한 컬럼들 추가
      headerRow.innerHTML = '<th>Rank</th><th>Team</th><th>Logo</th><th>Played</th><th>Win</th><th>Draw</th><th>Lose</th><th>Points</th><th>GoalsDiff</th>';
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // 테이블 바디 생성
      const tbody = document.createElement('tbody');
      // 데이터에서 각 팀의 정보를 가져와서 행을 생성하고 tbody에 추가
      data.standings.forEach(team => {
        const row = document.createElement('tr');
        // 팀 데이터에서 필요한 정보들을 추가
        row.innerHTML = `<td>${team.rank}</td>
                         <td>${team.team.name}</td>
                         <td><img src="${team.team.logo}" alt="${team.team.name}" style="max-width: 30px; max-height: 30px;"></td>
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

    // standingsData를 사용하여 테이블 생성
    displayStandings(standings);
  });
