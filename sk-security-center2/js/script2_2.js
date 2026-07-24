const main = document.querySelector(".main");
const mainTitle2 = document.querySelector(".main-tit-wrap2");

const sectionEls = [
    document.querySelector(".section1"),
    document.querySelector(".section2"),
    document.querySelector(".section3"),
    document.querySelector(".section4"),
    document.querySelector(".section5"),
    document.querySelector(".section6"),
];

const section1Txt = document.querySelectorAll(".sec1-text");
const navItems = document.querySelectorAll(".section1-item");

const section2Desc = document.querySelector(".section2-desc");
const section2Nav = document.querySelector(".section2-nav-large");
const slideEl = document.querySelector(".architecture-swiper");
const slides = document.querySelectorAll(".slide");
const navLinks = document.querySelectorAll(".section2-nav a");

const openButtons = document.querySelectorAll(".btn-open-modal");
const closeButtons = document.querySelectorAll(".btn-modal-close");

const btnViewWeb = document.querySelector(".btn-view-web");
const pdfViewer = document.querySelector(".pdf-view-wrap");
const btnCloseView = document.querySelector(".btn-close-view");

const END_WIDTH = 489;

/**
 * 메인 모션 함수
 */
const stickyWrap = document.querySelector(".sticky-wrap");
const movingTitle = document.querySelector(".hero-moving-title");
const accentWraps = document.querySelectorAll(".hero-accent-wrap");
const accentShapes = document.querySelectorAll(".hero-accent-shape");
const titleShade = document.querySelector(".hero-title-shade");
const heroDesc = document.querySelector(".hero-desc-wrap");

let ticking = false;
let currentProgress = 0;

const mainMotion = () => {

 document.querySelector(".hero-title-wrap").classList.add("show");

    const rect = stickyWrap.getBoundingClientRect();
    const scrollRange = stickyWrap.offsetHeight - window.innerHeight;

    // let progress = -rect.top / scrollRange;
    // progress = Math.min(Math.max(progress, 0), 1);

    let targetProgress = -rect.top / scrollRange;
    targetProgress = Math.min(Math.max(targetProgress, 0), 1);

    // 부드럽게 따라가기
    currentProgress += (targetProgress - currentProgress) * 0.08;

    const progress = currentProgress;

    // 애니메이션은 90%까지만 진행
    const animationEnd = 0.9;

    const aniProgress = Math.min(
        progress / animationEnd,
        1
    );

    // 원 축소
    const startWidth = 21;
    const endWidth = 6;

    // 원 축소는 처음부터 시작해서 70%에서 완료
    const shrinkEnd = 0.7;

    const shrinkProgress = Math.min(
        progress / shrinkEnd,
        1
    );

    const width =
        startWidth - ((startWidth - endWidth) * shrinkProgress);

    accentWraps.forEach((el)=>{
        el.style.width = `${width}vw`;
    });
    // 원 컬러 변경
    if(progress > 0.7){
        accentShapes.forEach((el)=>{
            el.style.backgroundColor = "#000";
        });
    }else{
        accentShapes.forEach((el)=>{
            el.style.backgroundColor = "#f5f5f5";
        });
    }

    // 전체 타이틀 흐름
    const moveStart = 0.7;
    const moveEnd = 0.85;  

    if (progress > moveStart) {

        const moveProgress = Math.min(
            (progress - moveStart) / (moveEnd - moveStart),
            1
        );

        const moveDistance =
            movingTitle.scrollWidth - window.innerWidth + 100;

        movingTitle.style.transform =
            `translateX(${-moveDistance * moveProgress}px)`;

    } else {

        movingTitle.style.transform = "translateX(0)";

    }


    // 원이 된 이후 살짝 작아지고 아래로 이동
    const afterCircleStart = 0.75;

    accentShapes.forEach((el) => {
        el.classList.toggle("comma", aniProgress > 0.9);
    });
    
    if (aniProgress > afterCircleStart) {

        const afterProgress =
            (aniProgress - afterCircleStart) / (1 - afterCircleStart);

        // 1 → 0.5 (50% 축소)
        const scale = 1 - (afterProgress * 0.50);

        // 0 → 20px 아래
        const translateY = afterProgress * 20;
           // 0 → 20px 아래
        const translateX = afterProgress * 20;

        accentShapes.forEach((el)=>{
            el.style.transform =
                `translateY(${translateY}px) translateX(-${translateX}px) scale(${scale})`;
        });

    } else {

        accentShapes.forEach((el)=>{
            el.style.transform =
                "translateY(0) scale(1)";
        });

}

    // 컬러 reveal
    const maskStart = 0.75;

    if (aniProgress > maskStart) {

        const fillProgress = (aniProgress - maskStart) / (1 - maskStart);
        const hide = 100 - (fillProgress * 100);

        titleShade.style.clipPath = `inset(0 ${hide}% 0 0)`;

        // 색이 거의 다 채워졌을 때
        heroDesc.classList.toggle("show", fillProgress > 0.8);

    } else {

        titleShade.style.clipPath = "inset(0 100% 0 0)";
        heroDesc.classList.remove("show");

    }
};

function mainAnimate() {
    mainMotion();
    requestAnimationFrame(mainAnimate);
}


const subTitWrap = document.querySelector(".sub-tit-wrap");
const subTitTexts = document.querySelectorAll(".sub-tit-inner.color .sub-tit-text");

