// Fullscreen photo viewer: swipe left/right (native scroll-snap), swipe down to close,
// pinch to zoom, double-tap to zoom, Esc/arrows on desktop. Only transform and opacity are animated.
interface Strings { close: string; prev: string; next: string; hint: string; label: string }

const ICON = {
  close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  prev: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>',
  next: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
};

interface Item { thumb: string; full: string; alt: string }
interface Z { s: number; x: number; y: number }

let installed = false;
let current: Viewer | null = null;

export function initViewer() {
  if (installed) return;
  installed = true;
  document.addEventListener('click', (e) => {
    if (current || !(e.target instanceof Element)) return;
    // Only a <button data-viewer> that contains a photo and sits inside a [data-gallery] opens the viewer.
    const trigger = e.target.closest<HTMLElement>('button[data-viewer]');
    if (!trigger || !trigger.querySelector('img')) return;
    const scope = trigger.closest<HTMLElement>('[data-gallery]');
    if (!scope) return;
    const triggers = Array.from(scope.querySelectorAll<HTMLElement>('button[data-viewer]')).filter((t) => t.querySelector('img'));
    const index = triggers.indexOf(trigger);
    if (index < 0) return;
    const items: Item[] = triggers.map((t) => {
      const img = t.querySelector('img')!;
      return { thumb: img.currentSrc || img.src, full: img.dataset.full || img.currentSrc || img.src, alt: img.alt };
    });
    let strings: Strings;
    try { strings = JSON.parse(document.body.dataset.viewerStrings || '{}'); } catch { strings = {} as Strings; }
    current = new Viewer(items, index, strings, trigger, () => (current = null));
  });
  // Leaving the page with the viewer open (back button, link) must not leave the scroll lock behind.
  document.addEventListener('astro:before-swap', () => current?.destroy());
}

class Viewer {
  private root = document.createElement('div');
  private track!: HTMLElement;
  private bg!: HTMLElement;
  private slides: HTMLElement[] = [];
  private imgs: HTMLImageElement[] = [];
  private z: Z[] = [];
  private index: number;
  private pointers = new Map<number, { x: number; y: number }>();
  private mode: 'none' | 'pan' | 'pinch' | 'dismiss' | 'swipe' = 'none';
  private start = { x: 0, y: 0, t: 0 };
  private pinchStart = { d: 0, s: 1 };
  private lastTap = { t: 0, x: 0, y: 0 };
  private dismissY = 0;
  private count!: HTMLElement;
  private loaded = new Set<number>();
  private keyHandler = (e: KeyboardEvent) => this.onKey(e);

  constructor(private items: Item[], index: number, private s: Strings, private origin: HTMLElement, private onClose: () => void) {
    this.index = index;
    this.z = items.map(() => ({ s: 1, x: 0, y: 0 }));
    this.build();
  }

