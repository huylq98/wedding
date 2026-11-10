// 03 · Tơ Duyên: sợi chỉ đỏ vẽ theo cuộn trang và thẻ cào kim bài ngày cưới.
const tdMain = document.querySelector(".td");
const tdSvg = tdMain.querySelector(".td-thread");
const tdPath = tdSvg.querySelector(".td-thread-path");
const tdTip = tdSvg.querySelector(".td-thread-tip");
let tdStart = 0;
let tdEnd = 1;
let tdLength = 0;

function layoutThread() {
  const width = tdMain.clientWidth;
  const height = tdMain.scrollHeight;
  const cover = tdMain.querySelector(".td-cover");
  const footer = tdMain.querySelector(".theme-close");
  tdSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  // Sợi tơ chạy sát lề, chỉ vắt sang lề bên kia ở khoảng trống giữa hai phần,
  // nên không bao giờ cắt ngang chữ. Kết thúc ở chiếc nơ cuối thiệp.
  const mainTop = tdMain.getBoundingClientRect().top;
  const gaps = [...tdMain.querySelectorAll(":scope > section, .wedding-extras > .x-section:not([hidden])")]
    .map((section) => section.getBoundingClientRect().top - mainTop)
    .filter((top) => top > cover.offsetHeight + 40);
  const startX = width - 30;
  const startY = cover.offsetHeight - 20;
  const endY = footer.offsetTop + 60;
  const edge = [12, width - 12];
  let side = 1;
  let d = `M${startX} ${startY}C${startX} ${startY + 60} ${edge[side]} ${startY + 40} ${edge[side]} ${startY + 120}`;
  gaps.forEach((gap) => {
    const next = 1 - side;
    d += `L${edge[side]} ${gap - 50}C${edge[side]} ${gap} ${edge[next]} ${gap - 10} ${edge[next]} ${gap + 50}`;
    side = next;
  });
  d += `L${edge[side]} ${endY - 90}C${edge[side]} ${endY - 30} ${width / 2} ${endY - 50} ${width / 2} ${endY}`;
  tdPath.setAttribute("d", d);
  tdLength = tdPath.getTotalLength();
  tdStart = startY;
  tdEnd = endY;
  drawThread();
}

function drawThread() {
  const top = tdMain.getBoundingClientRect().top;
  const reach = window.innerHeight * 0.72 - top;
  const progress = Math.min(1, Math.max(0, (reach - tdStart) / (tdEnd - tdStart)));
  tdPath.style.setProperty("--thread-offset", String(1 - progress));
  const point = tdPath.getPointAtLength(progress * tdLength);
  tdTip.setAttribute("cx", point.x);
  tdTip.setAttribute("cy", point.y);
  tdTip.style.opacity = progress > 0 && progress < 1 ? "1" : "0";
}

let tdTicking = false;
window.addEventListener("scroll", () => {
  if (tdTicking) return;
  tdTicking = true;
  window.requestAnimationFrame(() => {
    drawThread();
    tdTicking = false;
  });
}, { passive: true });
new ResizeObserver(layoutThread).observe(tdMain);
document.fonts?.ready.then(layoutThread);

// Thẻ cào Kim Bài Hỷ Sự
const scratchCard = document.querySelector("[data-scratch]");
const foil = scratchCard.querySelector(".td-scratch-foil");
const foilContext = foil.getContext("2d", { willReadFrequently: true });
const burst = scratchCard.querySelector(".td-burst");
let scratching = false;
let lastPoint;
let strokes = 0;

