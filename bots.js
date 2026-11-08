/* Семейка ботов Алины, рисуется кодом (SVG), картинки не нужны.
   makeBot({ style: "a" | "b" | "c", item: "phone" | "mail" | "gift" | null, baby: false, flying: false })
   a — белый с медными ушками (как робот на прайсах), b — пудровый круглый, c — кремовый ретро. */
(function () {
  const PAL = {
    a: { body: "#FFFFFF", body2: "#EDE3DA", line: "#DCCBBE", visor: ["#3A2622", "#140B0A"], eye: "#FBE7C9", metal: ["#EBCB9C", "#B98451", "#E2BC88"], cheek: "#E59A9A", accent: "#7A1E2C" },
    b: { body: "#FCF1EC", body2: "#EBCFC6", line: "#DDBDB3", visor: ["#8E2A3A", "#4E101C"], eye: "#F7DDB0", metal: ["#F1DFBE", "#C29A62", "#E9D2A6"], cheek: "#F2A7A7", accent: "#C29A62" },
    c: { body: "#FFF9F1", body2: "#E8D6C0", line: "#D6BFA5", visor: ["#4A3029", "#24150F"], eye: "#F3D9A4", metal: ["#A23447", "#5E1523", "#8A2A3B"], cheek: "#E59A9A", accent: "#C29A62" },
  };
  let uid = 0;

  function item(kind, x, y, sc) {
    const t = `translate(${x} ${y}) scale(${sc})`;
    if (kind === "phone") return `<g transform="${t} rotate(-12)">
      <rect x="-14" y="-25" width="28" height="47" rx="6" fill="#3B2A24"/>
      <rect x="-11" y="-21" width="22" height="36" rx="3.5" fill="#FBF1E6"/>
      <rect x="-8" y="-17" width="12" height="6" rx="3" fill="#7A1E2C"/>
      <rect x="-4" y="-8" width="12" height="6" rx="3" fill="#C29A62"/>
      <rect x="-8" y="1" width="10" height="6" rx="3" fill="#7A1E2C"/>
      <circle cx="0" cy="18.5" r="1.8" fill="#8A746A"/></g>`;
    if (kind === "mail") return `<g transform="${t} rotate(-10)">
      <path d="M26 -10h9M28 -2h11M26 6h8" stroke="#C29A62" stroke-width="2.4" stroke-linecap="round"/>
      <rect x="-21" y="-15" width="42" height="30" rx="4" fill="#fff" stroke="#C29A62" stroke-width="2"/>
      <path d="M-20 -13 0 3 20 -13" fill="none" stroke="#7A1E2C" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M0 9s-5-3-5-6a2.6 2.6 0 0 1 5-1 2.6 2.6 0 0 1 5 1c0 3-5 6-5 6z" fill="#7A1E2C" transform="translate(0 -4)"/></g>`;
    if (kind === "gift") return `<g transform="${t} rotate(-6)">
      <rect x="-16" y="-5" width="32" height="25" rx="3" fill="#F7E7D7" stroke="#D3B597" stroke-width="1.5"/>
      <rect x="-19" y="-13" width="38" height="10" rx="2.5" fill="#FBEFE3" stroke="#D3B597" stroke-width="1.5"/>
      <rect x="-3.5" y="-13" width="7" height="33" fill="#7A1E2C"/>
      <path d="M0 -13c-6-10-17-10-15-3 1 4 8 3 15 3zM0 -13c6-10 17-10 15-3-1 4-8 3-15 3z" fill="#7A1E2C"/></g>`;
    return "";
  }

  function makeBot(o) {
    o = o || {};
    const s = o.style || "a", P = PAL[s], baby = !!o.baby, fly = !!o.flying, k = "bt" + (++uid);
    const cx = 100, G = 250;
    const legH = baby ? 14 : 24;
    const bodyW = baby ? 60 : 74, bodyH = baby ? 48 : 66;
    const headW = baby ? 124 : 110, headH = baby ? 102 : 92;
    const footY = G - 8, legTop = footY - legH;
    const bodyBot = legTop + 10, bodyTop = bodyBot - bodyH;
    const headBot = bodyTop + 12, headTop = headBot - headH;
    const L = cx - bodyW / 2, R = cx + bodyW / 2;

    const headRx = s === "c" ? 24 : s === "b" ? headH * 0.5 : headH * 0.44;
    const bodyRx = s === "c" ? 16 : s === "b" ? Math.min(bodyW, bodyH) / 2 : 24;
    const vx = cx - headW / 2 + 12, vw = headW - 24, vy = headTop + 15, vh = headH - 32;
    const vRx = s === "c" ? 16 : vh / 2;
    const ey = vy + vh * 0.47, edx = vw * 0.2;

    // уши
    const earY = headTop + headH * 0.52;
    const ears = s === "c"
      ? `<rect x="${cx - headW / 2 - 7}" y="${earY - 13}" width="11" height="26" rx="4" fill="url(#${k}m)"/><rect x="${cx + headW / 2 - 4}" y="${earY - 13}" width="11" height="26" rx="4" fill="url(#${k}m)"/>`
      : `<circle cx="${cx - headW / 2}" cy="${earY}" r="${baby ? 13 : 12}" fill="url(#${k}m)"/><circle cx="${cx + headW / 2}" cy="${earY}" r="${baby ? 13 : 12}" fill="url(#${k}m)"/>`;

    // антенна
    let ant;
    if (baby) ant = `<path d="M${cx} ${headTop + 2}c-3-9 4-17 10-13 4 3 0 9-4 6" fill="none" stroke="url(#${k}m)" stroke-width="3.6" stroke-linecap="round"/>`;
    else if (s === "c") ant = `<path d="M${cx - 18} ${headTop + 2}l-8-14M${cx + 18} ${headTop + 2}l8-14" stroke="url(#${k}m)" stroke-width="3.6" stroke-linecap="round"/><circle cx="${cx - 27}" cy="${headTop - 13}" r="5" fill="url(#${k}m)"/><circle cx="${cx + 27}" cy="${headTop - 13}" r="5" fill="url(#${k}m)"/>`;
    else if (s === "b") ant = `<line x1="${cx}" y1="${headTop + 2}" x2="${cx}" y2="${headTop - 12}" stroke="${P.metal[1]}" stroke-width="3.6" stroke-linecap="round"/><path d="M${cx} ${headTop - 12}s-8-5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5-8 10-8 10z" fill="#7A1E2C"/>`;
    else ant = `<line x1="${cx}" y1="${headTop + 2}" x2="${cx}" y2="${headTop - 14}" stroke="${P.metal[1]}" stroke-width="3.6" stroke-linecap="round"/><circle cx="${cx}" cy="${headTop - 18}" r="6.5" fill="url(#${k}m)"/>`;

    // глаза и рот
    const eyes = baby
      ? `<ellipse cx="${cx - edx}" cy="${ey}" rx="7.5" ry="9" fill="${P.eye}"/><ellipse cx="${cx + edx}" cy="${ey}" rx="7.5" ry="9" fill="${P.eye}"/><circle cx="${cx - edx + 2.5}" cy="${ey - 3}" r="2.6" fill="#fff"/><circle cx="${cx + edx + 2.5}" cy="${ey - 3}" r="2.6" fill="#fff"/>`
      : `<path d="M${cx - edx - 7} ${ey + 3}q7-10 14 0M${cx + edx - 7} ${ey + 3}q7-10 14 0" fill="none" stroke="${P.eye}" stroke-width="4.2" stroke-linecap="round"/>`;
    const my = vy + vh * 0.76;
    const mouth = `<path d="M${cx - 6} ${my}q6 ${baby ? 4 : 5.5} 12 0" fill="none" stroke="${P.eye}" stroke-width="3" stroke-linecap="round"/>`;
    const cheeks = `<ellipse cx="${vx + 13}" cy="${my - 1}" rx="5" ry="2.8" fill="${P.cheek}" opacity=".6"/><ellipse cx="${vx + vw - 13}" cy="${my - 1}" rx="5" ry="2.8" fill="${P.cheek}" opacity=".6"/>`;

    // значок на груди
    const chY = bodyTop + bodyH * 0.55;
    const chest = s === "b"
      ? `<path d="M${cx} ${chY + 6}s-8-5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5-8 10-8 10z" fill="#7A1E2C" opacity=".9"/>`
      : s === "c"
        ? `<rect x="${cx - 13}" y="${chY - 8}" width="26" height="16" rx="5" fill="url(#${k}v)"/><circle cx="${cx - 6}" cy="${chY}" r="2" fill="${P.accent}"/><circle cx="${cx}" cy="${chY}" r="2" fill="#7A1E2C"/><circle cx="${cx + 6}" cy="${chY}" r="2" fill="${P.accent}"/>`
        : `<circle cx="${cx}" cy="${chY}" r="${baby ? 6 : 7.5}" fill="url(#${k}m)"/>`;

    // ноги
    const lx = bodyW * 0.23, legW = baby ? 13 : 15;
    const legRot = fly ? 9 : 0;
    const leg = (x, dir) => `<g transform="rotate(${dir * legRot} ${x} ${legTop})">
      <rect x="${x - legW / 2}" y="${legTop - 6}" width="${legW}" height="${legH + 8}" rx="${legW / 2}" fill="url(#${k}w)" stroke="${P.line}"/>
      <ellipse cx="${x + dir * 2}" cy="${footY + 1}" rx="${baby ? 11 : 13}" ry="${baby ? 6 : 7}" fill="url(#${k}m)"/></g>`;

    // руки: правая держит предмет, левая машет (в полёте) или висит
    const sR = [R - 5, bodyTop + 15], sL = [L + 5, bodyTop + 15];
    const hand = o.item ? [R + 17, bodyTop + (baby ? 18 : 24)] : [R + 13, bodyTop + 42];
    const lhand = fly || baby ? [L - 15, bodyTop - 4] : [L - 12, bodyTop + 42];
    const arm = (a, b, c) => `<path d="M${a[0]} ${a[1]}Q${c[0]} ${c[1]} ${b[0]} ${b[1]}" fill="none" stroke="${P.line}" stroke-width="15" stroke-linecap="round"/><path d="M${a[0]} ${a[1]}Q${c[0]} ${c[1]} ${b[0]} ${b[1]}" fill="none" stroke="url(#${k}w)" stroke-width="12" stroke-linecap="round"/>`;
    const handDot = h => `<circle cx="${h[0]}" cy="${h[1]}" r="${baby ? 6.5 : 7.5}" fill="${P.body}" stroke="${P.line}" stroke-width="1.2"/>`;
    const sc = baby ? 0.82 : 1;
    const it = o.item ? item(o.item, hand[0] + 10 * sc, hand[1] - 10 * sc, sc) : "";

    const shadow = fly || o.noShadow ? "" : `<ellipse cx="${cx}" cy="${G + 1}" rx="${bodyW * 0.7}" ry="6" fill="#7A4A30" opacity=".18"/>`;
    const top = headTop - (baby ? 22 : 30);
    return `<svg class="bot-svg" viewBox="18 ${top} 180 ${G + 10 - top}" aria-hidden="true">
  <defs>
    <linearGradient id="${k}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.body}"/><stop offset="1" stop-color="${P.body2}"/></linearGradient>
    <linearGradient id="${k}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.metal[0]}"/><stop offset=".5" stop-color="${P.metal[1]}"/><stop offset="1" stop-color="${P.metal[2]}"/></linearGradient>
    <radialGradient id="${k}v" cx=".38" cy=".3" r=".9"><stop offset="0" stop-color="${P.visor[0]}"/><stop offset="1" stop-color="${P.visor[1]}"/></radialGradient>
  </defs>
  ${shadow}
  ${leg(cx - lx, -1)}${leg(cx + lx, 1)}
  ${arm(sL, lhand, [L - 14, (sL[1] + lhand[1]) / 2 + 6])}${handDot(lhand)}
  <rect x="${L}" y="${bodyTop}" width="${bodyW}" height="${bodyH}" rx="${bodyRx}" fill="url(#${k}w)" stroke="${P.line}"/>
  ${chest}
  ${ant}${ears}
  <rect x="${cx - headW / 2}" y="${headTop}" width="${headW}" height="${headH}" rx="${headRx}" fill="url(#${k}w)" stroke="${P.line}"/>
  <rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" rx="${vRx}" fill="url(#${k}v)"/>
  <ellipse cx="${vx + vw * 0.3}" cy="${vy + 7}" rx="${vw * 0.18}" ry="3" fill="#fff" opacity=".12"/>
  <g class="bot-eyes">${eyes}</g>${mouth}${cheeks}
  ${arm(sR, hand, [R + 16, (sR[1] + hand[1]) / 2 + 12])}${it}${handDot(hand)}
</svg>`;
  }
  window.makeBot = makeBot;
})();
