const header = document.querySelector(".header");
const mainImage = document.querySelector(".main-image");


// 헤더와 메인 이미지의 투명도 조절은 그대로 유지합니다.
window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // 헤더 투명도 조절
    header.style.opacity = 1 - scrollY / 100;

    // 메인 이미지 투명도 조절
    mainImage.style.opacity = 1 - scrollY / 500;
});
