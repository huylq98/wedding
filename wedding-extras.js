const weddingDate = new Date("2026-11-28T10:00:00+07:00");
const venueName = "Selena Palace";
const venueAddress = "Km 19 Quốc lộ 32, Đức Thượng, Hoài Đức, Hà Nội";
const mapQuery = encodeURIComponent(`${venueName}, ${venueAddress}`);

const extras = document.createElement("section");
extras.className = "wedding-extras";
extras.id = "tham-du";
extras.setAttribute("aria-label", "Thông tin và xác nhận tham dự");
extras.innerHTML = `
  <section class="x-section x-family" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Gia đình hai bên</p>
      <h2>Trân trọng báo tin</h2>
    </header>
    <div class="x-family-grid">
      <article>
        <p class="x-label">Nhà trai</p>
        <p class="x-parent">Ông ··················</p>
        <p class="x-parent">Bà ··················</p>
        <small>Tên bố mẹ đang cập nhật</small>
      </article>
      <span class="x-family-amp" aria-hidden="true">&amp;</span>
      <article>
        <p class="x-label">Nhà gái</p>
        <p class="x-parent">Ông ··················</p>
        <p class="x-parent">Bà ··················</p>
        <small>Tên bố mẹ đang cập nhật</small>
      </article>
    </div>
  </section>

  <section class="x-section x-story" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Chuyện của chúng mình</p>
      <h2>Từ hai người lạ,<br />thành một nhà.</h2>
    </header>
    <ol class="x-story-list">
      <li>
        <figure class="ph" style="--ratio: 1"><figcaption>1:1</figcaption></figure>
        <div><span class="x-story-when">Năm ····</span><h3>Lần đầu gặp nhau</h3><p>Vài dòng kể lại ngày đầu tiên sẽ được thêm vào đây.</p></div>
      </li>
      <li>
        <figure class="ph" style="--ratio: 1"><figcaption>1:1</figcaption></figure>
        <div><span class="x-story-when">Năm ····</span><h3>Lời cầu hôn</h3><p>Khoảnh khắc nói lời đồng ý, kể ngắn trong hai câu.</p></div>
      </li>
      <li>
        <figure class="ph" style="--ratio: 1"><figcaption>1:1</figcaption></figure>
        <div><span class="x-story-when">28 · 11 · 2026</span><h3>Về chung một nhà</h3><p>Và hôm ấy, có bạn ở đây cùng chúng mình.</p></div>
      </li>
    </ol>
  </section>

  <section class="x-section x-album" id="anh-cuoi" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Album ảnh cưới</p>
      <h2>Những khoảnh khắc</h2>
    </header>
    <div class="x-album-grid">
      <figure class="ph x-album-a" style="--ratio: 4 / 5"><figcaption>Chân dung · 4:5</figcaption></figure>
      <figure class="ph x-album-b" style="--ratio: 1"><figcaption>Chi tiết · 1:1</figcaption></figure>
      <figure class="ph x-album-c" style="--ratio: 1"><figcaption>Nhẫn · 1:1</figcaption></figure>
      <figure class="ph x-album-d" style="--ratio: 3 / 2"><figcaption>Khoảnh khắc · 3:2</figcaption></figure>
    </div>
  </section>

  <section class="x-section x-schedule" id="lich-trinh" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Lịch trình ngày vui</p>
      <h2>Hai nghi lễ,<br />một ngày vui.</h2>
    </header>
    <ol class="x-schedule-list">
      <li class="is-pending">
        <time>Đang cập nhật</time>
        <h3>Lễ Vu Quy</h3>
        <p>Tại tư gia nhà gái</p>
      </li>
      <li class="is-main">
        <time datetime="2026-11-28T10:00:00+07:00">10:00 · Thứ Bảy 28.11.2026</time>
        <h3>Lễ Thành Hôn</h3>
        <p>${venueName} · ${venueAddress}</p>
      </li>
      <li class="is-pending">
        <time>Đang cập nhật</time>
        <h3>Tiệc chung vui</h3>
        <p>Cùng gia đình và bạn bè</p>
      </li>
    </ol>
    <p class="x-dress">Trang phục · <span>đang cập nhật</span></p>
  </section>

  <section class="x-section x-countdown" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Đếm ngược đến ngày vui</p>
    </header>
    <div class="countdown" data-countdown aria-live="polite">
      <span><strong data-days>--</strong><small>Ngày</small></span>
      <span><strong data-hours>--</strong><small>Giờ</small></span>
      <span><strong data-minutes>--</strong><small>Phút</small></span>
      <span><strong data-seconds>--</strong><small>Giây</small></span>
    </div>
  </section>

  <section class="x-section x-location" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Địa điểm tổ chức</p>
      <h2>${venueName}</h2>
    </header>
    <p class="x-address">${venueAddress}</p>
    <div class="map-frame is-collapsed" id="ban-do">
      <div class="map-placeholder">
        <span class="map-pin" aria-hidden="true"></span>
        <p>Bản đồ chỉ tải khi bạn chọn xem.</p>
        <button type="button" data-map-reveal>Xem bản đồ</button>
      </div>
      <iframe
        title="Bản đồ đến ${venueName}"
        data-src="https://www.google.com/maps?q=${mapQuery}&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        hidden
      ></iframe>
    </div>
    <div class="x-actions">
      <a class="x-btn is-solid" href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener">Chỉ đường</a>
      <button class="x-btn" type="button" data-add-calendar>Thêm vào lịch</button>
    </div>
  </section>

  <section class="x-section x-rsvp" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Xác nhận tham dự</p>
      <h2>Bạn sẽ đến chứ?</h2>
    </header>
    <form class="x-form" data-rsvp-form>
      <label class="x-field">
        <span>Tên của bạn</span>
        <input name="guest-name" autocomplete="name" required placeholder="Nhập họ tên" />
      </label>
      <fieldset class="x-choice">
        <legend>Phản hồi</legend>
        <label><input type="radio" name="attendance" value="yes" required /><span>Mình sẽ đến</span></label>
        <label><input type="radio" name="attendance" value="no" /><span>Xin phép vắng</span></label>
      </fieldset>
      <label class="x-field">
        <span>Lời nhắn</span>
        <textarea name="message" rows="3" placeholder="Gửi vài lời đến Huy và Phương"></textarea>
      </label>
      <button class="x-btn is-solid" type="submit">Gửi xác nhận</button>
      <p class="form-status" data-form-status>Bản xem trước, phản hồi chưa được lưu.</p>
    </form>
  </section>

  <section class="x-section x-wishes" id="loi-chuc" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Sổ lời chúc</p>
      <h2>Đôi lời chúc phúc</h2>
    </header>
    <form class="x-form" data-wish-form>
      <label class="x-field">
        <span>Tên của bạn</span>
        <input name="wish-name" autocomplete="name" required placeholder="Nhập tên" />
      </label>
      <label class="x-check"><input type="checkbox" name="anonymous" /> Gửi ẩn danh</label>
      <label class="x-field">
        <span>Lời chúc</span>
        <textarea name="wish-message" rows="4" required placeholder="Viết lời chúc cho Huy và Phương"></textarea>
      </label>
      <button class="x-btn is-solid" type="submit">Gửi lời chúc</button>
      <p class="form-status" data-wish-status>Bản demo chỉ lưu lời chúc trên thiết bị này.</p>
    </form>
    <div class="wish-preview" aria-live="polite">
      <p class="wish-empty" data-wish-empty>Chưa có lời chúc nào trên thiết bị này.</p>
      <div class="wish-preview-list" data-wish-list></div>
    </div>
  </section>

  <section class="x-section x-gift" id="mung-cuoi" data-reveal>
    <header class="x-head">
      <p class="x-kicker">Mừng cưới</p>
      <h2>Gửi chút yêu thương</h2>
    </header>
    <p class="x-lead">Nếu không thể đến chung vui, bạn có thể gửi lời chúc qua mã QR bên dưới.</p>
    <div class="x-gift-grid">
      <article>
        <p class="x-label">Chú rể</p>
        <h3>Lê Quốc Huy</h3>
        <div class="qr-placeholder" role="img" aria-label="Mã QR ngân hàng của chú rể sẽ cập nhật sau"><span>QR</span></div>
        <small>Ngân hàng · Số tài khoản</small>
      </article>
      <article>
        <p class="x-label">Cô dâu</p>
        <h3>Nguyễn Vũ Thu Phương</h3>
        <div class="qr-placeholder" role="img" aria-label="Mã QR ngân hàng của cô dâu sẽ cập nhật sau"><span>QR</span></div>
        <small>Ngân hàng · Số tài khoản</small>
      </article>
    </div>
  </section>
`;

