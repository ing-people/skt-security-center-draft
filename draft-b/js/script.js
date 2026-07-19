const main = document.querySelector(".main");
const mainTitle2 = document.querySelector(".main-tit-wrap2");
const visual = document.querySelector(".main-visual");

const END_WIDTH = 489;

/**
 * 히어로 타이틀: 페이지 로딩이 끝나면 천천히 나타나도록 처리
 * (로딩 완료 후 숨김 상태를 한 번 그린 뒤 클래스를 추가해 트랜지션이 확실히 재생되도록 함)
 */
const revealMainTitle = () => {
    const title = document.querySelector(".main-title");
    if (title) title.classList.add("is-loaded");
};
const scheduleRevealMainTitle = () => setTimeout(revealMainTitle, 60);
if (document.readyState === "complete") {
    scheduleRevealMainTitle();
} else {
    window.addEventListener("load", scheduleRevealMainTitle);
}

/**
 * 스크롤 이벤트
 */
const handleScroll = () => {
    mainMotion();
};

/**
 * 메인 모션 함수
 */
const mainMotion = () => {
    const rect = main.getBoundingClientRect();

    let progress = (-rect.top / window.innerHeight) * 4;
    progress = Math.max(0, Math.min(progress, 1));

    resizeVisual(progress);
    toggleVisualState(progress);
};

/**
 * 메인 비주얼 리사이즈
 * @param {number} progress 스크롤 진행률(0 ~ 1)
 */
const resizeVisual = (progress) => {
    const startWidth = main.clientWidth;

    if (progress === 0) {
        visual.style.width = "";
        return;
    }

    const width = startWidth - (startWidth - END_WIDTH) * progress;

    visual.style.width = `${width}px`;
    mainTitle2.classList.toggle("show", progress >= 1);
};

/**
 * 메인 비주얼 상태 변경
 * @param {number} progress 스크롤 진행률(0 ~ 1)
 */
const toggleVisualState = (progress) => {
    visual.classList.toggle("active", progress >= 1);
};


window.addEventListener("scroll", handleScroll);