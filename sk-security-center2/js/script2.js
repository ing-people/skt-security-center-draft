const isMobile = () => window.innerWidth <= 767;const mainTit = document.querySelector(".main-tit-wrap");/**
 * =========================
 * Element
 * =========================
 */
const mainImg= document.querySelector(".main-img");

const sectionEls = [
    document.querySelector(".section1"),
    document.querySelector(".section2"),
    document.querySelector(".section3"),
    document.querySelector(".section4"),
    document.querySelector(".section5"),
    document.querySelector(".section6"),
];

const section1Txt = document.querySelectorAll(".js-anchor");
const navItems = document.querySelectorAll(".section1-item");

const pcNavItems = document.querySelectorAll(".section1-left .section1-item");
const moNavItems = document.querySelectorAll(".section1-info.mo-ver .section1-item");
const moNavWrap = document.querySelector(".section1-info.mo-ver");

const section2nav = document.querySelectorAll(".section2-nav-wrap .nav");
const section2Txt = document.querySelectorAll(".architecture-desc");

const openButtons = document.querySelectorAll(".btn-open-modal");
const closeButtons = document.querySelectorAll(".btn-modal-close");

const btnViewWeb = document.querySelector(".btn-view-web");
const pdfViewer = document.querySelector(".pdf-view-wrap");
const btnCloseView = document.querySelector(".btn-close-view");

const getNavItems = () => {
    return window.innerWidth <= 767 ? moNavItems : pcNavItems;
};

const section2PcNavItems = document.querySelectorAll(".section2-nav-wrap .nav");
const section2MoNavItems = document.querySelectorAll(".section2-nav-inner.mo-ver .nav");
const section2MoNavWrap = document.querySelector(".section2-nav-wrap.mo-ver");

const getSection2NavItems = () => {
    return isMobile() ? section2MoNavItems : section2PcNavItems;
};

/**
 * 메인 모션 함수
 */
const mainMotion = () => {
    setTimeout(() => {
        mainTit.classList.add('show');


        if (!mainImg) return;
        mainImg.classList.add('show')
        setTimeout(() => {

            mainImg.style.width =  "95%";
            setTimeout(() => {
                mainImg.classList.add('main-img2');
            }, 2000)
        }, 500)

   
    }, 500)


}

window.addEventListener("resize", mainMotion);

const subTitWrap = document.querySelector("#main-b .sub-tit-wrap");

const subTitleMotion = () => {
    if (!subTitWrap || !mainImg) return;

    const rect = subTitWrap.getBoundingClientRect();
    const trigger = window.innerHeight * 0.4;

    if (rect.top <= trigger) {
        mainImg.classList.add("shrink");
        subTitWrap.classList.add("show");
        // 또는
        // mainImg.style.width = window.innerWidth > 1200 ? "70%" : "100%";
    } else {
        subTitWrap.classList.remove("show");
        mainImg.classList.remove("shrink");
        // 또는
        // mainImg.style.width = window.innerWidth > 1200 ? "95%" : "100%";
    }
};

window.addEventListener("scroll", subTitleMotion);
window.addEventListener("resize", subTitleMotion);

subTitleMotion();


/**
 * =========================
 * Section Motion
 * =========================
 */
const sectionMotion = () => {

    sectionEls.forEach((section, index)=>{

        if(!section) return;

        const last = index === sectionEls.length - 1;

        const trigger = [
            0.4,
            0.7,
            0.5,
            0.5,
            0.4,
            0.4
        ][index];

        const rect = section.getBoundingClientRect();

        let show;

        if(last){
            // 페이지 끝 도달 시 show
            show = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
        } else {
            show = rect.top <= window.innerHeight * trigger;
        }

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
    const trigger = 100;

    let current = -1;

    section1Txt.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= trigger) {
            current = index;
        }
    });

    getNavItems().forEach((item, index) => {
        item.classList.toggle("active", index === current);
    });

    if (window.innerWidth <= 767 && current > -1) {
        moveMobileNav(current);
    }

};

const moveMobileNav = (index) => {
    if (window.innerWidth > 767) return;

    const activeItem = moNavItems[index];
    if (!activeItem) return;

    moNavWrap.scrollTo({
        left: activeItem.offsetLeft - 20, // padding 만큼
        behavior: "smooth"
    });
};

const moveSection2MobileNav = (index) => {
    if (!isMobile()) return;

    const activeItem = section2MoNavItems[index];
    if (!activeItem) return;


    section2MoNavWrap.scrollTo({
        left: activeItem.offsetLeft - 20,
        behavior: "smooth",
    });
};


const initSection1Nav = () => {

   [pcNavItems, moNavItems].forEach((items) => {

        items.forEach((item, index) => {
            item.addEventListener("click", () => {
                if ( isMobile()) {
                    const y =
                        window.scrollY +
                        section1Txt[index].getBoundingClientRect().top - 80;

                    window.scrollTo({
                        top: y,
                        behavior: "smooth",
                    });
                } else {

                    const offset = 100;

                    const y =
                        window.scrollY +
                        section1Txt[index].getBoundingClientRect().top -
                        offset;

                    window.scrollTo({
                        top: y,
                        behavior: "smooth",
                    });
                    // section1Txt[index].scrollIntoView({
                    //     behavior: "smooth",
                    //     block: "start",
                    // });
                }
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

    const offset = 70; // header 높이 보정
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
    // getSection2NavItems().forEach((item, index) => {
    //     item.classList.toggle("active", index === current);
    // });

    // if (isMobile() && current > -1) {
    //     moveSection2MobileNav(current);
    // }


    // 오른쪽 content active
    section2Txt.forEach((section,index)=>{
        section.classList.toggle(
            "active",
            index === current
        );

    });

};


const initSection2Nav = () => {

    [section2PcNavItems, section2MoNavItems].forEach((items) => {

        items.forEach((item, index) => {

            item.addEventListener("click", (e) => {
                e.preventDefault();

                if (isMobile()) {
                    const y =
                        window.scrollY +
                        section2Txt[index].getBoundingClientRect().top -
                        80;

                    window.scrollTo({
                        top: y,
                        behavior: "smooth",
                    });
                } else {
                    section2Txt[index].scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
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
    updateSection2Active();
};

/**
 * =========================
 * Init
 * =========================
 */
const init = () => {
    mainMotion();
    initSection1Nav();
    initSection2Nav(); 
    initModal();
    initPdfViewer();
    handleScroll();
};


window.addEventListener( "scroll" , handleScroll );
window.addEventListener("DOMContentLoaded", init );