  private build() {
    const r = this.root;
    r.className = 'viewer';
    r.setAttribute('role', 'dialog');
    r.setAttribute('aria-modal', 'true');
    r.setAttribute('aria-label', this.s.label || '');
    r.innerHTML = `
      <div class="viewer-bg"></div>
      <div class="viewer-track" dir="ltr"></div>
      <div class="v-count" aria-live="polite"></div>
      <button type="button" class="v-btn v-close" aria-label="${this.s.close}">${ICON.close}</button>
      ${this.items.length > 1 ? `<button type="button" class="v-btn v-prev" aria-label="${this.s.prev}">${ICON.prev}</button><button type="button" class="v-btn v-next" aria-label="${this.s.next}">${ICON.next}</button>` : ''}
      <p class="v-hint">${this.s.hint}</p>`;
    this.track = r.querySelector('.viewer-track')!;
    this.bg = r.querySelector('.viewer-bg')!;
    this.count = r.querySelector('.v-count')!;

    this.items.forEach((it, i) => {
      const slide = document.createElement('div');
      slide.className = 'v-slide';
      const img = document.createElement('img');
      img.className = 'v-img';
      img.alt = it.alt;
      img.draggable = false;
      img.src = it.thumb;
      slide.appendChild(img);
      this.track.appendChild(slide);
      this.slides.push(slide);
      this.imgs.push(img);
    });

    document.body.appendChild(r);
    document.documentElement.style.overflow = 'hidden';
    this.track.style.scrollSnapType = 'none';
    this.track.scrollLeft = this.index * this.track.clientWidth;
    this.track.style.scrollSnapType = '';
    this.updateCount();
    this.loadAround();
    requestAnimationFrame(() => (r.dataset.open = 'true'));

    r.querySelector('.v-close')!.addEventListener('click', () => this.close());
    r.querySelector('.v-prev')?.addEventListener('click', () => this.go(-1));
    r.querySelector('.v-next')?.addEventListener('click', () => this.go(1));
    this.track.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.track.addEventListener('pointerdown', (e) => this.down(e));
    this.track.addEventListener('pointermove', (e) => this.move(e));
    this.track.addEventListener('pointerup', (e) => this.up(e));
    this.track.addEventListener('pointercancel', (e) => this.cancel(e));
    // Safari: stop the browser's own page-zoom gesture while the viewer is open
    r.addEventListener('gesturestart', (e) => e.preventDefault() as any);
    r.addEventListener('gesturechange', (e) => e.preventDefault() as any);
    document.addEventListener('keydown', this.keyHandler);
    (r.querySelector('.v-close') as HTMLElement).focus({ preventScroll: true });
  }

  /* ---- navigation ---- */
  private go(d: number) {
    const i = Math.max(0, Math.min(this.items.length - 1, this.index + d));
    this.track.scrollTo({ left: i * this.track.clientWidth, behavior: 'smooth' });
  }
  private onScroll() {
    const i = Math.round(this.track.scrollLeft / this.track.clientWidth);
    if (i !== this.index && i >= 0 && i < this.items.length) {
      this.resetZoom(this.index);
      this.index = i;
      this.updateCount();
      this.loadAround();
    }
  }
  private updateCount() { this.count.textContent = `${this.index + 1} / ${this.items.length}`; }
  private loadAround() {
    for (const i of [this.index, this.index - 1, this.index + 1]) {
      if (i < 0 || i >= this.items.length || this.loaded.has(i)) continue;
      this.loaded.add(i);
      const big = new Image();
      big.onload = () => { this.imgs[i].src = this.items[i].full; };
      big.src = this.items[i].full;
    }
  }

  /* ---- zoom helpers ---- */
  private apply(i: number, animate = false) {
    const { s, x, y } = this.z[i];
    const img = this.imgs[i];
    img.style.transition = animate ? 'transform .28s cubic-bezier(.2,.7,.2,1)' : 'none';
    img.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    // While zoomed we own every gesture; at scale 1 the browser keeps horizontal swiping
    this.slides[i].style.touchAction = s > 1.01 ? 'none' : 'pan-x';
    this.track.style.overflowX = s > 1.01 ? 'hidden' : 'auto';
  }
  private clamp(i: number) {
    const z = this.z[i], img = this.imgs[i];
    const mx = Math.max(0, (img.clientWidth * z.s - this.root.clientWidth) / 2 + 40);
    const my = Math.max(0, (img.clientHeight * z.s - this.root.clientHeight) / 2 + 40);
    z.x = Math.max(-mx, Math.min(mx, z.x));
    z.y = Math.max(-my, Math.min(my, z.y));
  }
  private resetZoom(i: number) { this.z[i] = { s: 1, x: 0, y: 0 }; this.apply(i, true); this.track.style.overflowX = 'auto'; }

