/* ============================================================
   1. SETTINGS: the part you will edit most
   Happy 8th monthsary, shayshayyyy!!!
Layo nakay ta hehe. I know ga balik2 nagyud nis akong letter pero thankful gyud kay ko sa imo shyyy. 
Thank you sa always pag sabot sa ako kanang ga overthink ko HAHAHA, sa pag hatag nimog time bisag busy kay ka,  for existing,
 and sa daghan pa kaayo nga butang, Thank youuu💛. Thankyou Thankyou ang babait ninyo HAHAHAHAHAH Christmas ID 🧶. 
 Bitaw, I LOVE YOU SO MUCH!! Shiloh Batumbakal! 🫶🏾🫶🏾🫶🏾.

   ============================================================ */
const SETTINGS = {
  to: "shaysshayyy",
  // Each line in this list becomes one paragraph of the letter.
  letter: [
    "Happy 8th monthsary, shayshayy!!!.",
    "Layo nakay ta hehe. I know ga balik2 nagyud nis akong letter pero thankful gyud kay ko sa imo shyyy.",
    "Thank you sa always pag sabot sa ako kanang ga overthink ko HAHAHA, sa pag hatag nimog time bisag busy kay ka,  for existing,.",
    " and sa daghan pa kaayo nga butang, Thank youuu💛. Thankyou Thankyou ang babait ninyo HAHAHAHAHAH Christmas ID 🧶..",
    " Bitaw, I LOVE YOU SO MUCH!! Shiloh Batumbakal! 🫶🏾🫶🏾🫶🏾.."

  ],
  from: "With love, your fairy",

  song: "music/song.mp3",  // put your file in the music folder
  bpm: 90,                 // the song's beats per minute (hearts follow it)
  volume: 0.6              // 0 is silent, 1 is full
};

/* Names can also come from the link, e.g.  index.html?to=Ana&from=Ben
   This works on any site you host, with no code changes per person.
   (The message can be added the same way: &message=Happy%20birthday) */
const params = new URLSearchParams(location.search);
SETTINGS.to      = params.get("to")      || SETTINGS.to;
if (params.get("message")) SETTINGS.letter = [params.get("message")];
SETTINGS.from    = params.get("from")    || SETTINGS.from;

/* Helper: shortcut for finding an element by its id */
const $ = (id) => document.getElementById(id);

/* textContent (not innerHTML) is safer: it treats text from the link
   as plain text, so nobody can sneak code into your page. */
$("to").textContent = "Dear " + SETTINGS.to + ",";
$("from").textContent = SETTINGS.from;

/* One <p> per item in the letter list. */
for (const line of SETTINGS.letter) {
  const p = document.createElement("p");
  p.textContent = line;
  $("msg").appendChild(p);
}

/* ============================================================
   2. THE BOUQUET (drawn with SVG shapes)
   Modeled on the reference drawing: loose, airy flowers on long green
   stems, tied with a cream ribbon bow. The SVG canvas is 400 wide x 460
   tall; (0,0) is the TOP-left. Every row below is one flower.
   ============================================================ */

const TIE = [200, 330];   // where all the stems are tied together

/* Coral tulip buds: [x, y, scale, tilt in degrees] */
const TULIPS = [[47,136,1,-28],[112,68,1,-14],[190,44,1.05,6],[178,74,.95,4],[110,88,.95,-10],[268,55,1,10]];

/* White oval buds: [x, y]. Their tilts are in BUD_TILTS, in the same order. */
const BUDS = [[285,47],[280,87],[187,117],[197,149],[352,114],[337,184],[297,211],[300,244],[250,257],[237,236],[202,200],[192,233],[155,252],[122,230],[135,206],[150,276],[257,149]];
const BUD_TILTS = [25,-20,15,-30,35,20,-25,10,-15,30,-10,25,-35,15,-20,30,5];

/* Pink daisies: [x, y, radius, petal color] */
const DAISIES = [[103,122,31,"#f5c9e0"],[158,68,33,"#f9dcec"],[248,141,32,"#f5c9e0"],[320,144,33,"#f5c9e0"]];

/* Small purple flowers: [x, y, radius] */
const PURPLES = [[110,128,17],[175,163,17],[83,195,13],[135,117,11],[188,76,13]];

