// or via CommonJS
document.addEventListener('DOMContentLoaded', function () {
    console.log('teamScript opened')
    // 모든 "선수 분석" 버튼을 선택
    const analyzePlayerButtons = document.querySelectorAll('.analyze-player-btn');

    analyzePlayerButtons.forEach(button => {

        button.addEventListener('click', function () {

            // 클릭된 버튼에서 선수 ID를 가져옴 (team.ejs)
            let playerId = this.getAttribute('data-player-id');

            // 'data-player-id' 속성이 없는 경우, input 필드에서 값 가져오기 (playerSearch.ejs)
            if (!playerId) {
                const playerIdInput = document.getElementById('playerId');
                playerId = playerIdInput.value.trim();

                // 입력값 검증
                if (!playerId) {
                    playerIdInput.classList.add('is-invalid'); // 유효성 검사 실패 시 스타일 적용

                    // 경고창 표시
                    Swal.fire({
                        title: '오류!',
                        text: '선수 ID를 입력해야 합니다.',
                        icon: 'warning',
                        confirmButtonText: '확인'
                    });
                    return;
                } else {
                    playerIdInput.classList.remove('is-invalid');
                }
            }

            console.log(playerId);

            // axios를 사용하여 POST 요청 전송
            axios.post('/analysis/players', { playerId })
                .then(response => {
                    // 서버 응답 처리
                    const playerData = response.data.response[0];

                    // 동적으로 HTML 생성
                    const generateStatsHtml = (statistics) => {
                        return statistics.map(stat => `
                            <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
                                <h3>${stat.league.name}</h3>
                                <p><strong>Team:</strong> ${stat.team.name}</p>
                                <p><strong>Appearances:</strong> ${stat.games.appearences}</p>
                                <p><strong>Minutes Played:</strong> ${stat.games.minutes}</p>
                                <p><strong>Goals:</strong> ${stat.goals.total}</p>
                                <p><strong>Yellow Cards:</strong> ${stat.cards.yellow}</p>
                            </div>
                        `).join('');
                    };

                    // SweetAlert2 사용하여 팝업 생성
                    Swal.fire({
                        title: 'Player Information',
                        icon: 'info',
                        html: `
                            <img src="${playerData.player.photo}" alt="${playerData.player.name}" style="width: 100px; height: auto; margin-right: 20px; border-radius: 8px;">

                                <div>
                                    <h2>${playerData.player.name}</h2>
                                    <p><strong>Age:</strong> ${playerData.player.age}</p>
                                    <p><strong>Birth Date:</strong> ${playerData.player.birth.date}</p>
                                    <p><strong>Country:</strong> ${playerData.player.birth.country}</p>
                                    
                                    <h3>Statistics:</h3>
                                    ${generateStatsHtml(playerData.statistics)}
                                </div>
                        `,
                        confirmButtonText: 'OK',
                        width: '80%',
                        padding: '20px',
                        background: '#fff',
                        customClass: {
                            container: 'swal-container',
                            popup: 'swal-popup'
                        }
                    });
                })
                .catch(error => {
                    //throw new ExpressError('선수 분석 중 에러 발생', 500);
                });
        });
    });
});
