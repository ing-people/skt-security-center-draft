/**
 * =========================
 * Element
 * =========================
 */
const main = document.querySelector("#main-c");
const imgWrap = document.querySelector('.main-visual-img');
const img = main.querySelector(".main-visual-img img");
const title = main.querySelector(".main-title");
const visual = main.querySelector(".main-visual");
const desc = main.querySelector(".main-description");

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
const mainMotion = () => {
    const mainVisual = document.querySelector(".main-visual");
    const titles = document.querySelectorAll(".main-title");


    titles.forEach((title, lineIndex)=>{

        const nodes = [...title.childNodes];

        let charIndex = 0;


        nodes.forEach(node=>{


            // 텍스트만 처리
            if(node.nodeType === Node.TEXT_NODE){


                const text = node.textContent.trim();


                if(!text) return;


                const fragment = document.createDocumentFragment();


                [...text].forEach(char=>{


                    const span = document.createElement("span");

                    span.className = "char";
                    span.textContent = char;


                    span.style.transitionDelay =
                        `${lineIndex * 0.15 + charIndex * 0.035}s`;


                    charIndex++;


                    fragment.appendChild(span);

                });


                node.replaceWith(fragment);

            }


        });


        // 이미지 딜레이
        const img = title.querySelector("img");


        if(img){

            img.style.transitionDelay =
                `${lineIndex * 0.15 + charIndex * 0.035}s`;

        }


    });


    // 실행
    setTimeout(()=>{

        mainVisual.classList.add("is-show");

    },300);
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

    const offset = 200; // header 높이 보정
    let current = 0;

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