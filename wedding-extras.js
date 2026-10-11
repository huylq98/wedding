const weddingDate = new Date("2026-11-28T10:00:00+07:00");
const venueName = "Selena Palace";
const venueAddress = "Km 19 Quốc lộ 32, Đức Thượng, Hoài Đức, Hà Nội";
const mapQuery = encodeURIComponent(`${venueName}, ${venueAddress}`);

const extras = document.createElement("section");
extras.className = "wedding-extras";
extras.id = "tham-du";
extras.setAttribute("aria-label", "Thông tin và xác nhận tham dự");
extras.innerHTML = `
  <div class="photo-placeholders" id="anh-cuoi" data-reveal>
    <div class="placeholder-heading">
      <p class="extras-kicker">Ảnh cưới</p>
      <h2>Chỗ dành cho những khoảnh khắc của hai bạn.</h2>
      <p>Các khung dưới đây ghi sẵn tỉ lệ để thay ảnh thật mà không phải sửa lại bố cục.</p>
    </div>
    <div class="photo-placeholder-grid">
      <figure class="photo-slot photo-slot-cover">
        <span class="slot-index">01</span>
        <div><strong>Ảnh bìa ngang</strong><small>Tỉ lệ 16:9 · tối thiểu 1920 × 1080 px</small></div>
      </figure>
      <figure class="photo-slot photo-slot-portrait">
        <span class="slot-index">02</span>
        <div><strong>Chân dung hai bạn</strong><small>Tỉ lệ 4:5 · tối thiểu 1200 × 1500 px</small></div>
      </figure>
      <figure class="photo-slot photo-slot-detail">
        <span class="slot-index">03</span>
        <div><strong>Ảnh chi tiết</strong><small>Tỉ lệ 1:1 · nhẫn, hoa hoặc thiệp</small></div>
      </figure>
      <figure class="photo-slot photo-slot-story">
        <span class="slot-index">04</span>
        <div><strong>Ảnh kể chuyện</strong><small>Tỉ lệ 3:2 · một khoảnh khắc tự nhiên</small></div>
      </figure>
    </div>
  </div>

  <div class="planning-placeholders" data-reveal>
    <article>
      <span>01</span>
      <p class="extras-kicker">Gia đình hai bên</p>
      <h3>Tên bố mẹ nhà trai và nhà gái</h3>
      <p>Đang chờ thông tin để hoàn thiện lời mời trang trọng.</p>
    </article>
    <article>
      <span>02</span>
      <p class="extras-kicker">Chuyện của chúng mình</p>
      <h3>Gặp gỡ · Cầu hôn · Ngày cưới</h3>
      <p>Thêm ba mốc ngắn và ảnh tương ứng nếu hai bạn muốn kể câu chuyện.</p>
    </article>
    <article>
      <span>03</span>
      <p class="extras-kicker">Lễ Vu Quy</p>
      <h3>Ngày giờ và địa điểm nhà gái</h3>
      <p>Đang chờ thông tin từ gia đình cô dâu để hoàn thiện.</p>
    </article>
    <article>
      <span>04</span>
      <p class="extras-kicker">Trang phục</p>
      <h3>Màu sắc và lưu ý trang phục</h3>
      <p>Đang chờ dress code hoặc bảng màu từ hai bạn.</p>
    </article>
  </div>

  <div class="ceremony-schedule" id="lich-trinh" data-reveal>
    <div class="schedule-heading">
      <p class="extras-kicker">Lịch trình ngày vui</p>
      <h2>Hai nghi lễ,<br />hai nhà cùng chung vui.</h2>
    </div>
    <div class="schedule-list">
      <article class="schedule-item is-pending">
        <span class="schedule-number">01</span>
        <div><p>Lễ Vu Quy</p><h3>Nhà gái</h3><small>Ngày giờ và địa điểm đang cập nhật</small></div>
      </article>
      <article class="schedule-item">
        <span class="schedule-number">02</span>
        <time datetime="2026-11-28T10:00:00+07:00">10:00 · 28.11.2026</time>
        <div><p>Lễ Thành Hôn</p><h3>Selena Palace</h3><small>Km 19 Quốc lộ 32, Đức Thượng, Hoài Đức, Hà Nội</small></div>
      </article>
      <article class="schedule-item is-pending">
        <span class="schedule-number">03</span>
        <div><p>Tiệc Chung Vui</p><h3>Cùng gia đình và bạn bè</h3><small>Thời gian đang cập nhật</small></div>
      </article>
    </div>
  </div>

  <div class="countdown-block" data-reveal>
    <p class="extras-kicker">Đếm ngược đến ngày vui</p>
    <div class="countdown" data-countdown aria-live="polite">
      <span><strong data-days>--</strong><small>Ngày</small></span>
      <span><strong data-hours>--</strong><small>Giờ</small></span>
      <span><strong data-minutes>--</strong><small>Phút</small></span>
      <span><strong data-seconds>--</strong><small>Giây</small></span>
    </div>
  </div>

  <div class="location-block" data-reveal>
    <div class="location-copy">
      <p class="extras-kicker">Địa điểm tổ chức</p>
      <h2>${venueName}</h2>
      <p>${venueAddress}</p>
      <div class="extras-actions">
        <a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener">Mở Google Maps</a>
        <button type="button" data-add-calendar>Thêm vào lịch</button>
      </div>
      <p class="venue-assumption">Địa chỉ đang dùng theo cơ sở Selena Palace tại Hoài Đức.</p>
    </div>
    <div class="map-frame is-collapsed" id="ban-do">
      <div class="map-placeholder">
        <span class="map-pin" aria-hidden="true"><i></i></span>
        <p class="extras-kicker">Chỉ đường</p>
        <h3>${venueName}</h3>
        <p>Bản đồ chỉ tải khi bạn chọn xem.</p>
        <button type="button" data-map-reveal>Xem bản đồ</button>
      </div>
      <iframe
        title="Bản đồ đến Selena Palace"
        data-src="https://www.google.com/maps?q=${mapQuery}&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        hidden
      ></iframe>
    </div>
  </div>

  <div class="guest-block">
    <form class="rsvp-card" data-rsvp-form data-reveal>
      <p class="extras-kicker">Xác nhận tham dự</p>
      <h2>Bạn sẽ đến chứ?</h2>
      <label>
        <span>Tên của bạn</span>
        <input name="guest-name" autocomplete="name" required placeholder="Nhập họ tên" />
      </label>
      <fieldset>
        <legend>Phản hồi</legend>
        <label><input type="radio" name="attendance" value="yes" required /> Mình sẽ đến</label>
        <label><input type="radio" name="attendance" value="no" /> Mình xin phép vắng</label>
      </fieldset>
      <label>
        <span>Lời nhắn</span>
        <textarea name="message" rows="3" placeholder="Gửi vài lời đến Huy và Phương"></textarea>
      </label>
      <button class="submit-rsvp" type="submit">Gửi xác nhận</button>
      <p class="form-status" data-form-status>Form đang ở chế độ xem trước, chưa lưu phản hồi.</p>
    </form>

    <section class="wishes-card" id="loi-chuc" data-reveal>
      <p class="extras-kicker">Sổ lời chúc</p>
      <h2>Gửi một lời đến hai đứa</h2>
      <form data-wish-form>
        <label class="wish-name-field">
          <span>Tên của bạn</span>
          <input name="wish-name" autocomplete="name" required placeholder="Nhập tên" />
        </label>
        <label class="anonymous-choice"><input type="checkbox" name="anonymous" /> Gửi ẩn danh</label>
        <label>
          <span>Lời chúc</span>
          <textarea name="wish-message" rows="4" required placeholder="Viết lời chúc cho Huy và Phương"></textarea>
        </label>
        <button class="submit-wish" type="submit">Gửi lời chúc</button>
        <p class="form-status" data-wish-status>Bản demo chỉ lưu lời chúc trên thiết bị này.</p>
      </form>
      <div class="wish-preview" aria-live="polite">
        <p class="wish-empty" data-wish-empty>Chưa có lời chúc nào trên thiết bị này.</p>
        <div class="wish-preview-list" data-wish-list></div>
      </div>
    </section>
  </div>

  <div class="gift-card" id="mung-cuoi" data-reveal>
    <div class="gift-heading">
      <p class="extras-kicker">Mừng cưới</p>
      <h2>Gửi chút yêu thương</h2>
      <p>Hai mã QR sẽ được thay bằng thông tin ngân hàng thật của cô dâu và chú rể.</p>
    </div>
    <div class="gift-accounts">
      <article class="gift-account-card">
        <p>Cô dâu</p><h3>Nguyễn Vũ Thu Phương</h3>
        <div class="qr-placeholder" role="img" aria-label="Vị trí mã QR ngân hàng của cô dâu sẽ cập nhật sau"><span>QR</span><small>Cô dâu</small></div>
        <p class="bank-placeholder">Ngân hàng · Số tài khoản</p>
      </article>
      <article class="gift-account-card">
        <p>Chú rể</p><h3>Lê Quốc Huy</h3>
        <div class="qr-placeholder" role="img" aria-label="Vị trí mã QR ngân hàng của chú rể sẽ cập nhật sau"><span>QR</span><small>Chú rể</small></div>
        <p class="bank-placeholder">Ngân hàng · Số tài khoản</p>
      </article>
    </div>
    <p class="gift-note">Thông tin chuyển khoản đang cập nhật.</p>
  </div>
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

