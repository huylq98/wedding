// 01 · Son Thư (Son Mài × Thư Tay):
// 1. Nét bút chu sa & chỉ vàng vẽ dần theo cuộn trang + đóng triện từng mục
// 2. Cuộn thư giấy dó mở dần hai trục gỗ theo ngón tay cuộn + đóng mộc Hỷ Sự
// 3. Thẻ cào lớp nhũ vàng thếp sơn mài trên bài vị đỏ đô

const smMain = document.querySelector(".son");
const smSvg = smMain?.querySelector(".sm-trail");
const smGoldPath = smSvg?.querySelector(".sm-trail-gold");
const smRedPath = smSvg?.querySelector(".sm-trail-red");
const smTip = smSvg?.querySelector(".sm-trail-tip");
const unrollCard = document.querySelector("[data-unroll-scroll]");
const letterChopBtn = document.querySelector("[data-letter-chop]");

let smStart = 0;
let smEnd = 1;
let smLength = 0;

function layoutSonTrail() {
  if (!smMain || !smSvg || !smRedPath) return;
  const width = smMain.clientWidth;
  const height = smMain.scrollHeight;
  const cover = smMain.querySelector(".son-cover");
  const footer = smMain.querySelector(".theme-close");
  if (!cover || !footer) return;

  smSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const mainTop = smMain.getBoundingClientRect().top;
  const gaps = [...smMain.querySelectorAll(":scope > section:not(.wedding-extras), .wedding-extras > .x-section:not([hidden])")]
    .map((section) => section.getBoundingClientRect().top - mainTop)
    .filter((top) => top > cover.offsetHeight + 30);

  const startX = width - 24;
  const startY = cover.offsetHeight - 16;
  const endY = footer.offsetTop + 112;
  const edge = [11, width - 11];
  let side = 1;
  let d = `M${startX} ${startY}C${startX} ${startY + 55} ${edge[side]} ${startY + 35} ${edge[side]} ${startY + 110}`;

  gaps.forEach((gap) => {
    const next = 1 - side;
    d += `L${edge[side]} ${gap - 44}C${edge[side]} ${gap} ${edge[next]} ${gap - 8} ${edge[next]} ${gap + 44}`;
    side = next;
  });

  d += `L${edge[side]} ${endY - 84}C${edge[side]} ${endY - 28} ${width / 2} ${endY - 46} ${width / 2} ${endY}`;
  smRedPath.setAttribute("d", d);
  smGoldPath?.setAttribute("d", d);
  smLength = smRedPath.getTotalLength();
  smStart = startY;
  smEnd = endY;
  updateSonScrollEffects();
}

function updateSonScrollEffects() {
  if (!smMain) return;
  const mainRect = smMain.getBoundingClientRect();
  const reach = window.innerHeight * 0.72 - mainRect.top;

  // 1. Vẽ nét bút chu sa & chỉ vàng theo tiến độ cuộn
  if (smRedPath && smLength > 0) {
    const progress = Math.min(1, Math.max(0, (reach - smStart) / (smEnd - smStart)));
    const offset = String(1 - progress);
    smRedPath.style.setProperty("--trail-offset", offset);
    smGoldPath?.style.setProperty("--trail-offset", offset);
    const point = smRedPath.getPointAtLength(progress * smLength);
    smTip?.setAttribute("transform", `translate(${point.x} ${point.y})`);
    if (smTip) smTip.style.opacity = progress > 0.005 && progress < 0.995 ? "1" : "0";
  }

  // Đóng dấu triện ở thanh tiêu đề khi cuộn tới
  document.querySelectorAll("[data-stamp-section]").forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.78) {
      sec.classList.add("is-stamped");
    }
  });

  // 2. Cuộn thư giấy dó mở dần hai trục gỗ theo thao tác cuộn
  if (unrollCard) {
    const rect = unrollCard.getBoundingClientRect();
    const viewH = window.innerHeight;
    // Bắt đầu mở từ khi mép trên vào 88% màn hình đến khi lên tới 32% màn hình
    const raw = (viewH * 0.88 - rect.top) / (viewH * 0.58);
    const unroll = Math.min(1, Math.max(0.16, raw));
    unrollCard.style.setProperty("--unroll", unroll.toFixed(3));
    if (unroll >= 0.78) {
      unrollCard.classList.add("is-chopped");
    }
  }
}

// Cho phép bấm vào mộc Hỷ Sự ở cuối thư để xem lại hiệu ứng đóng ấn
letterChopBtn?.addEventListener("click", () => {
  if (!unrollCard) return;
  unrollCard.classList.remove("is-chopped");
  void unrollCard.offsetWidth;
  unrollCard.classList.add("is-chopped");
});

let smTicking = false;
window.addEventListener("scroll", () => {
  if (smTicking) return;
  smTicking = true;
  window.requestAnimationFrame(() => {
    updateSonScrollEffects();
    smTicking = false;
  });
}, { passive: true });

if (smMain && "ResizeObserver" in window) {
  new ResizeObserver(layoutSonTrail).observe(smMain);
}
document.fonts?.ready.then(layoutSonTrail);
layoutSonTrail();

