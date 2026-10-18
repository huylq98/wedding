const musicButton = document.querySelector("[data-music-toggle]");
const musicLabel = document.querySelector("[data-music-label]");
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const melody = [
  261.63, 329.63, 392.0, 329.63,
  220.0, 261.63, 329.63, 261.63,
  174.61, 220.0, 261.63, 220.0,
  196.0, 246.94, 293.66, 246.94,
];

let audioContext;
let musicTimer;
let noteIndex = 0;

function playSoftNote(frequency) {
  const now = audioContext.currentTime;
  const noteGain = audioContext.createGain();
  const mainTone = audioContext.createOscillator();
  const overtone = audioContext.createOscillator();
  const overtoneGain = audioContext.createGain();

  mainTone.type = "sine";
  mainTone.frequency.value = frequency;
  overtone.type = "sine";
  overtone.frequency.value = frequency * 2;
  overtoneGain.gain.value = 0.12;
  noteGain.gain.setValueAtTime(0.0001, now);
  noteGain.gain.exponentialRampToValueAtTime(0.11, now + 0.035);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
  mainTone.connect(noteGain);
  overtone.connect(overtoneGain);
  overtoneGain.connect(noteGain);
  noteGain.connect(audioContext.destination);
  mainTone.start(now);
  overtone.start(now);
  mainTone.stop(now + 1.85);
  overtone.stop(now + 1.85);
}

function playNextNote() {
  playSoftNote(melody[noteIndex]);
  noteIndex = (noteIndex + 1) % melody.length;
}

let musicStarting = false;

async function startMusic() {
  if (musicStarting || musicTimer) return;
  musicStarting = true;
  audioContext ??= new AudioContextClass();
  try {
    await audioContext.resume();
  } finally {
    musicStarting = false;
  }
  playNextNote();
  musicTimer = window.setInterval(playNextNote, 720);
  musicButton.classList.add("is-playing");
  musicButton.setAttribute("aria-pressed", "true");
  musicButton.setAttribute("aria-label", "Tắt nhạc nền tạm");
  musicLabel.textContent = "Tắt nhạc";
}

async function stopMusic() {
  window.clearInterval(musicTimer);
  musicTimer = undefined;
  await audioContext.suspend();
  musicButton.classList.remove("is-playing");
  musicButton.setAttribute("aria-pressed", "false");
  musicButton.setAttribute("aria-label", "Bật nhạc nền tạm");
  musicLabel.textContent = "Bật nhạc";
}

musicButton?.addEventListener("click", () => {
  if (!AudioContextClass) {
    musicLabel.textContent = "Không hỗ trợ";
    musicButton.disabled = true;
    return;
  }
  if (musicStarting) return;
  if (musicTimer) stopMusic();
  else startMusic();
});

// Tạm dừng nhạc khi khách chuyển app hoặc tab.
document.addEventListener("visibilitychange", () => {
  if (!audioContext || !musicTimer) return;
  if (document.hidden) audioContext.suspend();
  else audioContext.resume();
});

const invitationTheme = document.body.dataset.theme;
if (invitationTheme) {
  const storageKey = `huy-phuong-opened-${invitationTheme}`;
  let alreadyOpened = false;
  try {
    alreadyOpened = window.sessionStorage.getItem(storageKey) === "yes";
  } catch {}

  if (!alreadyOpened) {
    const gate = document.createElement("div");
    gate.className = "invitation-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "invitation-gate-title");
    gate.innerHTML = `
      <div class="invitation-door invitation-door-left" aria-hidden="true"></div>
      <div class="invitation-door invitation-door-right" aria-hidden="true"></div>
      <div class="invitation-gate-card">
        <span class="gate-mark" aria-hidden="true"></span>
        <p>Thiệp mời cưới của</p>
        <h2 class="gate-title" id="invitation-gate-title">Huy <i>&amp;</i>&nbsp;Phương</h2>
        <button type="button" data-open-invitation><span>H&amp;P</span>${document.body.dataset.gateLabel || "Mở thiệp"}</button>
        <small>${document.body.dataset.gateHint || "Nhạc nền sẽ bắt đầu sau khi mở"}</small>
      </div>
      <div class="opening-petals" aria-hidden="true"></div>
    `;
    // Khi màn mở đang hiện, phần phía sau không nhận focus hay chạm.
    const behind = [...document.body.children];
    behind.forEach((element) => { element.inert = true; });
    document.body.prepend(gate);
    document.body.classList.add("is-invitation-locked");
    const openButton = gate.querySelector("[data-open-invitation]");
    openButton.focus({ preventScroll: true });

    const petalLayer = gate.querySelector(".opening-petals");
    for (let index = 0; index < 12; index += 1) {
      const petal = document.createElement("i");
      petal.style.setProperty("--petal-x", `${8 + ((index * 17) % 84)}vw`);
      petal.style.setProperty("--petal-drift", `${-34 + ((index * 13) % 68)}vw`);
      petal.style.setProperty("--petal-delay", `${(index % 6) * 0.08}s`);
      petal.style.setProperty("--petal-rotate", `${25 + index * 31}deg`);
      petalLayer.append(petal);
    }

    openButton.addEventListener("click", () => {
      gate.classList.add("is-opening");
      document.body.classList.remove("is-invitation-locked");
      behind.forEach((element) => { element.inert = false; });
      document.querySelector("main")?.focus({ preventScroll: true });
      try {
        window.sessionStorage.setItem(storageKey, "yes");
      } catch {}
      if (AudioContextClass && !musicTimer) startMusic().catch(() => {});
      window.setTimeout(() => gate.remove(), reduceMotion ? 80 : 1900);
    });
  }
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }),
    { threshold: 0.14 },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
