let yearMonth = document.getElementById('yearMonth');

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;

const leagueId = document.getElementById('fixtureData').dataset.leagueId;
const leagueName = document.getElementById('fixtureData').dataset.leagueName;

document.addEventListener('DOMContentLoaded', function () {
  loadFixtures(currentYear, currentMonth);

  // loadFixtures 함수 내에서 updateFavoriteStars를 호출하거나,
  // 여기서 직접 호출할 수 있습니다.
});


document.getElementById('yearMonth').innerText = `${currentYear}년 ${currentMonth}월`;

document.getElementById('prevMonthBtn').addEventListener('click', function () {
  currentMonth--;
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 12;
  }
  document.getElementById('yearMonth').innerText = `${currentYear}년 ${currentMonth}월`;
  loadFixtures(currentYear, currentMonth);
});

document.getElementById('nextMonthBtn').addEventListener('click', function () {
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
    tableBody.innerHTML = '';

    fixtures.forEach(fixture => {
      const row = document.createElement('tr');

      // 경기일자 셀
      const dateCell = document.createElement('td');
      dateCell.classList.add('text-center', 'align-middle');
      const dateString = new Date(fixture.fixture.date).toLocaleString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
      dateCell.textContent = dateString;
      row.appendChild(dateCell);

      // Home Team logo 셀
      const homeLogoCell = document.createElement('td');
      homeLogoCell.classList.add('text-center', 'align-middle');
      const homeLogoImg = document.createElement('img');
      homeLogoImg.src = fixture.teams.home.logo;
      homeLogoImg.alt = `${fixture.teams.home.name} logo`;
      homeLogoImg.width = 50;
      homeLogoImg.height = 50;
      homeLogoCell.appendChild(homeLogoImg);
      row.appendChild(homeLogoCell);

      // Home Team name 셀
      const homeNameCell = document.createElement('td');
      homeNameCell.classList.add('text-center', 'align-middle');
      homeNameCell.textContent = fixture.teams.home.name;
      if (fixture.goals.home !== null && fixture.goals.away !== null) {
        if (fixture.goals.home > fixture.goals.away) {
          homeNameCell.style.backgroundColor = 'lightgreen';
        } else if (fixture.goals.home < fixture.goals.away) {
          homeNameCell.style.backgroundColor = 'lightcoral';
        } else {
          homeNameCell.style.backgroundColor = 'lightgray';
        }
      }
      row.appendChild(homeNameCell);

      // Score 셀
      const scoreCell = document.createElement('td');
      scoreCell.classList.add('text-center', 'align-middle');
      if (fixture.goals.home === null || fixture.goals.away === null) {
        scoreCell.textContent = '경기 전';
      } else {
        scoreCell.textContent = `${fixture.goals.home} - ${fixture.goals.away}`;
      }
      row.appendChild(scoreCell);

      // Away Team name 셀
      const awayNameCell = document.createElement('td');
      awayNameCell.classList.add('text-center', 'align-middle');
      awayNameCell.textContent = fixture.teams.away.name;
      if (fixture.goals.home !== null && fixture.goals.away !== null) {
        if (fixture.goals.away > fixture.goals.home) {
          awayNameCell.style.backgroundColor = 'lightgreen';
        } else if (fixture.goals.away < fixture.goals.home) {
          awayNameCell.style.backgroundColor = 'lightcoral';
        } else {
          awayNameCell.style.backgroundColor = 'lightgray';
        }
      }
      row.appendChild(awayNameCell);
      
      // Away Team logo 셀
      const awayLogoCell = document.createElement('td');
      awayLogoCell.classList.add('text-center', 'align-middle');
      const awayLogoImg = document.createElement('img');
      awayLogoImg.src = fixture.teams.away.logo;
      awayLogoImg.alt = `${fixture.teams.away.name} logo`;
      awayLogoImg.width = 50;
      awayLogoImg.height = 50;
      awayLogoCell.appendChild(awayLogoImg);
      row.appendChild(awayLogoCell);

      // 일정코드 셀
      const idCell = document.createElement('td');
      idCell.classList.add('text-center', 'align-middle');
      idCell.textContent = fixture.fixture.fixtureId;
      row.appendChild(idCell);

      // 승부예측 바로가기 셀
      const predictionCell = document.createElement('td');
      predictionCell.classList.add('text-center', 'align-middle');
      const predictionButton = document.createElement('button');
      predictionButton.textContent = '승부예측';
      predictionButton.classList.add('btn', 'btn-outline-dark');
      predictionButton.onclick = function () {
        window.location.href = `/predictions/${fixture.fixture.fixtureId}`;
      };
      predictionCell.appendChild(predictionButton);
      row.appendChild(predictionCell);

      // 즐겨찾기 셀
      const favoriteCell = document.createElement('td');
      favoriteCell.classList.add('text-center', 'align-middle');
      const starIcon = document.createElement('i');
      starIcon.classList.add('far', 'fa-star', 'favorite-star');
      starIcon.dataset.fixtureId = fixture.fixture.fixtureId;
      starIcon.onclick = toggleFavorite;
      favoriteCell.appendChild(starIcon);
      row.appendChild(favoriteCell);

      tableBody.appendChild(row);
    });
    // 즐겨찾기 상태 업데이트
    updateFavoriteStars();

  } catch (error) {
    console.error(error);
  }
}

function toggleFavorite(event) {
  const fixtureId = event.target.dataset.fixtureId;
  const isFavorite = event.target.classList.contains('fas');

  if (isFavorite) {
    event.target.classList.replace('fas', 'far');
    removeFavorite(fixtureId);
  } else {
    event.target.classList.replace('far', 'fas');
    addFavorite(fixtureId);
  }
}

async function addFavorite(fixtureId) {
  try {
    const response = await axios.post(`/users/favorites/${fixtureId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        title: '로그인 필요',
        text: '즐겨찾기 기능은 로그인 후 사용 가능합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인하기',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
    } else {
      console.error('Error adding favorite:', error);
      Swal.fire('오류', '즐겨찾기 추가 중 오류가 발생했습니다.', 'error');
    }
    throw error;
  }
}

async function removeFavorite(fixtureId) {
  try {
    const response = await axios.delete(`/users/favorites/${fixtureId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        title: '로그인 필요',
        text: '즐겨찾기 기능은 로그인 후 사용 가능합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인하기',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
    } else {
      console.error('Error removing favorite:', error);
      Swal.fire('오류', '즐겨찾기 제거 중 오류가 발생했습니다.', 'error');
    }
    throw error;
  }
}


async function updateFavoriteStars() {
  try {
    const response = await axios.get('/users/favorites');
    const favorites = response.data;

    document.querySelectorAll('.favorite-star').forEach(star => {
      const fixtureId = parseInt(star.dataset.fixtureId);
      if (favorites.includes(fixtureId)) {
        star.classList.replace('far', 'fas');
      } else {
        star.classList.replace('fas', 'far');
      }
    });
  } catch (error) {
    console.error('Error updating favorite stars:', error);
  }
}

