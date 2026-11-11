const musicButton = document.querySelector("[data-music-toggle]");
const musicLabel = document.querySelector("[data-music-label]");
const AudioContextClass = window.AudioContext || window.webkitAudioContext;

// Giai điệu ngũ cung / hộp nhạc ấm áp mang âm hưởng Á Đông lãng mạn
const melody = [
  523.25, 659.25, 783.99, 880.0,
  783.99, 659.25, 587.33, 523.25,
  440.0, 523.25, 659.25, 783.99,
  659.25, 587.33, 523.25, 392.0,
  440.0, 523.25, 587.33, 659.25,
  783.99, 880.0, 783.99, 659.25,
  587.33, 523.25, 440.0, 392.0,
  440.0, 523.25, 659.25, 523.25,
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
  overtone.type = "triangle";
  overtone.frequency.value = frequency * 2;
  overtoneGain.gain.value = 0.06;
  noteGain.gain.setValueAtTime(0.0001, now);
  noteGain.gain.exponentialRampToValueAtTime(0.085, now + 0.04);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);
  mainTone.connect(noteGain);
  overtone.connect(overtoneGain);
  overtoneGain.connect(noteGain);
  noteGain.connect(audioContext.destination);
  mainTone.start(now);
  overtone.start(now);
  mainTone.stop(now + 1.95);
  overtone.stop(now + 1.95);
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
  musicTimer = window.setInterval(playNextNote, 680);
  musicButton?.classList.add("is-playing");
  musicButton?.setAttribute("aria-pressed", "true");
  musicButton?.setAttribute("aria-label", "Tắt nhạc nền");
  if (musicLabel) musicLabel.textContent = "Tắt nhạc";
}

async function stopMusic() {
  window.clearInterval(musicTimer);
  musicTimer = undefined;
  await audioContext?.suspend();
  musicButton?.classList.remove("is-playing");
  musicButton?.setAttribute("aria-pressed", "false");
  musicButton?.setAttribute("aria-label", "Bật nhạc nền");
  if (musicLabel) musicLabel.textContent = "Bật nhạc";
}

