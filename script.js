const body = document.body;
const gate = document.querySelector("[data-gate]");
const site = document.querySelector("[data-site]");
const openButtons = document.querySelectorAll("[data-open-invitation]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function revealInvitation() {
  if (gate.classList.contains("is-opening")) return;

  gate.classList.add("is-opening");
  const leaveDelay = reduceMotion ? 0 : 1650;
  const finishDelay = reduceMotion ? 20 : 2250;

  window.setTimeout(() => gate.classList.add("is-leaving"), leaveDelay);
  window.setTimeout(() => {
    body.classList.remove("is-locked");
    body.classList.add("is-revealed");
    gate.hidden = true;
    gate.setAttribute("aria-hidden", "true");
    site.setAttribute("aria-hidden", "false");
  }, finishDelay);
}

openButtons.forEach((button) => button.addEventListener("click", revealInvitation));

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const musicButton = document.querySelector("[data-music-toggle]");
const musicLabel = document.querySelector("[data-music-label]");
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
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

async function startMusic() {
  audioContext ??= new AudioContextClass();
  await audioContext.resume();
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

musicButton.addEventListener("click", () => {
  if (!AudioContextClass) {
    musicLabel.textContent = "Không hỗ trợ";
    musicButton.disabled = true;
    return;
  }

  if (musicTimer) stopMusic();
  else startMusic();
});
