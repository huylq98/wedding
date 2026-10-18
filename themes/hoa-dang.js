// 05 · Hoa Đăng: đèn lồng bay trên một canvas cố định sau thiệp.
const sky = document.querySelector(".hd-sky");
const skyContext = sky.getContext("2d");
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
const lanterns = [];
let skyWidth = 0;
let skyHeight = 0;
let lastFrame = 0;
let running = false;

// Vẽ sẵn một chiếc đèn rồi dùng lại cho mọi đèn trên trời.
const sprite = document.createElement("canvas");
sprite.width = 120 * pixelRatio;
sprite.height = 160 * pixelRatio;
(() => {
  const c = sprite.getContext("2d");
  c.scale(pixelRatio, pixelRatio);
  const glow = c.createRadialGradient(60, 92, 4, 60, 92, 60);
  glow.addColorStop(0, "rgba(255, 170, 80, 0.55)");
  glow.addColorStop(1, "rgba(255, 120, 60, 0)");
  c.fillStyle = glow;
  c.fillRect(0, 0, 120, 160);

  c.beginPath();
  c.moveTo(38, 56);
  c.bezierCurveTo(36, 30, 84, 30, 82, 56);
  c.lineTo(75, 110);
  c.quadraticCurveTo(60, 118, 45, 110);
  c.closePath();
  const body = c.createLinearGradient(0, 34, 0, 116);
  body.addColorStop(0, "#a3122a");
  body.addColorStop(0.55, "#e2452f");
  body.addColorStop(1, "#ffcf7a");
  c.fillStyle = body;
  c.fill();
  const heart = c.createRadialGradient(60, 104, 2, 60, 100, 30);
  heart.addColorStop(0, "rgba(255, 245, 200, 0.95)");
  heart.addColorStop(1, "rgba(255, 220, 140, 0)");
  c.fillStyle = heart;
  c.fill();
  c.strokeStyle = "rgba(110, 10, 20, 0.28)";
  c.lineWidth = 1;
  [50, 60, 70].forEach((x) => {
    c.beginPath();
    c.moveTo(x, 38);
    c.lineTo(x + (x - 60) * 0.3, 112);
    c.stroke();
  });
  c.fillStyle = "#fff6d8";
  c.beginPath();
  c.ellipse(60, 114, 4, 2.4, 0, 0, Math.PI * 2);
  c.fill();
})();

function makeLantern({ x, y, depth, label = "" }) {
  return {
    x,
    y,
    depth,
    label,
    speed: 14 + depth * 30,
    sway: 6 + Math.random() * 14,
    swaySpeed: 0.3 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    flicker: Math.random() * 10,
  };
}

function ambientTarget() {
  return skyWidth < 640 ? 16 : 28;
}

function addAmbient(anywhere) {
  lanterns.push(makeLantern({
    x: Math.random() * skyWidth,
    y: anywhere ? Math.random() * skyHeight : skyHeight + 60 + Math.random() * 120,
    depth: 0.2 + Math.random() * 0.6,
  }));
}

function release(x, y, label) {
  lanterns.push(makeLantern({ x, y, depth: 0.85 + Math.random() * 0.15, label }));
  if (lanterns.length > 60) lanterns.splice(lanterns.findIndex((item) => !item.label), 1);
  if (calm) drawSky(0);
}

function resizeSky() {
  if (skyWidth) lanterns.forEach((lantern) => { lantern.x *= window.innerWidth / skyWidth; });
  skyWidth = window.innerWidth;
  skyHeight = window.innerHeight;
  sky.width = skyWidth * pixelRatio;
  sky.height = skyHeight * pixelRatio;
  skyContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  if (calm) drawSky(0);
}

function drawSky(seconds) {
  skyContext.clearRect(0, 0, skyWidth, skyHeight);
  lanterns.sort((a, b) => a.depth - b.depth);
  for (let index = lanterns.length - 1; index >= 0; index -= 1) {
    const lantern = lanterns[index];
    lantern.y -= lantern.speed * seconds;
    lantern.phase += lantern.swaySpeed * seconds;
    lantern.flicker += seconds * 6;
    if (lantern.y < -140) {
      lanterns.splice(index, 1);
    }
  }
  const ambient = lanterns.filter((item) => !item.label && item.depth < 0.85).length;
  for (let count = ambient; count < ambientTarget(); count += 1) addAmbient(false);

  lanterns.forEach((lantern) => {
    const size = 0.35 + lantern.depth * 0.75;
    const width = 120 * size;
    const height = 160 * size;
    const x = lantern.x + Math.sin(lantern.phase) * lantern.sway;
    const fade = Math.min(1, Math.max(0, (lantern.y + 100) / 220));
    skyContext.globalAlpha = (0.35 + lantern.depth * 0.65) * (0.88 + Math.sin(lantern.flicker) * 0.12) * fade;
    skyContext.drawImage(sprite, x - width / 2, lantern.y - height / 2, width, height);
    if (lantern.label) {
      skyContext.font = "500 12px 'Be Vietnam Pro', Arial, sans-serif";
      skyContext.textAlign = "center";
      skyContext.fillStyle = "rgba(255, 232, 196, 0.95)";
      skyContext.shadowColor = "rgba(0, 0, 0, 0.6)";
      skyContext.shadowBlur = 6;
      skyContext.fillText(lantern.label, x, lantern.y + height * 0.42, Math.min(260, skyWidth - 32));
      skyContext.shadowBlur = 0;
    }
  });
  skyContext.globalAlpha = 1;
}

function frame(time) {
  if (!running) return;
  const seconds = Math.min(0.05, (time - (lastFrame || time)) / 1000);
  lastFrame = time;
  drawSky(seconds);
  window.requestAnimationFrame(frame);
}

function startSky() {
  if (calm || running || document.hidden) return;
  running = true;
  lastFrame = 0;
  window.requestAnimationFrame(frame);
}

resizeSky();
for (let count = 0; count < ambientTarget(); count += 1) addAmbient(true);
window.addEventListener("resize", resizeSky);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) running = false;
  else startSky();
});
if (calm) drawSky(0);
else startSky();

// Chạm vào bìa hoặc cuối thiệp để thả đèn.
document.querySelectorAll("[data-release-sky]").forEach((area) => {
  area.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    release(event.clientX, event.clientY + 30);
  });
});

// Mở thiệp: thả một loạt đèn từ dưới lên.
document.querySelector("[data-open-invitation]")?.addEventListener("click", () => {
  for (let index = 0; index < 10; index += 1) {
    window.setTimeout(() => {
      release(skyWidth * (0.15 + Math.random() * 0.7), skyHeight + 40 + Math.random() * 60);
    }, index * 120);
  }
});

// Lời chúc bay lên cùng đèn. Nghe ở pha capture để đọc nội dung trước khi form bị xoá.
document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!form.matches("[data-wish-form]")) return;
  const data = new FormData(form);
  const message = String(data.get("wish-message") || "").trim();
  const name = data.get("anonymous") ? "Ẩn danh" : String(data.get("wish-name") || "").trim();
  const short = message.length > 34 ? `${message.slice(0, 33)}…` : message;
  release(skyWidth / 2 + (Math.random() - 0.5) * 60, skyHeight + 40, `“${short}” · ${name}`);
}, true);
