document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav-links');
const mobile = window.matchMedia('(max-width: 600px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const navLinks = [...document.querySelectorAll('.nav-links a')];

function closeMenu(returnFocus = false) {
  toggle?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (returnFocus) toggle?.focus();
}
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});
navLinks.forEach((link, index) => {
  link.style.setProperty('--link-index', index);
  link.addEventListener('click', () => closeMenu());
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.classList.contains('is-open')) closeMenu(true);
  if (event.key === 'Tab' && menu?.classList.contains('is-open')) {
    const last = navLinks.at(-1);
    if (event.shiftKey && document.activeElement === toggle) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.focus(); }
  }
});
mobile.addEventListener('change', () => closeMenu());

if ('IntersectionObserver' in window) {
  // Observe first, then opt into animation so unsupported browsers show all content.
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  if (!reducedMotion.matches) document.querySelectorAll('.case-study, .principles article, .about-copy').forEach(element => {
    revealObserver.observe(element);
    element.classList.add('reveal');
  });

  const heading = document.querySelector('.word-reveal');
  if (heading) {
    // Keep the original text accessible and readable without animation support.
    const label = [...heading.childNodes].map(node => node.nodeName === 'BR' ? ' ' : node.textContent).join('');
    heading.setAttribute('aria-label', label);
    for (const node of [...heading.childNodes]) if (node.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();
      for (const word of node.textContent.split(/(\s+)/)) {
        if (/^\s*$/.test(word)) fragment.append(document.createTextNode(word));
        else { const span = document.createElement('span'); span.textContent = word; span.setAttribute('aria-hidden', 'true'); fragment.append(span); }
      }
      node.replaceWith(fragment);
    }
    const words = [...heading.querySelectorAll('span')];
    let litCount = 0;
    let scheduled = false;
    function updateWords() {
      scheduled = false;
      const bounds = heading.getBoundingClientRect();
      const start = window.innerHeight * .85;
      const distance = window.innerHeight * .6 + bounds.height;
      const progress = Math.max(0, Math.min(1, (start - bounds.top) / distance));
      litCount = reducedMotion.matches ? words.length : Math.max(litCount, Math.ceil(progress * words.length));
      words.forEach((word, index) => word.classList.toggle('is-lit', index < litCount));
    }
    if (!reducedMotion.matches) heading.classList.add('is-observed');
    function requestWords() {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateWords); }
    }
    window.addEventListener('scroll', requestWords, { passive: true });
    window.addEventListener('resize', requestWords);
    updateWords();
  }

  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) navLinks.forEach(link => {
      if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -45% 0px', threshold: [0, .1, .3] });
  document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
    document.querySelectorAll('.word-reveal span').forEach(word => word.classList.add('is-lit'));
  }
});

// GSAP is a progressive enhancement: navigation and static graphics work without it.
if (window.gsap && window.MotionPathPlugin && window.CustomEase) {
  const { gsap, MotionPathPlugin, CustomEase } = window;
  gsap.registerPlugin(MotionPathPlugin, CustomEase);
  CustomEase.create('portfolio', '0.22,1,0.36,1');

  const motion = gsap.matchMedia();
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    const observers = [];
    const removeListeners = [];

    function playOnEntry(element, timeline, threshold = .3) {
      if (!element) return;
      if (!('IntersectionObserver' in window)) return;
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          timeline.restart();
          observer.disconnect();
        }
      }, { threshold });
      observer.observe(element);
      observers.push(observer);
    }

    function addReplay(selector, timeline) {
      const button = document.querySelector(selector);
      if (!button) return;
      const replay = () => timeline.restart();
      button.hidden = false;
      button.addEventListener('click', replay);
      removeListeners.push(() => {
        button.removeEventListener('click', replay);
        button.hidden = true;
      });
    }

    const diagram = document.querySelector('.systems-map');
    if (diagram) {
      const signal = diagram.querySelector('.flow-signal');
      const recovery = diagram.querySelector('.recovery-node');
      const sequence = gsap.timeline({ id: 'portfolio-workflow', paused: true, defaults: { ease: 'portfolio' } });
      sequence.set(signal, { opacity: 0 });
      function traverse(selector, duration) {
        const path = diagram.querySelector(selector);
        const point = path.getPointAtLength(0);
        sequence.set(signal, { x: point.x, y: point.y })
          .to(signal, { opacity: 1, duration: .2 })
          .to(signal, { motionPath: { path }, duration })
          .to(signal, { opacity: 0, duration: .2 });
      }
      traverse('#flow-input', .45);
      traverse('#flow-recover', .4);
      sequence.fromTo(recovery, { opacity: .5 }, { opacity: 1, duration: .4 });
      traverse('#flow-retry', .7);
      traverse('#flow-commit', .45);
      playOnEntry(diagram, sequence, .5);
      addReplay('.diagram-replay', sequence);
    }

    document.querySelectorAll('.project-preview').forEach((preview, index) => {
      const graphics = [...preview.querySelectorAll('.preview-flow>span')];
      const sequence = gsap.timeline({ id: `portfolio-preview-${index}`, paused: true });
      sequence.fromTo(graphics,
        { opacity: .55, y: 8 },
        { opacity: 1, y: 0, duration: .5, stagger: .1, ease: 'portfolio', immediateRender: false });
      playOnEntry(preview, sequence);
    });

    const sports = document.querySelector('.sport-motifs');
    if (sports) {
      const ball = sports.querySelector('.rally-ball');
      const paddle = sports.querySelector('.paddle');
      const football = sports.querySelector('.football-ball');
      const rallyPath = sports.querySelector('.rally-art .sport-trail');
      const passPath = sports.querySelector('.football-art .sport-trail');
      const sequence = gsap.timeline({ id: 'portfolio-sports', paused: true, defaults: { ease: 'portfolio' } });
      sequence.set(ball, { x: 45, y: 43 })
        .set(football, { x: 24, y: 39, rotation: 0, svgOrigin: '0 0' })
        .set(paddle, { rotation: 0, svgOrigin: '18 39' })
        .to(paddle, { rotation: -8, duration: .2 }, 0)
        .to(paddle, { rotation: 5, duration: .25 }, .2)
        .to(paddle, { rotation: 0, duration: .4 }, .45)
        .to(ball, { motionPath: { path: rallyPath }, duration: 1.2 }, .2)
        .to(ball, { motionPath: { path: rallyPath, start: 1, end: 0 }, duration: 1.2 }, 1.4)
        .to(football, { motionPath: { path: passPath }, rotation: 300, duration: 1.2 }, .2)
        .to(football, { motionPath: { path: passPath, start: 1, end: 0 }, rotation: 0, duration: 1.2 }, 1.4);
      playOnEntry(sports, sequence, .5);
      addReplay('.motion-replay', sequence);
    }

    // matchMedia reverts inline animation styles when motion is reduced.
    return () => {
      observers.forEach(observer => observer.disconnect());
      removeListeners.forEach(remove => remove());
    };
  });
}