const main = document.querySelector("main");
const footer = main?.querySelector(":scope > footer");
if (footer) main.insertBefore(extras, footer);
else main?.append(extras);
if (window.location.hash) {
  const anchorTarget = document.querySelector(window.location.hash);
  if (anchorTarget) window.requestAnimationFrame(() => anchorTarget.scrollIntoView());
}

const extraRevealItems = extras.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const extraObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      extraObserver.unobserve(entry.target);
    }),
    { threshold: 0.12 },
  );
  extraRevealItems.forEach((item) => extraObserver.observe(item));
} else {
  extraRevealItems.forEach((item) => item.classList.add("is-visible"));
}

function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();
  if (remaining <= 0) {
    const countdown = document.querySelector("[data-countdown]");
    countdown.innerHTML = "<p class=\"wedding-day-message\">Hôm nay là ngày cưới!</p>";
    return false;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  document.querySelector("[data-days]").textContent = String(days).padStart(2, "0");
  document.querySelector("[data-hours]").textContent = String(hours).padStart(2, "0");
  document.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, "0");
  document.querySelector("[data-seconds]").textContent = String(seconds).padStart(2, "0");
  return true;
}

updateCountdown();
const countdownTimer = window.setInterval(() => {
  if (!updateCountdown()) window.clearInterval(countdownTimer);
}, 1000);