  /* ---- pointer gestures ---- */
  private down(e: PointerEvent) {
    if ((e.target as Element).closest('button')) return;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.mode = 'pinch';
      this.pinchStart = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, s: this.z[this.index].s };
      this.slides[this.index].style.touchAction = 'none';
      this.track.style.overflowX = 'hidden';
    } else if (this.pointers.size === 1) {
      this.mode = 'none';
      this.start = { x: e.clientX, y: e.clientY, t: performance.now() };
      this.dismissY = 0;
    }
    try { this.track.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  }

  private move(e: PointerEvent) {
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    const i = this.index, z = this.z[i];
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;

    if (this.mode === 'pinch' && this.pointers.size >= 2) {
      const [a, b] = [...this.pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      z.s = Math.max(1, Math.min(4, this.pinchStart.s * (d / this.pinchStart.d)));
      this.clamp(i); this.apply(i);
      return;
    }
    if (this.pointers.size !== 1) return;

    if (z.s > 1.01) { // pan the zoomed image
      this.mode = 'pan';
      z.x += dx; z.y += dy;
      this.clamp(i); this.apply(i);
      return;
    }
    if (this.mode === 'none') {
      const tx = e.clientX - this.start.x, ty = e.clientY - this.start.y;
      if (Math.abs(tx) < 8 && Math.abs(ty) < 8) return;
      this.mode = Math.abs(ty) > Math.abs(tx) && ty > 0 ? 'dismiss' : 'swipe';
    }
    if (this.mode === 'dismiss') {
      this.dismissY = Math.max(0, e.clientY - this.start.y);
      const k = Math.min(1, this.dismissY / 420);
      const img = this.imgs[i];
      img.style.transition = 'none';
      img.style.transform = `translate3d(0, ${this.dismissY}px, 0) scale(${1 - k * 0.12})`;
      this.root.style.setProperty('--bg', String(0.96 * (1 - k)));
    }
  }

  private up(e: PointerEvent) {
    const had = this.pointers.delete(e.pointerId);
    if (!had) return;
    const i = this.index, z = this.z[i];
    if (this.mode === 'pinch') {
      if (this.pointers.size < 2) {
        if (z.s < 1.05) this.resetZoom(i); else this.apply(i);
        this.mode = this.pointers.size === 1 ? 'pan' : 'none';
        // re-anchor the remaining finger
      }
      return;
    }
    if (this.pointers.size > 0) return;

    const dt = performance.now() - this.start.t;
    if (this.mode === 'dismiss') {
      const v = this.dismissY / Math.max(dt, 1);
      if (this.dismissY > 110 || v > 0.7) { this.close(); return; }
      this.root.style.setProperty('--bg', '0.96');
      this.apply(i, true);
    } else if (this.mode === 'none') {
      // a tap: double-tap toggles zoom
      const now = performance.now();
      const near = Math.hypot(e.clientX - this.lastTap.x, e.clientY - this.lastTap.y) < 28;
      if (now - this.lastTap.t < 300 && near) {
        if (z.s > 1.01) this.resetZoom(i);
        else {
          z.s = 2.5;
          const cx = this.root.clientWidth / 2, cy = this.root.clientHeight / 2;
          z.x = (cx - e.clientX) * (z.s - 1);
          z.y = (cy - e.clientY) * (z.s - 1);
          this.clamp(i); this.apply(i, true);
        }
        this.lastTap.t = 0;
      } else {
        this.lastTap = { t: now, x: e.clientX, y: e.clientY };
        // tap on the dark background (not on the photo) closes
        if ((e.target as Element).classList.contains('v-slide') && z.s <= 1.01) setTimeout(() => { if (this.lastTap.t === now) this.close(); }, 310);
      }
    }
    this.mode = 'none';
  }

  private cancel(e: PointerEvent) {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size === 0) {
      if (this.mode === 'dismiss') { this.root.style.setProperty('--bg', '0.96'); this.apply(this.index, true); }
      this.mode = 'none';
    }
  }

  private onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') { e.preventDefault(); this.close(); }
    else if (e.key === 'ArrowRight') this.go(1);
    else if (e.key === 'ArrowLeft') this.go(-1);
    else if (e.key === 'Tab') {
      const f = Array.from(this.root.querySelectorAll<HTMLElement>('button'));
      const at = f.indexOf(document.activeElement as HTMLElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  }

  close() {
    this.root.dataset.open = 'false';
    window.setTimeout(() => this.destroy(true), 230);
  }

  destroy(restoreFocus = false) {
    document.removeEventListener('keydown', this.keyHandler);
    document.documentElement.style.overflow = '';
    this.root.remove();
    if (restoreFocus && this.origin.isConnected) this.origin.focus({ preventScroll: true });
    this.onClose();
  }
}