// 3. Thẻ Cào Lớp Nhũ Vàng Thếp Sơn Mài trên Bài Vị Đỏ Đô
const sonScratchCard = document.querySelector("[data-son-scratch]");
if (sonScratchCard) {
  const foil = sonScratchCard.querySelector(".son-scratch-foil");
  const foilContext = foil.getContext("2d", { willReadFrequently: true });
  const burst = sonScratchCard.querySelector(".son-scratch-burst");
  let scratching = false;
  let lastPoint;
  let strokes = 0;

  function paintGoldLacquerFoil() {
    if (sonScratchCard.classList.contains("is-revealed")) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = sonScratchCard.getBoundingClientRect();
    if (!width || !height) return;
    foil.width = width * ratio;
    foil.height = height * ratio;
    foilContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    foilContext.globalCompositeOperation = "source-over";

    // Nền Nhũ Vàng Kim Thếp Sơn Mài óng ánh
    const base = foilContext.createLinearGradient(0, 0, width, height);
    base.addColorStop(0, "#b88736");
    base.addColorStop(0.28, "#efd38e");
    base.addColorStop(0.5, "#fff1c2");
    base.addColorStop(0.72, "#d8a852");
    base.addColorStop(1, "#9a6c21");
    foilContext.fillStyle = base;
    foilContext.fillRect(0, 0, width, height);

    // Hoa văn chữ Song Hỷ chìm trên lá vàng
    foilContext.fillStyle = "rgba(96, 16, 12, 0.12)";
    foilContext.font = "600 12px 'Cormorant Garamond', Georgia, serif";
    for (let row = 0; row * 26 < height + 26; row += 1) {
      for (let col = -1; col * 72 < width; col += 1) {
        foilContext.fillText("囍 · KIM BÀI", col * 72 + (row % 2) * 36, row * 26 + 16);
      }
    }

    // Khung viền sơn mài bên trong lá vàng
    foilContext.strokeStyle = "rgba(110, 18, 14, 0.45)";
    foilContext.lineWidth = 1.5;
    foilContext.strokeRect(8, 8, width - 16, height - 16);

    // Chữ hướng dẫn cào nhũ vàng
    foilContext.fillStyle = "#5c0d09";
    foilContext.textAlign = "center";
    foilContext.font = "700 28px 'Noto Serif TC', 'SimSun', serif";
    foilContext.fillText("囍", width / 2, height / 2 - 10);
    foilContext.font = "600 11px 'Be Vietnam Pro', Arial, sans-serif";
    foilContext.fillText("C À O   L Ớ P   N H Ũ   V À N G   X E M   N G À Y", width / 2, height / 2 + 18);
    foilContext.textAlign = "start";
  }

  function scratchGoldAt(event) {
    const rect = foil.getBoundingClientRect();
    const point = [event.clientX - rect.left, event.clientY - rect.top];
    foilContext.globalCompositeOperation = "destination-out";
    foilContext.lineCap = "round";
    foilContext.lineJoin = "round";
    foilContext.lineWidth = 44;
    foilContext.beginPath();
    foilContext.moveTo(...(lastPoint || point));
    foilContext.lineTo(...point);
    foilContext.stroke();
    lastPoint = point;
    strokes += 1;
    if (strokes % 5 === 0 && goldClearedShare() > 0.42) revealGoldDate();
  }

  function goldClearedShare() {
    const { data } = foilContext.getImageData(0, 0, foil.width, foil.height);
    let cleared = 0;
    let total = 0;
    for (let index = 3; index < data.length; index += 4 * 24) {
      total += 1;
      if (data[index] === 0) cleared += 1;
    }
    return cleared / total;
  }

  function revealGoldDate() {
    if (sonScratchCard.classList.contains("is-revealed")) return;
    scratching = false;
    sonScratchCard.classList.add("is-revealed");
    for (let index = 0; index < 28; index += 1) {
      const spark = document.createElement("i");
      if (index % 2 === 0) spark.className = "is-heart";
      const angle = (index / 28) * Math.PI * 2;
      const distance = 84 + (index % 5) * 26;
      spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      spark.style.setProperty("--dy", `${Math.sin(angle) * distance * 0.7}px`);
      spark.style.setProperty("--s", String(0.75 + (index % 4) * 0.28));
      spark.style.setProperty("--r", `${(index % 2 ? 1 : -1) * 36}deg`);
      spark.style.animationDelay = `${(index % 3) * 0.04}s`;
      burst.append(spark);
    }
    window.setTimeout(() => burst.replaceChildren(), 1500);
  }

  foil.addEventListener("pointerdown", (event) => {
    scratching = true;
    lastPoint = undefined;
    foil.setPointerCapture(event.pointerId);
    scratchGoldAt(event);
  });
  foil.addEventListener("pointermove", (event) => scratching && scratchGoldAt(event));
  foil.addEventListener("pointerup", () => { scratching = false; });
  foil.addEventListener("pointercancel", () => { scratching = false; });
  document.querySelector("[data-son-scratch-skip]")?.addEventListener("click", revealGoldDate);
  new ResizeObserver(paintGoldLacquerFoil).observe(sonScratchCard);
  document.fonts?.ready.then(paintGoldLacquerFoil);
}
