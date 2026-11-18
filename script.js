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