const STEM_COLORS = ["#3f7d62", "#2f6b52", "#4a8f6b"];
const RIBBON = "#efe6c8";

/* A stem: a gentle curve from the tie point up to the flower at (x, y). */
function stem(x, y, width, color) {
  const [tx, ty] = TIE;
  return `<path d="M${tx} ${ty} Q${tx + (x - tx) * 0.5} ${y + (ty - y) * 0.55} ${x} ${y}"
           stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
}

/* A pink daisy: nine round petals and a yellow center. */
function daisy(x, y, r, fill) {
  let s = `<g transform="translate(${x} ${y})">`;
  for (let i = 0; i < 9; i++) {
    s += `<ellipse cy="${-r * 0.62}" rx="${r * 0.3}" ry="${r * 0.44}" fill="${fill}"
           stroke="#e39cc5" stroke-width="1" transform="rotate(${i * 40})"/>`;
  }
  return s + `<circle r="${r * 0.3}" fill="#ffe83a" stroke="#f3c800" stroke-width="1"/></g>`;
}

/* A small purple flower: five round petals and a pink center. */
function purple(x, y, r) {
  let s = `<g transform="translate(${x} ${y})">`;
  for (let i = 0; i < 5; i++) {
    s += `<ellipse cy="${-r * 0.62}" rx="${r * 0.42}" ry="${r * 0.52}" fill="#c58cf0"
           stroke="#a45fd6" stroke-width="1" transform="rotate(${i * 72})"/>`;
  }
  return s + `<circle r="${r * 0.28}" fill="#ffb3d1"/></g>`;
}

/* A coral tulip bud. It stands on its base, tilted by "tilt" degrees. */
function tulip(x, y, k, tilt) {
  return `<g transform="translate(${x} ${y + 22 * k}) rotate(${tilt}) scale(${k})">
    <path d="M0 0 C-17 -6 -19 -30 -13 -46 L-5 -35 L0 -48 L5 -35 L13 -46 C19 -30 17 -6 0 0Z"
          fill="#dd6f52" stroke="#c9654c" stroke-width="1.2"/>
    <path d="M-6 -6 C-9 -20 -8 -32 -5 -38" stroke="#f2a58c" stroke-width="2"
          fill="none" stroke-linecap="round"/></g>`;
}

/* A white oval bud, like a pussy willow. */
function bud(x, y, tilt) {
  return `<ellipse cx="${x}" cy="${y}" rx="8" ry="12" fill="#f6f1f6" stroke="#d9d0dc"
           stroke-width="1" transform="rotate(${tilt} ${x} ${y})"/>`;
}

function drawBouquet() {
  const [tx, ty] = TIE;
  let s = "";

  // A soft glow filter, so the flowers shine against the dark page.
  s += `<defs><filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
          <feColorMatrix in="b" type="matrix" result="b2"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .45 0"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter></defs><g filter="url(#glow)">`;

  // Order matters: shapes drawn later sit on top of earlier ones.

  // a) Stems: one for every flower, all running to the tie point.
  let n = 0;
  for (const [x, y, k] of TULIPS) s += stem(x, y + 22 * k, 2.6, STEM_COLORS[n++ % 3]);
  for (const [x, y] of BUDS) s += stem(x, y, 1.8, STEM_COLORS[n++ % 3]);
  for (const [x, y] of DAISIES) s += stem(x, y, 2.6, STEM_COLORS[n++ % 3]);
  for (const [x, y] of PURPLES) s += stem(x, y, 2.2, STEM_COLORS[n++ % 3]);

  // b) The stem ends sticking out below the bow.
  for (let i = 0; i < 7; i++) {
    s += `<path d="M${tx + (i - 3)} ${ty} L${tx + (i - 3) * 3.2} ${408 + ((i * 37) % 5)}"
             stroke="${STEM_COLORS[i % 3]}" stroke-width="5" stroke-linecap="round"/>`;
  }

  // c) Flowers, back to front: tulips, white buds, daisies, then purple ones.
  for (const [x, y, k, tilt] of TULIPS) s += tulip(x, y, k, tilt);
  BUDS.forEach(([x, y], i) => { s += bud(x, y, BUD_TILTS[i]); });
  for (const [x, y, r, fill] of DAISIES) s += daisy(x, y, r, fill);
  for (const [x, y, r] of PURPLES) s += purple(x, y, r);

  // d) The cream ribbon: a knot, two double loops and two long tails.
  s += `<g stroke="${RIBBON}" stroke-width="3.2" stroke-linecap="round" fill="rgba(239,230,200,.14)">
          <path d="M200 337 C168 296 136 318 150 348 C160 372 190 364 200 337Z"/>
          <path d="M200 337 C178 312 158 326 164 346 C170 360 190 356 200 337Z"/>
          <path d="M200 337 C228 292 262 304 250 336 C242 362 214 362 200 337Z"/>
          <path d="M200 337 C220 310 242 318 236 340 C230 356 212 354 200 337Z"/>
          <path d="M198 340 C190 370 150 388 124 392" fill="none"/>
          <path d="M198 340 C196 372 160 380 140 380" fill="none"/>
          <path d="M202 340 C212 372 240 396 264 408" fill="none"/>
          <path d="M204 340 C206 365 230 380 244 384" fill="none"/>
        </g>
        <circle cx="200" cy="338" r="7" fill="#f6efd9" stroke="${RIBBON}"/></g>`;

  $("bouquet").innerHTML = s;
}
drawBouquet();

/* ============================================================
   3. FLOATING HEARTS
   ============================================================ */
const HEART_COLORS = ["#ff9ec7", "#f4b6e8", "#c59cf2", "#ffd6a5", "#fff1c9"];
const random = (min, max) => min + Math.random() * (max - min);

function spawnHeart(big = false) {
  const h = document.createElement("span");   // make a new element in memory
  h.className = "heart";
  h.textContent = "\u2665\uFE0E";             // the heart symbol (text style)

  // Randomize position, size, color, speed and sideways drift.
  h.style.left = random(0, 100) + "%";
  h.style.fontSize = (big ? random(26, 48) : random(12, 34)) + "px";
  h.style.color = HEART_COLORS[Math.floor(random(0, HEART_COLORS.length))];
  h.style.animationDuration = random(6, 10) + "s";
  h.style.setProperty("--drift", random(-45, 45) + "px"); // used by CSS @keyframes

  $("hearts").appendChild(h);                 // put it on the page
  h.addEventListener("animationend", () => h.remove()); // clean up when done
}

/* The "beat": runs once per beat of the song. */
let beat = 0;
function onBeat() {
  spawnHeart();                               // a small heart every beat
  if (beat % 4 === 0) {                       // every 4th beat = start of a bar
    for (let i = 0; i < 4; i++) spawnHeart(true);
    const wrap = $("bouquet-wrap");
    wrap.classList.remove("pulse");           // restart the pulse animation:
    void wrap.offsetWidth;                    // (this line forces a "reflow")
    wrap.classList.add("pulse");
  }
  beat++;
}

/* ============================================================
   4. THE SONG
   ============================================================ */
const song = new Audio(SETTINGS.song);
song.loop = true;
song.volume = SETTINGS.volume;

function playSong() {
  // play() returns a Promise. It can fail (file missing, or the browser
  // blocked it), so we catch the error instead of letting the page break.
  song.play().catch((err) => {
    console.log("Song could not play:", err.message);
  });
}

/* ============================================================
   5. OPENING THE GIFT
   Browsers only allow sound after a click or tap, so we start the
   song inside this click handler. That is why the gift exists!
   ============================================================ */
/* --- The flower burst: pink daisies, purple flowers and coral tulips --- */

/* A small flower as SVG text. kind is "daisy", "purple" or "tulip".
   The viewBox is 100 x 100, centered on (0,0). */
function miniFlower(kind) {
  let s = '<svg viewBox="-50 -50 100 100">';
  if (kind === "daisy") {
    for (let i = 0; i < 9; i++)
      s += `<ellipse cy="-26" rx="13" ry="20" fill="#f5c9e0" stroke="#e39cc5"
             transform="rotate(${i * 40})"/>`;
    s += '<circle r="12" fill="#ffe83a"/>';
  } else if (kind === "purple") {
    for (let i = 0; i < 5; i++)
      s += `<ellipse cy="-24" rx="16" ry="21" fill="#c58cf0" stroke="#a45fd6"
             transform="rotate(${i * 72})"/>`;
    s += '<circle r="9" fill="#ffb3d1"/>';
  } else {
    s += '<path d="M0 40 C-26 30 -30 -10 -20 -40 L-8 -22 L0 -44 L8 -22 L20 -40 C30 -10 26 30 0 40Z" fill="#dd6f52" stroke="#c9654c" stroke-width="2"/>';
  }
  return s + "</svg>";
}

function burstFlowers() {
  // Start from the gift box. getBoundingClientRect() gives its position on screen.
  const r = document.querySelector(".box").getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height * 0.3;

  // People who prefer less motion get fewer flowers.
  // 140 flowers is enough to nearly cover a phone screen. Lower it if the
  // animation stutters on an older phone.
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = reduce ? 40 : 140;

  // Flower size depends on the screen: bigger screens get bigger flowers,
  // but never smaller than 40px or larger than 140px.
  const W = window.innerWidth, H = window.innerHeight;
  const base = Math.min(W, H);

  for (let i = 0; i < count; i++) {
    const pick = Math.random();                     // choose a flower type
    const kind = pick < 0.4 ? "daisy" : pick < 0.7 ? "purple" : "tulip";
    const el = document.createElement("div");
    el.className = "bf";
    el.innerHTML = miniFlower(kind);

    // Pick a random landing spot ANYWHERE on the screen. The flower flies
    // there from the box, so dx and dy are the distance to travel.
    const size = Math.max(32, Math.min(140, random(0.13, 0.3) * base * (kind === "purple" ? 0.8 : 1)));
    const targetX = random(0, W);
    const targetY = random(0, H);

    el.style.left = cx + "px";
    el.style.top = cy + "px";
    el.style.setProperty("--s", size + "px");
    el.style.setProperty("--dx", targetX - cx + "px");
    el.style.setProperty("--dy", targetY - cy + "px");
    el.style.setProperty("--rot", random(-360, 360) + "deg");
    el.style.animationDelay = random(0, 0.5) + "s";

    $("burst").appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

/* --- The opening sequence ---
   0.0s  lid pops off and the song starts
   0.3s  flowers burst out of the box and fill the screen
   2.6s  the flowers are fading, and the bouquet fades in beneath them
   4.0s  the letter slides up
   Change these numbers (in milliseconds) to speed up or slow down. */
$("gift").addEventListener("click", function () {
  if (this.classList.contains("open")) return;   // ignore double-clicks
  this.classList.add("open");                    // CSS plays the lid animation
  playSong();
  $("mute").style.display = "block";

  setTimeout(burstFlowers, 300);

  setTimeout(() => {
    $("gift").style.display = "none";
    $("scene").classList.add("show");
    onBeat();
    setInterval(onBeat, 60000 / SETTINGS.bpm);   // ms per beat = 60000 / BPM
  }, 2600);

  setTimeout(() => {
    $("letter").classList.add("in");
    updateLetterHint();
  }, 4000);
});

/* ============================================================
   6. MUTE BUTTON AND TAB VISIBILITY
   ============================================================ */
$("mute").addEventListener("click", function () {
  song.muted = !song.muted;
  this.textContent = song.muted ? "🔇" : "🔊";
  this.setAttribute("aria-label", song.muted ? "Unmute music" : "Mute music");
});

/* Pause the song when the person switches to another tab. */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) song.pause();
  else if ($("gift").classList.contains("open")) playSong();
});


/* ============================================================
   7. LONG LETTERS
   The letter text scrolls inside its own box (see .letter-scroll in
   style.css). This shows the "keep reading" fade only while there is
   more text below, and hides it once the reader reaches the end.
   ============================================================ */
function updateLetterHint() {
  const box = $("letter-scroll");
  // How many pixels of text are still hidden below the visible part?
  const hiddenBelow = box.scrollHeight - box.scrollTop - box.clientHeight;
  $("letter").classList.toggle("more", hiddenBelow > 8);
}
$("letter-scroll").addEventListener("scroll", updateLetterHint);
window.addEventListener("resize", updateLetterHint);   // phone rotated, etc.
window.addEventListener("load", updateLetterHint);
updateLetterHint();