function paintFoil() {
  if (scratchCard.classList.contains("is-revealed")) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = scratchCard.getBoundingClientRect();
  foil.width = width * ratio;
  foil.height = height * ratio;
  foilContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  foilContext.globalCompositeOperation = "source-over";

  // Nền nhũ đỏ son ánh vàng kim sang trọng
  const base = foilContext.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#8f0e25");
  base.addColorStop(0.35, "#c41e3a");
  base.addColorStop(0.52, "#df9b4d");
  base.addColorStop(0.7, "#c41e3a");
  base.addColorStop(1, "#7d0b20");
  foilContext.fillStyle = base;
  foilContext.fillRect(0, 0, width, height);

  // Họa tiết chữ Song Hỷ & Hoa thị chìm
  foilContext.fillStyle = "rgba(255, 240, 215, 0.14)";
  foilContext.font = "500 13px 'Noto Serif Display', Georgia, serif";
  for (let row = 0; row * 28 < height + 28; row += 1) {
    for (let col = -1; col * 76 < width; col += 1) {
      foilContext.fillText("囍 · H♡P", col * 76 + (row % 2) * 38, row * 28 + 18);
    }
  }

  // Viền kim tuyến bên trong thẻ cào
  foilContext.strokeStyle = "rgba(255, 232, 185, 0.55)";
  foilContext.lineWidth = 1.5;
  foilContext.strokeRect(10, 10, width - 20, height - 20);

  // Dòng hướng dẫn ở trung tâm
  foilContext.fillStyle = "#fff8ee";
  foilContext.textAlign = "center";
  foilContext.font = "700 28px 'Noto Serif TC', 'SimSun', serif";
  foilContext.fillText("囍", width / 2, height / 2 - 12);
  foilContext.font = "600 11.5px 'Be Vietnam Pro', Arial, sans-serif";
  foilContext.fillText("C À O   M Ở   N G À Y   V U I", width / 2, height / 2 + 18);
  foilContext.textAlign = "start";
}

function scratchAt(event) {
  const rect = foil.getBoundingClientRect();
  const point = [event.clientX - rect.left, event.clientY - rect.top];
  foilContext.globalCompositeOperation = "destination-out";
  foilContext.lineCap = "round";
  foilContext.lineJoin = "round";
  foilContext.lineWidth = 46;
  foilContext.beginPath();
  foilContext.moveTo(...(lastPoint || point));
  foilContext.lineTo(...point);
  foilContext.stroke();
  lastPoint = point;
  strokes += 1;
  if (strokes % 5 === 0 && clearedShare() > 0.45) revealDate();
}

function clearedShare() {
  const { data } = foilContext.getImageData(0, 0, foil.width, foil.height);
  let cleared = 0;
  let total = 0;
  for (let index = 3; index < data.length; index += 4 * 24) {
    total += 1;
    if (data[index] === 0) cleared += 1;
  }
  return cleared / total;
}

function revealDate() {
  if (scratchCard.classList.contains("is-revealed")) return;
  scratching = false;
  scratchCard.classList.add("is-revealed");
  for (let index = 0; index < 24; index += 1) {
    const heart = document.createElement("i");
    const angle = (index / 24) * Math.PI * 2;
    const distance = 90 + (index % 5) * 26;
    heart.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--dy", `${Math.sin(angle) * distance * 0.7}px`);
    heart.style.setProperty("--s", String(0.7 + (index % 4) * 0.25));
    heart.style.setProperty("--r", `${(index % 2 ? 1 : -1) * 40}deg`);
    heart.style.animationDelay = `${(index % 3) * 0.05}s`;
    burst.append(heart);
  }
  window.setTimeout(() => burst.replaceChildren(), 1600);
}

foil.addEventListener("pointerdown", (event) => {
  scratching = true;
  lastPoint = undefined;
  foil.setPointerCapture(event.pointerId);
  scratchAt(event);
});
foil.addEventListener("pointermove", (event) => scratching && scratchAt(event));
foil.addEventListener("pointerup", () => { scratching = false; });
foil.addEventListener("pointercancel", () => { scratching = false; });
document.querySelector("[data-scratch-skip]").addEventListener("click", revealDate);
new ResizeObserver(layoutThread).observe(scratchCard);
document.fonts?.ready.then(paintFoil);