musicButton?.addEventListener("click", () => {
  if (!AudioContextClass) {
    if (musicLabel) musicLabel.textContent = "Không hỗ trợ";
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

// Cụm nút nổi bên phải: Nhạc nền + Thả tim chúc phúc
if (musicButton) {
  const controls = document.createElement("div");
  controls.className = "floating-controls";
  musicButton.parentNode.insertBefore(controls, musicButton);

  const heartBtn = document.createElement("button");
  heartBtn.type = "button";
  heartBtn.className = "demo-heart-btn";
  heartBtn.setAttribute("aria-label", "Thả tim chúc phúc cho Huy và Phương");
  const heartStorageKey = "huy-phuong-hearts-count";
  let heartCount = 281;
  try {
    const saved = parseInt(window.localStorage.getItem(heartStorageKey) || "281", 10);
    if (!Number.isNaN(saved) && saved >= 281) heartCount = saved;
  } catch {}

  heartBtn.innerHTML = `<span aria-hidden="true">囍</span><span class="heart-count" data-heart-count>${heartCount}</span>`;
  controls.append(heartBtn, musicButton);

  const symbols = ["囍", "♥", "✿", "✦", "♡"];
  heartBtn.addEventListener("click", () => {
    heartCount += 1;
    const badge = heartBtn.querySelector("[data-heart-count]");
    if (badge) badge.textContent = String(heartCount);
    try {
      window.localStorage.setItem(heartStorageKey, String(heartCount));
    } catch {}

    for (let i = 0; i < 3; i += 1) {
      const floatEl = document.createElement("span");
      floatEl.className = "floating-blessing";
      floatEl.textContent = symbols[(heartCount + i) % symbols.length];
      floatEl.style.setProperty("--bx", `${-26 + Math.random() * 52}px`);
      floatEl.style.setProperty("--br", `${-25 + Math.random() * 50}deg`);
      floatEl.style.animationDelay = `${i * 0.08}s`;
      document.body.append(floatEl);
      window.setTimeout(() => floatEl.remove(), 1800);
    }
  });
}

// Cá nhân hóa tên khách mời từ URL (?khach=... / ?guest=... / ?to=...) học hỏi từ chungdoi.com
function getGuestNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("khach") || params.get("guest") || params.get("to") || params.get("ten") || "";
  return raw.trim();
}

function applyGuestPersonalization(guestName) {
  const display = guestName || "Bạn cùng Người thương";
  document.querySelectorAll(".son-guest, .td-guest, .cht-guest, [data-guest-name]").forEach((el) => {
    el.textContent = display;
  });
  const gateGuest = document.querySelector("[data-gate-guest]");
  if (gateGuest) {
    gateGuest.innerHTML = `Thân mời: <strong>${display}</strong>`;
  }
  if (guestName) {
    const rsvpInput = document.querySelector("[data-rsvp-form] input[name='guest-name']");
    if (rsvpInput && !rsvpInput.value) rsvpInput.value = guestName;
    const wishInput = document.querySelector("[data-wish-form] input[name='wish-name']");
    if (wishInput && !wishInput.value) wishInput.value = guestName;
  }
}

// Cổng mở thiệp (Invitation Gate)
const invitationTheme = document.body.dataset.theme;
function mountInvitationGate(forceShow = false) {
  if (!invitationTheme) return;
  const storageKey = `huy-phuong-opened-${invitationTheme}`;
  let alreadyOpened = new URLSearchParams(window.location.search).get("open") === "1";
  if (!forceShow && !alreadyOpened) {
    try {
      alreadyOpened = window.sessionStorage.getItem(storageKey) === "yes";
    } catch {}
  }
  if (alreadyOpened) return;

  document.querySelector(".invitation-gate")?.remove();
  const currentGuest = getGuestNameFromUrl() || "Bạn cùng Người thương";

  const gate = document.createElement("div");
  gate.className = "invitation-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "invitation-gate-title");
  gate.innerHTML = `
    <div class="invitation-door invitation-door-left" aria-hidden="true"></div>
    <div class="invitation-door invitation-door-right" aria-hidden="true"></div>
    <div class="gate-envelope-stage">
      <div class="invitation-gate-card">
        <h2 class="gate-title" id="invitation-gate-title">Quốc Huy <i>&amp;</i> Thu Phương</h2>
        <div class="gate-divider" aria-hidden="true"><span>❦</span></div>
        <p class="gate-date">Tháng 11 · 2026</p>
        <p class="gate-invite-word">Thân Mời</p>
        <button type="button" data-open-invitation><span>囍</span>Mở thiệp</button>
      </div>
    </div>
  `;

  const behind = [...document.body.children].filter((el) => el !== gate && !el.classList.contains("ambient-fx"));
  behind.forEach((element) => { element.inert = true; });
  document.body.prepend(gate);
  document.body.classList.add("is-invitation-locked");
  const openButton = gate.querySelector("[data-open-invitation]");
  openButton.focus({ preventScroll: true });

  openButton.addEventListener("click", () => {
    gate.classList.add("is-opening");
    document.body.classList.remove("is-invitation-locked");
    behind.forEach((element) => { element.inert = false; });
    document.querySelector("main")?.focus({ preventScroll: true });
    try {
      window.sessionStorage.setItem(storageKey, "yes");
    } catch {}
    if (AudioContextClass && !musicTimer) startMusic().catch(() => {});
    window.setTimeout(() => gate.remove(), 1850);
  });
}

applyGuestPersonalization(getGuestNameFromUrl());
window.addEventListener("DOMContentLoaded", () => applyGuestPersonalization(getGuestNameFromUrl()));

// Hiệu ứng Hoa & Cánh Lụa Đỏ Đô bay bồng bềnh thường trực + tung bay theo nhịp lướt trang
function mountAmbientBlossoms() {
  if (document.querySelector(".ambient-blossoms")) return;
  const layer = document.createElement("div");
  layer.className = "ambient-blossoms ambient-fx";
  layer.setAttribute("aria-hidden", "true");
  const palette = ["#841512", "#a52420", "#6e1411", "#c59243"];
  const blossomSvg = `
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <g>
        <ellipse cx="12" cy="5" rx="2.3" ry="4.6"></ellipse>
        <ellipse cx="12" cy="5" rx="2.3" ry="4.6" transform="rotate(60 12 12)"></ellipse>
        <ellipse cx="12" cy="5" rx="2.3" ry="4.6" transform="rotate(120 12 12)"></ellipse>
        <ellipse cx="12" cy="5" rx="2.3" ry="4.6" transform="rotate(180 12 12)"></ellipse>
        <ellipse cx="12" cy="5" rx="2.3" ry="4.6" transform="rotate(240 12 12)"></ellipse>
        <ellipse cx="12" cy="5" rx="2.3" ry="4.6" transform="rotate(300 12 12)"></ellipse>
      </g>
      <circle cx="12" cy="12" r="2" fill="#f9f1e2" fill-opacity="0.9"></circle>
    </svg>
  `;
  const singlePetalSvg = `
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M12 2C7.5 6.5 6 12.2 8.5 17.2C10.1 20.4 13.9 20.4 15.5 17.2C18 12.2 16.5 6.5 12 2Z" />
      <path d="M12 5.5V16.5" stroke="#f9f1e2" stroke-width="0.9" stroke-opacity="0.55" stroke-linecap="round" />
    </svg>
  `;
  const sparkleSvg = `
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
    </svg>
  `;
  const shapes = [blossomSvg, singlePetalSvg, blossomSvg, singlePetalSvg, sparkleSvg];

  for (let i = 0; i < 14; i += 1) {
    const item = document.createElement("span");
    item.className = "ambient-blossom";
    const left = 4 + ((i * 19 + 7) % 92);
    const size = 12 + (i % 5) * 2.4;
    const duration = 14 + (i % 6) * 2.4;
    const delay = -((i * 3.1) % 20);
    const sway = (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 10);
    item.style.cssText = `left:${left}%;font-size:${size.toFixed(1)}px;color:${palette[i % palette.length]};--sway:${sway}px;animation-duration:${duration.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s`;
    item.innerHTML = shapes[i % shapes.length];
    layer.append(item);
  }
  document.body.append(layer);

  // Hiệu ứng cánh hoa & hoa đào tung bay theo luồng gió mỗi khi người dùng lướt trang
  let lastScrollY = window.scrollY;
  let lastSpawnAt = 0;
  let activeScrollPetals = 0;

  function spawnScrollPetal(direction, speed) {
    if (activeScrollPetals >= 14) return;
    activeScrollPetals += 1;
    const petal = document.createElement("span");
    petal.className = "scroll-wind-petal";
    const isBlossom = Math.random() > 0.45;
    petal.innerHTML = isBlossom ? blossomSvg : singlePetalSvg;

    const startX = 12 + Math.random() * 76;
    const startY = direction > 0
      ? 55 + Math.random() * 38
      : 8 + Math.random() * 38;
    const driftX = (Math.random() > 0.5 ? 1 : -1) * (28 + Math.random() * 54);
    const driftY = direction > 0
      ? -(65 + Math.min(110, speed * 1.6) + Math.random() * 55)
      : (65 + Math.min(110, speed * 1.6) + Math.random() * 55);
    const rot = (Math.random() > 0.5 ? 1 : -1) * (140 + Math.random() * 180);
    const size = 12 + Math.random() * 8;
    const color = palette[Math.floor(Math.random() * palette.length)];

    petal.style.cssText = `left:${startX.toFixed(1)}%;top:${startY.toFixed(1)}vh;font-size:${size.toFixed(1)}px;color:${color};--dx:${driftX.toFixed(0)}px;--dy:${driftY.toFixed(0)}px;--rot:${rot.toFixed(0)}deg`;
    layer.append(petal);
    window.setTimeout(() => {
      petal.remove();
      activeScrollPetals -= 1;
    }, 1650);
  }

  window.addEventListener("scroll", () => {
    const now = performance.now();
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;
    const speed = Math.abs(delta);
    lastScrollY = currentY;

    if (speed > 6 && now - lastSpawnAt > 95) {
      lastSpawnAt = now;
      const dir = delta >= 0 ? 1 : -1;
      spawnScrollPetal(dir, speed);
      if (speed > 36) spawnScrollPetal(dir, speed * 0.8);
    }
  }, { passive: true });
}
mountAmbientBlossoms();

mountInvitationGate(false);

// Hộp thoại tạo link mời cá nhân hóa tên khách (mở từ nút ở cuối thiệp để không làm rối màn hình khách)
const guestTriggerBtn = document.querySelector("[data-open-guest-tool]");
if (guestTriggerBtn) {
  const popover = document.createElement("div");
  popover.className = "guest-link-popover";
  popover.hidden = true;
  popover.innerHTML = `
    <strong>Cá nhân hóa tên khách mời</strong>
    <p>Nhập tên khách (VD: <em>Gia đình Anh Minh</em>) để tự động in lên phong bì &amp; bức thư mời:</p>
    <div class="guest-link-row">
      <input type="text" data-guest-input placeholder="VD: Anh Tuấn & Chị Lan..." value="${getGuestNameFromUrl().replace(/"/g, "&quot;")}" />
      <button type="button" data-guest-copy>Sao chép link</button>
    </div>
    <small class="guest-link-status" data-guest-status></small>
  `;
  document.body.append(popover);

  guestTriggerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popover.hidden = !popover.hidden;
    if (!popover.hidden) popover.querySelector("[data-guest-input]")?.focus();
  });

  const guestInput = popover.querySelector("[data-guest-input]");
  const guestCopyBtn = popover.querySelector("[data-guest-copy]");
  const guestStatus = popover.querySelector("[data-guest-status]");

  guestInput?.addEventListener("input", () => {
    const val = guestInput.value.trim();
    applyGuestPersonalization(val);
  });

  guestCopyBtn?.addEventListener("click", async () => {
    const val = guestInput.value.trim();
    const url = new URL(window.location.href);
    url.searchParams.delete("open");
    if (val) url.searchParams.set("khach", val);
    else url.searchParams.delete("khach");
    applyGuestPersonalization(val);
    try {
      await navigator.clipboard.writeText(url.toString());
      guestStatus.textContent = `✓ Đã sao chép link mời dành cho "${val || "Bạn cùng Người thương"}"!`;
    } catch {
      guestStatus.textContent = url.toString();
    }
  });

  document.addEventListener("click", (e) => {
    if (!popover.hidden && !popover.contains(e.target) && !guestTriggerBtn.contains(e.target)) {
      popover.hidden = true;
    }
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }),
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