document.querySelector("[data-add-calendar]")?.addEventListener("click", () => {
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Huy va Phuong//Wedding Invitation//VI",
    "BEGIN:VEVENT",
    "UID:huy-phuong-20261128@wedding.local",
    "DTSTAMP:20261011T000000Z",
    "DTSTART;TZID=Asia/Ho_Chi_Minh:20261128T100000",
    "SUMMARY:Lễ thành hôn của Huy & Phương",
    `LOCATION:${venueName} - ${venueAddress}`,
    "DESCRIPTION:Trân trọng mời bạn đến chung vui cùng Huy và Phương.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
  const download = document.createElement("a");
  download.href = url;
  download.download = "le-thanh-hon-huy-phuong.ics";
  download.click();
  URL.revokeObjectURL(url);
});

document.querySelector("[data-map-reveal]")?.addEventListener("click", () => {
  const mapFrame = document.querySelector(".map-frame");
  const map = mapFrame?.querySelector("iframe");
  if (!map?.src) map.src = map.dataset.src;
  map.hidden = false;
  mapFrame.classList.remove("is-collapsed");
  mapFrame.classList.add("is-open");
});

document.querySelector("[data-rsvp-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("[data-form-status]").textContent =
    "Đã kiểm tra biểu mẫu. Đây vẫn là bản xem trước nên phản hồi chưa được lưu.";
});

const wishForm = document.querySelector("[data-wish-form]");
const wishNameInput = wishForm?.elements.namedItem("wish-name");
const anonymousInput = wishForm?.elements.namedItem("anonymous");
const wishList = document.querySelector("[data-wish-list]");
const wishEmpty = document.querySelector("[data-wish-empty]");
const wishStorageKey = "huy-phuong-preview-wishes";

function readPreviewWishes() {
  try {
    return JSON.parse(window.localStorage.getItem(wishStorageKey) || "[]");
  } catch {
    return [];
  }
}

function renderPreviewWishes() {
  const wishes = readPreviewWishes();
  wishList.replaceChildren();
  wishEmpty.hidden = wishes.length > 0;
  wishes.slice(-4).reverse().forEach((wish) => {
    const item = document.createElement("article");
    const name = document.createElement("strong");
    const message = document.createElement("p");
    name.textContent = wish.name;
    message.textContent = wish.message;
    item.append(name, message);
    wishList.append(item);
  });
}

anonymousInput?.addEventListener("change", () => {
  wishNameInput.disabled = anonymousInput.checked;
  wishNameInput.required = !anonymousInput.checked;
  wishNameInput.placeholder = anonymousInput.checked ? "Sẽ hiển thị là Ẩn danh" : "Nhập tên";
});

wishForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(wishForm);
  const wishes = readPreviewWishes();
  wishes.push({
    name: formData.get("anonymous") ? "Ẩn danh" : String(formData.get("wish-name")).trim(),
    message: String(formData.get("wish-message")).trim(),
  });
  window.localStorage.setItem(wishStorageKey, JSON.stringify(wishes));
  wishForm.reset();
  wishNameInput.disabled = false;
  wishNameInput.required = true;
  document.querySelector("[data-wish-status]").textContent =
    "Đã thêm vào bản xem thử trên thiết bị này. Lời chúc chưa được gửi lên máy chủ.";
  renderPreviewWishes();

  const bubble = document.createElement("div");
  bubble.className = "wish-bubble";
  bubble.setAttribute("role", "status");
  bubble.innerHTML = "<span>♡</span><strong>Một lời chúc vừa được ghi lại</strong>";
  document.body.append(bubble);
  window.setTimeout(() => bubble.remove(), 3600);
});

renderPreviewWishes();

