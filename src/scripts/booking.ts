// Booking panel: dates, room, guests -> nights, total in MAD and EUR -> WhatsApp link.
interface Cfg {
  lang: string; locale: string; whatsapp: string; name: string; eurRate: number;
  rooms: { slug: string; name: string; price: number; max: number }[];
  nightsLabels: string[]; guestsLabels: string[]; tpl: string; tplNoDates: string;
  labels: { pickDates: string; total: string; approx: string };
}

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parse = (s: string) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
const DAY = 86400000;

export function initBooking() {
  document.querySelectorAll<HTMLFormElement>('[data-booking]').forEach(setup);
}

function setup(form: HTMLFormElement) {
  if (form.dataset.ready) return;
  form.dataset.ready = '1';
  const cfg: Cfg = JSON.parse(form.dataset.config!);
  const q = <T extends HTMLElement>(s: string) => form.querySelector<T>(s)!;
  const inEl = q<HTMLInputElement>('[data-in]'), outEl = q<HTMLInputElement>('[data-out]');
  const roomEl = q<HTMLSelectElement>('[data-room]');
  const gOut = q<HTMLOutputElement>('[data-guests]');
  const minus = q<HTMLButtonElement>('[data-minus]'), plus = q<HTMLButtonElement>('[data-plus]');
  const hint = q('[data-hint]'), result = q('[data-result]');
  const nightsLabel = q('[data-nights-label]'), perNight = q('[data-per-night]');
  const totalMad = q('[data-total-mad]'), totalEur = q('[data-total-eur]');
  const send = q<HTMLAnchorElement>('[data-send]');

  const num = new Intl.NumberFormat(cfg.locale, { maximumFractionDigits: 0 });
  const dateFmt = new Intl.DateTimeFormat(cfg.locale.replace('-u-nu-latn', '-u-ca-gregory-nu-latn'), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const mad = (n: number) => `${num.format(n)} MAD`;
  const eur = (n: number) => `${num.format(n)} EUR`;

  let guests = 2;
  const room = () => cfg.rooms.find((r) => r.slug === roomEl.value) ?? cfg.rooms[0];

  const today = new Date();
  inEl.min = iso(today);
  outEl.min = iso(new Date(today.getTime() + DAY));

  const render = () => {
    const r = room();
    guests = Math.max(1, Math.min(guests, r.max));
    gOut.textContent = String(guests);
    minus.disabled = guests <= 1;
    plus.disabled = guests >= r.max;

    const a = inEl.value ? parse(inEl.value) : NaN;
    const b = outEl.value ? parse(outEl.value) : NaN;
    const nights = Math.round((b - a) / DAY);
    const valid = Number.isFinite(nights) && nights >= 1 && nights <= 60;

    let text: string;
    if (valid) {
      const total = nights * r.price;
      hint.hidden = true;
      result.hidden = false;
      nightsLabel.textContent = `${cfg.nightsLabels[nights]} × ${mad(r.price)}`;
      perNight.textContent = '';
      totalMad.textContent = mad(total);
      totalEur.textContent = eur(Math.round(total / cfg.eurRate));
      text = cfg.tpl
        .replace('{name}', cfg.name).replace('{room}', r.name)
        .replace('{from}', dateFmt.format(a)).replace('{to}', dateFmt.format(b))
        .replace('{nights}', cfg.nightsLabels[nights]).replace('{guests}', cfg.guestsLabels[guests])
        .replace('{total}', `${mad(total)} (${eur(Math.round(total / cfg.eurRate))})`);
    } else {
      hint.hidden = false;
      result.hidden = true;
      text = cfg.tplNoDates.replace('{name}', cfg.name).replace('{room}', `${r.name}, ${cfg.guestsLabels[guests]}`);
    }
    send.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  inEl.addEventListener('change', () => {
    if (!inEl.value) return render();
    const nextDay = new Date(parse(inEl.value) + DAY).toISOString().slice(0, 10);
    outEl.min = nextDay;
    // keep check-out after check-in
    if (!outEl.value || parse(outEl.value) <= parse(inEl.value)) outEl.value = nextDay;
    render();
  });
  outEl.addEventListener('change', render);
  roomEl.addEventListener('change', render);
  minus.addEventListener('click', () => { guests -= 1; render(); });
  plus.addEventListener('click', () => { guests += 1; render(); });
  render();
}
