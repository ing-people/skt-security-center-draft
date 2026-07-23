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
const mainMotion = () => {
      setTimeout(()=>{

        const mainTitle = document.querySelector(".main-title");

        mainTitle.classList.add("show");

        let delay = 0;
        const lineDelay = 0.3; // 줄 넘어갈 때 추가 딜레이

        mainTitle.childNodes.forEach(node => {

            if(node.nodeName === "BR"){
                delay += lineDelay;
                return;
            }

            if(node.nodeName === "SPAN"){
                node.style.transitionDelay = `${delay}s`;
                delay += 0.08;
            }

        });

    }, 300);

};

const colorTitle = document.querySelector(".main-title2.color");

window.addEventListener("scroll", () => {

    if (window.scrollY >= 300) {
        mainTitle2.classList.add('show');

        setTimeout(() => {
            colorTitle.classList.add("active");
        }, 500)
    } 

});

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

        section.classList.toggle("show",show);
        section.classList.toggle("hide",!show);

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
const section2Motion = () => {

    if(!slideEl) return;

    const rect = slideEl.getBoundingClientRect();

    if(rect.top <= 200){

        section2Nav.classList.add("compact");
        if(rect.top <= 0){
            section2Nav.classList.add("sticky");
        }else{
            section2Nav.classList.remove("sticky");
        }

    }else{
        section2Nav.classList.remove(
            "compact",
            "sticky"
        );
        section2Nav.querySelector('.nav1').classList.remove('active');
    }

};


const updateActive2 = () => {

    slides.forEach((slide,index)=>{

        const rect =
            slide.getBoundingClientRect();


        if(rect.top <= 100){

            navLinks.forEach(link=>{
                link.classList.remove("active");
            });


            navLinks[index]
                ?.classList.add("active");

        }

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

/**
 * =========================
 * Scroll
 * =========================
 */
const handleScroll = () => {
    sectionMotion();
    updateActive();
    updateActive2();
    section2Motion();
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
