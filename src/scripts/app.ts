// All client behaviour. Kept small and dependency-free: CSS does most of the motion,
// JS only toggles state or writes transform/opacity.
import { initBooking } from './booking';
import { initViewer } from './viewer';

declare global { interface Window { __rv?: boolean } }

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/* ------------------------------------------------------------ reveal on scroll */
function initReveal() {
  const items = $$('[data-reveal]:not(.is-in)');
  // stagger siblings inside [data-stagger]
  $$('[data-stagger]').forEach((group) => {
    $$('[data-reveal]', group).forEach((el, i) => el.style.setProperty('--d', `${Math.min(i, 6) * 90}ms`));
  });
  if (reduceMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------ header: hide on scroll down, show on scroll up */
let scrollCleanup: (() => void) | null = null;
function initHeader() {
  scrollCleanup?.();
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const overlay = header.dataset.overlay === 'true';
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
  let lastY = window.scrollY;
  let ticking = false;

  const menuOpen = () => menu?.dataset.open === 'true';
  const setMenu = (open: boolean) => {
    if (!menu || !btn) return;
    menu.dataset.open = String(open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector<HTMLElement>('[data-icon-open]')!.hidden = open;
    btn.querySelector<HTMLElement>('[data-icon-close]')!.hidden = !open;
    if (open) { header.dataset.hidden = 'false'; header.dataset.solid = 'true'; }
    else if (overlay && window.scrollY < 24) header.dataset.solid = 'false';
  };
  const onBtn = () => setMenu(!menuOpen());
  const onMenuClick = (e: Event) => { if ((e.target as Element).closest('a')) setMenu(false); };
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuOpen()) { setMenu(false); btn?.focus(); } };
  btn?.addEventListener('click', onBtn);
  menu?.addEventListener('click', onMenuClick);
  document.addEventListener('keydown', onKey);

  const update = () => {
    ticking = false;
    const y = Math.max(0, window.scrollY); // iOS rubber-banding gives negative values
    const dy = y - lastY;
    if (overlay && !menuOpen()) header.dataset.solid = y > 24 ? 'true' : 'false';
    if (!menuOpen()) {
      if (y < 40) header.dataset.hidden = 'false';
      else if (dy > 6) header.dataset.hidden = 'true';
      else if (dy < -6) header.dataset.hidden = 'false';
    }
    if (Math.abs(dy) > 6) lastY = y;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  scrollCleanup = () => {
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('keydown', onKey);
  };
}

/* ------------------------------------------------------------ parallax with a frame-time guard */
let parallaxCleanup: (() => void) | null = null;
function initParallax() {
  parallaxCleanup?.();
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weak = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
  const els = $$('[data-parallax]');
  if (!els.length || reduceMotion() || weak) return;

  const state = new Map<HTMLElement, boolean>();
  const io = new IntersectionObserver((entries) => entries.forEach((e) => state.set(e.target as HTMLElement, e.isIntersecting)), { rootMargin: '10% 0px' });
  els.forEach((el) => { state.set(el, false); io.observe(el); });

  let raf = 0, last = 0, slow = 0, off = false;
  const frame = (now: number) => {
    raf = 0;
    if (off) return;
    // Guard: if frames take >28ms repeatedly while scrolling, switch parallax off for good.
    if (last) { const d = now - last; slow = d > 28 ? slow + 1 : Math.max(0, slow - 1); if (slow > 12) { disable(); return; } }
    last = now;
    const vh = window.innerHeight;
    state.forEach((visible, el) => {
      if (!visible) return;
      const host = el.parentElement!.getBoundingClientRect();
      const amp = parseFloat(el.dataset.parallax || '0.05'); // fraction of host height
      const p = (host.top + host.height / 2 - vh / 2) / (vh / 2 + host.height / 2); // -1..1
      const clamped = Math.max(-1, Math.min(1, p));
      el.style.transform = `translate3d(0, ${(-clamped * host.height * amp).toFixed(1)}px, 0)`;
    });
  };
  const request = () => { if (!raf && !off) raf = requestAnimationFrame(frame); };
  const onScroll = () => { if (!raf) last = 0; request(); };
  const disable = () => { off = true; els.forEach((el) => (el.style.transform = '')); window.removeEventListener('scroll', onScroll); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  request();
  parallaxCleanup = () => { disable(); io.disconnect(); window.removeEventListener('resize', request); };
}

/* ------------------------------------------------------------ expand / collapse (delegated once) */
function initCollapse() {
  if ((document as any).__collapse) return;
  (document as any).__collapse = true;
  document.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-collapse]');
    if (!btn) return;
    const panel = document.getElementById(btn.dataset.collapse!);
    if (!panel) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    if (open) panel.removeAttribute('inert'); else panel.setAttribute('inert', '');
    // Animate an explicit pixel height (measured from the content), then release it to "auto"
    // so the card always fits its content exactly and follows resizes / language fonts.
    const done = () => { if (panel.dataset.open === 'true') panel.style.height = 'auto'; };
    panel.ontransitionend = (ev) => { if (ev.target === panel && ev.propertyName === 'height') done(); };
    if (open) {
      panel.style.height = '0px';
      panel.dataset.open = 'true';
      void panel.offsetHeight;
      panel.style.height = `${panel.scrollHeight}px`;
      if (reduceMotion()) done(); else window.setTimeout(done, 520);
    } else {
      panel.style.height = `${panel.getBoundingClientRect().height}px`;
      void panel.offsetHeight;
      panel.dataset.open = 'false';
      panel.style.height = '0px';
    }
  });
}

/* ------------------------------------------------------------ carousel dots */
function initCarousels() {
  $$('[data-carousel]').forEach((row) => {
    const dots = row.parentElement?.querySelector<HTMLElement>('[data-dots]');
    if (!dots) return;
    const items = Array.from(row.children) as HTMLElement[];
    dots.innerHTML = items.map(() => '<span></span>').join('');
    const spans = Array.from(dots.children) as HTMLElement[];
    const set = () => {
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const step = (items[0]?.offsetWidth ?? 1) + gap;
      const max = row.scrollWidth - row.clientWidth;
      const x = Math.abs(row.scrollLeft);
      const i = max > 0 && x >= max - 2 ? items.length - 1 : Math.round(x / step);
      spans.forEach((s, n) => (s.dataset.on = String(n === i)));
    };
    let t = 0;
    row.addEventListener('scroll', () => { cancelAnimationFrame(t); t = requestAnimationFrame(set); }, { passive: true });
    set();
  });
}

/* ------------------------------------------------------------ map: tap to activate so it never traps page scroll */
function initMap() {
  const veil = document.querySelector<HTMLElement>('[data-map-veil]');
  const frame = document.querySelector<HTMLIFrameElement>('[data-map]');
  veil?.addEventListener('click', () => { veil.remove(); if (frame) frame.style.pointerEvents = 'auto'; });
}

/* ------------------------------------------------------------ boot */
function init() {
  window.__rv = true;
  document.documentElement.classList.add('js');
  initReveal();
  initHeader();
  initParallax();
  initCollapse();
  initCarousels();
  initMap();
  initBooking();
  initViewer();
}

// ClientRouter swaps <html> attributes: keep the "js" class on the incoming document.
document.addEventListener('astro:before-swap', (e) => {
  (e as any).newDocument.documentElement.classList.add('js');
});
document.addEventListener('astro:page-load', init);
