// Concept-A (draft-a) lower-section animations, ported into draft-b.
// (Hero + top-nav logic from draft-a is intentionally omitted — draft-b uses
//  the B안 header/main hero above these sections.)
(() => {
  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const lerp = (a, b, t) => a + (b - a) * t;
  const mapRange = (v, a, b) => clamp01((v - a) / (b - a));
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Architecture steps: infinite horizontal conveyor that settles centered and
  // hands off (shrink + drop) to the centered navigation.
  const archSteps = document.getElementById('architectureSteps');
  const archStage = document.getElementById('archStage');
  const archTrack = document.getElementById('archTrack');
  const identifyTabs = document.getElementById('identifyTabs');

  if (archSteps && archStage && archTrack && identifyTabs) {
    const ARCH_COPIES = 5;
    const ARCH_LOOPS = 2;
    const archBaseSet = Array.from(archTrack.children);
    for (let c = 1; c < ARCH_COPIES; c++) {
      archBaseSet.forEach((el) => archTrack.appendChild(el.cloneNode(true)));
    }
    const archStepEls = archTrack.querySelectorAll('.arch-step');
    const perSet = archBaseSet.length;

    let archSetW = 0, archMidCenter = 0, archDropY = 90;
    function measureArch() {
      archSetW = archStepEls[perSet].offsetLeft - archStepEls[0].offsetLeft;
      const midCopy = Math.floor(ARCH_COPIES / 2);
      const first = archStepEls[midCopy * perSet];
      const last = archStepEls[midCopy * perSet + perSet - 1];
      archMidCenter = (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2;
      const savedStage = archStage.style.transform;
      const savedTabs = identifyTabs.style.transform;
      archStage.style.transform = 'none';
      identifyTabs.style.transform = 'none';
      const s = archStage.getBoundingClientRect();
      const tb = identifyTabs.getBoundingClientRect();
      archDropY = (tb.top + tb.height / 2) - (s.top + s.height / 2);
      archStage.style.transform = savedStage;
      identifyTabs.style.transform = savedTabs;
    }

    function updateArchSteps() {
      const rect = archSteps.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = clamp01(mapRange(vh * 0.9 - rect.top, 0, vh * 0.9 - vh * 0.1));

      const baseX = archSteps.clientWidth / 2 - archMidCenter;
      let offset = 0;
      if (archSetW > 0) {
        const freeTurns = (t / 0.72) * ARCH_LOOPS;
        offset = (((freeTurns * archSetW) % archSetW) + archSetW) % archSetW;
        if (offset > archSetW / 2) offset -= archSetW;
        offset *= 1 - easeInOutCubic(mapRange(t, 0.5, 0.72));
      }
      archTrack.style.transform = `translateX(${baseX + offset}px)`;

      const shrink = easeInOutCubic(mapRange(t, 0.2, 0.85));
      archStage.style.transform = `translateY(${lerp(0, archDropY, shrink)}px) scale(${lerp(1, 0.25, shrink)})`;
      archStage.style.opacity = String(1 - mapRange(t, 0.72, 1));

      const navT = mapRange(t, 0.66, 1);
      identifyTabs.style.opacity = String(navT);
      identifyTabs.style.transform = `translateY(${lerp(16, 0, navT)}px)`;
    }
    measureArch();
    window.addEventListener('scroll', updateArchSteps, { passive: true });
    window.addEventListener('resize', () => { measureArch(); updateArchSteps(); });
    updateArchSteps();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { measureArch(); updateArchSteps(); });
    }
  }

  // Scroll reveal
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
  revealTargets.forEach((el) => revealObserver.observe(el));

  // Identify step tabs
  const tabs = Array.from(document.querySelectorAll('.identify-tab'));
  const prevBtn = document.getElementById('identifyPrev');
  const nextBtn = document.getElementById('identifyNext');
  if (tabs.length && prevBtn && nextBtn) {
    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    function setActiveTab(tab) {
      tabs.forEach((tt) => {
        tt.classList.toggle('is-active', tt === tab);
        tt.setAttribute('aria-selected', tt === tab ? 'true' : 'false');
      });
    }
    function step(direction) {
      const activeIndex = enabledTabs.findIndex((tt) => tt.classList.contains('is-active'));
      const nextIndex = (activeIndex + direction + enabledTabs.length) % enabledTabs.length;
      setActiveTab(enabledTabs[nextIndex]);
    }
    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));
  }
})();
