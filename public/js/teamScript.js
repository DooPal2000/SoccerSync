document.addEventListener('DOMContentLoaded', function () {
    console.log('teamScript opened')
    // 모든 "선수 분석" 버튼을 선택
    const analyzePlayerButtons = document.querySelectorAll('.analyze-player-btn');

    analyzePlayerButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 클릭된 버튼에서 선수 ID를 가져옴
            const playerId = this.getAttribute('data-player-id');
            console.log(playerId);

            // axios를 사용하여 POST 요청 전송
            axios.post('/analysis/players', { playerId })
                .then(response => {
                    // 서버 응답 처리
                    if (response.data.success) {
                        // 성공적으로 분석 페이지로 이동
                        console.log(response);
                        // window.location.href = `/analysis/players/${playerId}`;
                    } else {
                        //throw new ExpressError('선수 분석 중 에러 발생', 400);
                    }
                })
                .catch(error => {
                    //throw new ExpressError('선수 분석 중 에러 발생', 500);
                });
        });
    });
});