const updateSubTitMotion = () => {

    // const rect = subTitWrap.getBoundingClientRect();
    // const sectionHeight = subTitWrap.offsetHeight;

    // // 섹션 안에서 시작 위치 / 종료 위치
    // const start = sectionHeight * 0.35; 
    // const end = sectionHeight * 0.1;   // 상단 가까이


    // let progress = (start - rect.top) / (start - end);

    // progress = Math.max(0, Math.min(progress, 1));


    // subTitTexts.forEach((text, index)=>{

    //     const section = 1 / subTitTexts.length;

    //     const startProgress = section * index;
    //     const endProgress = section * (index + 1);


    //     let lineProgress =
    //         (progress - startProgress) /
    //         (endProgress - startProgress);


    //     lineProgress = Math.max(0, Math.min(lineProgress, 1));


    //     const hide = 100 - (lineProgress * 100);

    //     text.style.clipPath = `inset(0 ${hide}% 0 0)`;

    // });

};


window.addEventListener("scroll", updateSubTitMotion);

/**
 * =========================
 * Section Motion
 * =========================
 */
const sectionMotion = () => {

    sectionEls.forEach((section, index)=>{

        if(!section) return;

        const trigger = [
            0.4,
            0.7,
            0.5,
            0.5,
            0.4,
            0.4
        ][index];

        const rect = section.getBoundingClientRect();
        const show = rect.top <= window.innerHeight * trigger;

        // section.classList.toggle("show",show);
        // section.classList.toggle("hide",!show);

        if(show) {
            section.classList.add("show");
        }
    });
};

/**
 * =========================
 * Section1 Active
 * =========================
 */
const updateActive = () => {
    const trigger = window.innerHeight / 2 - 100;

    let current = -1;

    section1Txt.forEach((section, index) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= trigger) {
            current = index;
        }
    });

    navItems.forEach((item, index) => {
        item.classList.toggle("active", index === current);
    });

};



const initSection1Nav = () => {
    navItems.forEach((item,index)=>{

        item.addEventListener("click",()=>{
            section1Txt[index]
                .scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                });

        });

    });

};



/**
 * =========================
 * Section2
 * =========================
 */
const updateSection2Active = () => {

    const offset = 500; // header 높이 보정
   let current = -1; // 기본 active 제거

    section2Txt.forEach((section,index)=>{
        const rect = section.getBoundingClientRect();
        if(rect.top - offset <= 0){
            current = index;
        }

    });

    // 왼쪽 nav active
    section2nav.forEach((item,index)=>{
        item.classList.toggle(
            "active",
            index === current
        );

    });


    // 오른쪽 content active
    section2Txt.forEach((section,index)=>{
        section.classList.toggle(
            "active",
            index === current
        );

    });

};

// 클릭 이동
const initSection2Nav = () => {

    section2nav.forEach((item,index)=>{
        item.addEventListener("click",(e)=>{
            e.preventDefault();
            section2Txt[index]
                .scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                });
        });

    });

};



/**
 * =========================
 * Modal
 * =========================
 */
const initModal = () => {

    openButtons.forEach(button=>{
        button.addEventListener("click",e=>{
            e.preventDefault();
            const modal = document.getElementById(button.dataset.modal);

            if(!modal) return;

            modal.classList.add("is-open");
            document.body.classList.add("modal-open");

        });

    });



    closeButtons.forEach(button=>{
        button.addEventListener("click",()=>{

            button.closest(".modal").classList.remove("is-open");
            document.body.classList.remove("modal-open");

        });

    });

};



/**
 * =========================
 * PDF Web View
 * =========================
 */
const initPdfViewer = () => {

    if(!btnViewWeb) return;


    btnViewWeb.addEventListener("click",e=>{
        e.preventDefault();
        pdfViewer.classList.add("active");
        pdfViewer.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    });

    btnCloseView.addEventListener("click",()=>{
        pdfViewer.classList.remove("active");
    });

};


const titles = document.querySelectorAll(".sec1-text");

titles.forEach(title => {
    const lines = title.querySelectorAll("span");
    lines.forEach(line => {
        const content = line.innerHTML;
        line.innerHTML = `
            <div>
                ${content}
            </div>
        `;

    });


    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // 한번만 실행
            }

        });

    },{
        threshold: 0.8
    });


    observer.observe(title);

});

const architectureTexts = document.querySelectorAll(".architecture-desc");

architectureTexts.forEach(text => {
    const spans = text.querySelectorAll("span");
    spans.forEach(span => {

        span.innerHTML = `
            <div class="text-inner">
                ${span.innerHTML}
            </div>
        `;

    });

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("text-ani");
                observer.unobserve(entry.target);
            }
        });

    },{
        threshold:0.5
    });


    observer.observe(text);

});

/**
 * =========================
 * Scroll
 * =========================
 */
const handleScroll = () => {
    // mainMotion();
    sectionMotion();
    updateActive();

    //메인 스크롤이벤트
    if(!ticking){
        mainAnimate()
        ticking = true;
    }
};

/**
 * =========================
 * Init
 * =========================
 */
const init = () => {
    mainMotion();
    initSection1Nav();
    initModal();
    initPdfViewer();
    handleScroll();
};


window.addEventListener( "scroll" , handleScroll );
window.addEventListener("DOMContentLoaded", init );
