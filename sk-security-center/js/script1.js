/**
 * =========================
 * Element
 * =========================
 */
const main = document.querySelector(".main");
const visual = document.querySelector(".main-visual");
const mainTitle = document.querySelector(".main-title");
const mainDescription = document.querySelector(".main-description");

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

const section2nav = document.querySelectorAll(".section2-nav-wrap .nav");
const section2Txt = document.querySelectorAll(".architecture-desc");

const openButtons = document.querySelectorAll(".btn-open-modal");
const closeButtons = document.querySelectorAll(".btn-modal-close");

const btnViewWeb = document.querySelector(".btn-view-web");
const pdfViewer = document.querySelector(".pdf-view-wrap");
const btnCloseView = document.querySelector(".btn-close-view");


/**
 * =========================
 * Main Motion
 * =========================
 */
const startWidth = visual?.offsetWidth;
const startHeight = visual?.offsetHeight;
const ratio = startHeight / startWidth;

const resizeVisual = (progress) => {
    const targetWidth = main.clientWidth;

    const width = startWidth + (targetWidth - startWidth) * progress;

    const height = startHeight * (width / startWidth);

    visual.style.width = `${width}px`;
    visual.style.height = `${height}px`;
};


const titleMotion = (progress) => {
    const opacity = 1 - (progress / 0.3);

    mainTitle.style.opacity = Math.max(0, opacity);
};


const mainMotion = () => {
    const rect = main.getBoundingClientRect();
    const scrollHeight = main.offsetHeight - window.innerHeight;

    let progress = -rect.top / scrollHeight;
    progress = Math.max(0, Math.min(progress, 1));
    const SCALE_END = 0.5;
    // 이미지 확대 구간
    if(progress <= SCALE_END){
        const scaleProgress = progress / SCALE_END;
        resizeVisual(scaleProgress);
        titleMotion(scaleProgress);

        visual.style.opacity = 1;
        mainDescription.style.opacity = 0;

        visual.classList.remove("active");
    }


    // 이미지 확대 완료 후
    else {

        const fadeProgress = (progress - SCALE_END) / SCALE_END;


        resizeVisual(1);
        titleMotion(1);

        visual.style.opacity = 1 - fadeProgress * 0.8;
        mainDescription.style.opacity = fadeProgress;

        visual.classList.add("active");
    }
};



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

    const center = window.innerHeight / 2;

    let current = 0;
    let minDistance = Infinity;


    section1Txt.forEach((section,index)=>{

        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter-center);

        if(distance < minDistance){
            minDistance = distance;
            current = index;
        }

    });


    navItems.forEach((item,index)=>{

        item.classList.toggle(
            "active",
            index === current
        );

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
    mainMotion();
    sectionMotion();
    updateActive();
    updateSection2Active();
};



/**
 * =========================
 * Init
 * =========================
 */
const init = () => {
    initSection1Nav();
    initModal();
    initPdfViewer();
    handleScroll();
};


window.addEventListener( "scroll" , handleScroll );
window.addEventListener("DOMContentLoaded", init );