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
      <p class="extras-kicker">Lịch trình</p>
      <h3>Đón khách · Làm lễ · Dùng tiệc</h3>
      <p>Giờ bắt đầu đã có. Giờ đón khách và dùng tiệc đang để trống.</p>
    </article>
    <article>
      <span>04</span>
      <p class="extras-kicker">Trang phục</p>
      <h3>Màu sắc và lưu ý trang phục</h3>
      <p>Đang chờ dress code hoặc bảng màu từ hai bạn.</p>
    </article>
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
    <div class="map-frame">
      <iframe
        title="Bản đồ đến Selena Palace"
        src="https://www.google.com/maps?q=${mapQuery}&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
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

    <div class="gift-card" id="mung-cuoi" data-reveal>
      <p class="extras-kicker">Mừng cưới</p>
      <h2>Gửi chút yêu thương</h2>
      <div class="qr-placeholder" role="img" aria-label="Vị trí mã QR ngân hàng sẽ cập nhật sau">
        <span>QR</span>
        <small>Đang cập nhật</small>
      </div>
      <p class="bank-placeholder">Ngân hàng · Số tài khoản · Chủ tài khoản</p>
      <p class="gift-note">Mã QR thật sẽ được thêm khi có thông tin ngân hàng.</p>
    </div>
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

document.querySelector("[data-rsvp-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("[data-form-status]").textContent =
    "Đã kiểm tra biểu mẫu. Đây vẫn là bản xem trước nên phản hồi chưa được lưu.";
});

