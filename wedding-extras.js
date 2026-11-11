const weddingDate = new Date("2026-11-28T11:30:00+07:00");
const bridePartyDate = new Date("2026-11-27T16:00:00+07:00");
const venueName = "Selena Palace";
const venueAddress = "Km 19 Quốc lộ 32, Đức Thượng, Hoài Đức, Hà Nội";
const groomMapUrl = "https://maps.app.goo.gl/c5R5mBZ5yW817m9x5";
const groomMapEmbed = "https://www.google.com/maps?q=21.0789056,105.6877443+(Selena+Palace)&z=16&output=embed";
const groomLocationQr = "qr-thiep-den-trang/qr-nha-hang.svg";

const brideVenueName = "Nhà văn hoá Tổ Dân Phố Mao Trung";
const brideVenueAddress = "Phường Phương Liễu - Thành Phố Bắc Ninh";
const brideMapUrl = "https://maps.app.goo.gl/y9gE7BGeSNUf4c8h6";
const brideMapEmbed = "https://www.google.com/maps?q=21.1521850,106.1438370&z=17&output=embed";
const brideLocationQr = "qr-thiep-den-trang/qr-nha-gai.svg";

// Dán URL Web App của Google Apps Script vào đây (xem README, mục "Nhận phản hồi vào Google Sheet").
// Để trống thì thiệp chạy chế độ xem trước: xác nhận không được gửi, lời chúc chỉ lưu trên máy khách.
const sheetEndpoint = "https://script.google.com/macros/s/AKfycbwUJnghXZGk-drfNuTzlkpcdvAqyPvL6bzMquEorKlwRJCmZC8VV-v9Wzgmq6z6nZOI/exec";

const extras = document.createElement("section");
extras.className = "wedding-extras";
extras.id = "tham-du";
extras.setAttribute("aria-label", "Thông tin và xác nhận tham dự");
extras.innerHTML = `
  <section class="x-section x-album" id="anh-cuoi" data-reveal>
    <header class="x-head">
      <h2>Album Ảnh</h2>
    </header>

    <div class="x-album-3d" data-album-3d>
      <div class="x-album-3d-stage" data-album-3d-stage>
        <button type="button" class="x-album-nav x-album-prev" data-album-prev aria-label="Ảnh trước">‹</button>
        <div class="x-album-3d-track" data-album-3d-track>
          <figure class="x-album-3d-card ph" data-3d-index="0" data-lightbox="images/son-mai.jpg" data-caption="Quốc Huy &amp; Thu Phương">
            <img src="images/son-mai.jpg" alt="Huy và Phương sánh đôi" />
          </figure>
          <figure class="x-album-3d-card ph" data-3d-index="1" data-lightbox="images/album-c.jpg" data-caption="Quốc Huy &amp; Thu Phương">
            <img src="images/album-c.jpg" alt="Huy và Phương nắm chặt tay nhau" loading="lazy" />
          </figure>
          <figure class="x-album-3d-card ph" data-3d-index="2" data-lightbox="images/album-b.jpg" data-caption="Quốc Huy &amp; Thu Phương">
            <img src="images/album-b.jpg" alt="Huy và Phương sánh bước bên nhau" loading="lazy" />
          </figure>
          <figure class="x-album-3d-card ph" data-3d-index="3" data-lightbox="images/album-f.jpg" data-caption="Quốc Huy &amp; Thu Phương">
            <img src="images/album-f.jpg" alt="Huy và Phương nghiêng đầu hạnh phúc" loading="lazy" />
          </figure>
          <figure class="x-album-3d-card ph" data-3d-index="4" data-lightbox="images/album-k.jpg" data-caption="Quốc Huy &amp; Thu Phương">
            <img src="images/album-k.jpg" alt="Phương khoác tay Huy bên thảm hoa" loading="lazy" />
          </figure>
          <figure class="x-album-3d-card ph" data-3d-index="5" data-lightbox="images/album-e.jpg" data-caption="Quốc Huy &amp; Thu Phương">
            <img src="images/album-e.jpg" alt="Huy và Phương trong trang phục cưới" loading="lazy" />
          </figure>
        </div>
        <button type="button" class="x-album-nav x-album-next" data-album-next aria-label="Ảnh tiếp theo">›</button>
      </div>
      <div class="x-album-3d-footer">
        <div class="x-album-dots" data-album-dots></div>
        <span class="x-album-counter" data-album-counter>1 / 6</span>
      </div>
    </div>
  </section>

  <section class="x-section x-story" data-reveal>
    <header class="x-head">
      <h2>Chuyện Tình Yêu</h2>
    </header>
    <ol class="x-story-list">
      <li>
        <figure class="ph" style="--ratio: 1" data-lightbox="images/story-1.jpg" data-caption="Lần đầu gặp gỡ"><img src="images/story-1.jpg" alt="Huy và Phương nhìn nhau" loading="lazy" /></figure>
        <div>
          <span class="x-story-when">Khởi duyên · Hà Nội</span>
          <h3>Lần đầu gặp gỡ</h3>
          <p>Hai con đường giao nhau trong một chiều thu Hà Nội.</p>
        </div>
      </li>
      <li>
        <figure class="ph" style="--ratio: 1" data-lightbox="images/story-2.jpg" data-caption="Lời cầu hôn"><img src="images/story-2.jpg" alt="Huy hôn tay Phương" loading="lazy" /></figure>
        <div>
          <span class="x-story-when">Hẹn ước</span>
          <h3>Lời cầu hôn</h3>
          <p>Một câu hỏi khẽ khàng, một cái gật đầu trọn vẹn.</p>
        </div>
      </li>
      <li>
        <figure class="ph" style="--ratio: 1" data-lightbox="images/story-3.jpg" data-caption="Về chung một nhà"><img src="images/story-3.jpg" alt="Huy vén khăn voan cho Phương" loading="lazy" /></figure>
        <div>
          <span class="x-story-when">28 · 11 · 2026</span>
          <h3>Về chung một nhà</h3>
          <p>Cùng nhau mở ra chương mới dưới một mái nhà.</p>
        </div>
      </li>
    </ol>
  </section>

  <section class="x-section x-countdown" data-reveal>
    <header class="x-head">
      <h2>Tháng 11 / 2026</h2>
    </header>
    <div class="x-calendar-sheet" data-cal-sheet aria-label="Lịch tháng 11 năm 2026">
      <div class="x-cal-header">
        <span class="x-cal-month">Tháng 11 · 2026</span>
        <span class="x-cal-lunar">19 &amp; 20 / 10 Bính Ngọ</span>
      </div>
      <div class="x-cal-grid" aria-hidden="true">
        <span class="x-cal-dow">T2</span><span class="x-cal-dow">T3</span><span class="x-cal-dow">T4</span><span class="x-cal-dow">T5</span><span class="x-cal-dow">T6</span><span class="x-cal-dow">T7</span><span class="x-cal-dow">CN</span>
        <span class="x-cal-day is-muted">26</span><span class="x-cal-day is-muted">27</span><span class="x-cal-day is-muted">28</span><span class="x-cal-day is-muted">29</span><span class="x-cal-day is-muted">30</span><span class="x-cal-day is-muted">31</span><span class="x-cal-day">1</span>
        <span class="x-cal-day">2</span><span class="x-cal-day">3</span><span class="x-cal-day">4</span><span class="x-cal-day">5</span><span class="x-cal-day">6</span><span class="x-cal-day">7</span><span class="x-cal-day">8</span>
        <span class="x-cal-day">9</span><span class="x-cal-day">10</span><span class="x-cal-day">11</span><span class="x-cal-day">12</span><span class="x-cal-day">13</span><span class="x-cal-day">14</span><span class="x-cal-day">15</span>
        <span class="x-cal-day">16</span><span class="x-cal-day">17</span><span class="x-cal-day">18</span><span class="x-cal-day">19</span><span class="x-cal-day">20</span><span class="x-cal-day">21</span><span class="x-cal-day">22</span>
        <span class="x-cal-day">23</span><span class="x-cal-day">24</span><span class="x-cal-day">25</span><span class="x-cal-day">26</span><span class="x-cal-day is-bride-party" title="Tiệc Nhà Gái · 16:00 Thứ Sáu 27/11/2026">27<small class="x-cal-sub">Nhà gái</small></span><span class="x-cal-day is-wedding" data-cal-day-28 title="Lễ Thành Hôn · 11:30 Thứ Bảy 28/11/2026">28<b class="x-cal-seal-mark">囍<br/>28·11</b></span><span class="x-cal-day">29</span>
        <span class="x-cal-day">30</span><span class="x-cal-day is-muted">1</span><span class="x-cal-day is-muted">2</span><span class="x-cal-day is-muted">3</span><span class="x-cal-day is-muted">4</span><span class="x-cal-day is-muted">5</span><span class="x-cal-day is-muted">6</span>
      </div>
      <div class="x-cal-footer">
        <a
          class="x-cal-gcal-link"
          href="https://www.google.com/calendar/render?action=TEMPLATE&text=%C4%90%C3%A1m%20c%C6%B0%E1%BB%9Bi%20L%C3%AA%20Qu%E1%BB%91c%20Huy%20%26%20Nguy%E1%BB%85n%20V%C5%A9%20Thu%20Ph%C6%B0%C6%A1ng&dates=20261128T043000Z/20261128T070000Z&ctz=Asia/Ho_Chi_Minh&details=Tiec%20Nha%20Gai%3A%2016h00%20Thu%206%2027%2F11%2F2026%20tai%20Nha%20van%20hoa%20To%20Dan%20Pho%20Mao%20Trung%20(Phuong%20Phuong%20Lieu%20-%20TP.%20Bac%20Ninh).%20Le%20Thanh%20Hon%20%26%20Khai%20Tiec%3A%2011h30%20Thu%207%2028%2F11%2F2026%20tai%20Selena%20Palace%2C%20Ha%20Noi.&location=Selena%20Palace%2C%20Km%2019%20Qu%E1%BB%91c%20l%E1%BB%99%2032%2C%20%C4%90%E1%BB%A9c%20Th%C6%B0%E1%BB%A3ng%2C%20Ho%C3%A0i%20%C4%90%E1%BB%A9c%2C%20H%C3%A0%20N%E1%BB%99i"
          target="_blank"
          rel="noopener noreferrer"
        >+ Thêm vào Google Calendar</a>
      </div>
    </div>
    <div class="countdown" data-countdown>
      <span><strong data-days>--</strong><small>Ngày</small></span>
      <span><strong data-hours>--</strong><small>Giờ</small></span>
      <span><strong data-minutes>--</strong><small>Phút</small></span>
      <span><strong data-seconds>--</strong><small>Giây</small></span>
    </div>
  </section>

  <section class="x-section x-location" id="dia-diem" data-reveal>
    <header class="x-head">
      <h2>Địa Điểm Tổ Chức</h2>
    </header>

    <div class="x-venue-cards" role="tablist" aria-label="Chọn địa điểm">
      <button
        type="button"
        class="x-venue-card is-active"
        data-venue-switch="bride"
        role="tab"
        aria-selected="true"
      >
        <span class="x-venue-badge">Tiệc Nhà Gái</span>
        <strong>${brideVenueName}</strong>
        <span class="x-venue-time">16:00 · 27/11</span>
      </button>

      <button
        type="button"
        class="x-venue-card"
        data-venue-switch="groom"
        role="tab"
        aria-selected="false"
      >
        <span class="x-venue-badge">Lễ Thành Hôn</span>
        <strong>${venueName}</strong>
        <span class="x-venue-time">11:30 · 28/11</span>
      </button>
    </div>

    <div class="x-location-qr-card">
      <div class="x-location-qr-frame">
        <img
          data-venue-qr-img
          src="${brideLocationQr}"
          alt="Mã QR chỉ đường đến ${brideVenueName}"
          loading="lazy"
        />
      </div>
      <div class="x-location-qr-info">
        <span class="x-location-qr-kicker" data-venue-qr-badge>QR Chỉ Đường · Nhà Gái</span>
        <strong data-venue-qr-label>${brideVenueName}</strong>
        <div class="x-location-qr-links">
          <a class="x-location-qr-dl" data-venue-qr-dl href="qr-thiep-den-trang/qr-nha-gai.png" download="QR-Chi-Duong-Nha-Gai-Mao-Trung.png"><svg class="x-ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v8m-3.5-3.5L8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Lưu QR</a>
        </div>
      </div>
    </div>

    <div class="map-frame is-collapsed" id="ban-do">
      <div class="map-placeholder">
        <span class="map-pin" aria-hidden="true"></span>
        <p data-map-hint>Bản đồ Google Maps</p>
        <button type="button" data-map-reveal>Xem bản đồ</button>
      </div>
      <iframe
        title="Bản đồ đến ${brideVenueName}"
        data-src="${brideMapEmbed}"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        hidden
      ></iframe>
    </div>
    <div class="x-actions">
      <a class="x-btn is-solid" data-venue-dir href="${brideMapUrl}" target="_blank" rel="noopener">Chỉ đường Google Maps</a>
    </div>
  </section>

  <section class="x-section x-rsvp" data-reveal>
    <header class="x-head">
      <h2>Xác Nhận Tham Dự</h2>
    </header>
    <form class="x-form" data-rsvp-form>
      <label class="x-field">
        <span>Tên của bạn *</span>
        <input name="guest-name" autocomplete="name" required placeholder="Nhập họ và tên của bạn" />
      </label>
      <fieldset class="x-choice">
        <legend>Tham dự</legend>
        <label><input type="radio" name="attendance" value="yes" required checked /><span>♥ Sẽ tham dự</span></label>
        <label><input type="radio" name="attendance" value="no" /><span>Xin vắng mặt</span></label>
      </fieldset>
      <label class="x-field" data-attend-only>
        <span>Buổi tiệc tham dự</span>
        <select name="event-side">
          <option value="Tiệc Cưới Nhà Gái (16:00 · 27/11 tại Nhà văn hoá Tổ Dân Phố Mao Trung, Bắc Ninh)">Tiệc Nhà Gái · Thứ Sáu 27/11</option>
          <option value="Lễ Thành Hôn (11:30 · 28/11 tại Selena Palace, Hà Nội)">Lễ Thành Hôn · Thứ Bảy 28/11</option>
          <option value="Tham dự cả hai ngày (27/11 & 28/11)">Cả hai ngày 27 &amp; 28/11</option>
        </select>
      </label>
      <label class="x-field" data-attend-only>
        <span>Số khách</span>
        <select name="guests">
          <option value="1">1 người</option>
          <option value="2">2 người</option>
          <option value="3">3 người</option>
          <option value="4">4 người</option>
          <option value="5">Gia đình / Nhóm</option>
        </select>
      </label>
      <input class="x-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
      <button class="x-btn is-solid" type="submit">Gửi xác nhận</button>
      <p class="form-status" data-form-status role="status"></p>
    </form>
  </section>

  <section class="x-section x-wishes" id="loi-chuc" data-reveal>
    <header class="x-head">
      <h2>Sổ Lưu Bút</h2>
    </header>
    <form class="x-form" data-wish-form>
      <label class="x-field">
        <input name="wish-name" autocomplete="name" placeholder="Nhập tên của bạn (để trống nếu ẩn danh)" aria-label="Tên người gửi (không bắt buộc)" />
      </label>
      <div class="x-field">
        <div class="x-wish-chips" role="group" aria-label="Lời chúc gợi ý">
          <button type="button" class="x-wish-chip" data-wish-suggest="Chúc Huy và Phương trăm năm tình viên mãn, bạc đầu nghĩa phu thê! 囍">Trăm năm viên mãn 囍</button>
          <button type="button" class="x-wish-chip" data-wish-suggest="Chúc hai bạn mãi thương nhau nồng ấm như ngày đầu tiên! ♥">Mãi thương như ngày đầu ♥</button>
          <button type="button" class="x-wish-chip" data-wish-suggest="Tân hôn hạnh phúc, sớm đón thiên thần nhỏ đáng yêu nhé!">Tân hôn hạnh phúc ✿</button>
        </div>
        <textarea name="wish-message" rows="3" required maxlength="500" placeholder="Nhập lời chúc *" aria-label="Lời chúc"></textarea>
      </div>
      <input class="x-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
      <button class="x-btn is-solid" type="submit">Gửi lời chúc</button>
      <p class="form-status" data-wish-status role="status"></p>
    </form>
    <div class="wish-preview" aria-live="polite">
      <p class="wish-empty" data-wish-empty></p>
      <div class="wish-preview-list" data-wish-list></div>
    </div>
  </section>

  <section class="x-section x-gift" id="mung-cuoi" data-reveal>
    <header class="x-head">
      <h2>Hộp Quà Mừng</h2>
    </header>
    <div class="x-gift-envelope-art" aria-hidden="true">
      <i class="x-sparkle s1">✦</i>
      <i class="x-sparkle s2">✦</i>
      <i class="x-sparkle s3">✦</i>
      <i class="x-sparkle s4">✦</i>
      <div class="x-env-pair">
        <div class="x-env-card is-back"><span>囍</span></div>
        <div class="x-env-card is-front">
          <small>Hỷ Sự</small>
          <span>囍</span>
          <b>28 · 11</b>
        </div>
      </div>
    </div>
    <fieldset class="x-choice x-gift-pick">
      <legend>Người nhận</legend>
      <label><input type="radio" name="gift-to" value="groom" checked /><span>Mừng Chú Rể</span></label>
      <label><input type="radio" name="gift-to" value="bride" /><span>Mừng Cô Dâu</span></label>
    </fieldset>
    <div class="x-gift-grid">
      <article data-gift="groom">
        <span class="x-gift-seal" aria-hidden="true">囍</span>
        <p class="x-label">Chú rể</p>
        <h3>Lê Quốc Huy</h3>
        <img class="qr-code" src="images/qr_chong-code.png" alt="Mã QR chuyển khoản MBBank cho chú rể Lê Quốc Huy" loading="lazy" />
        <p class="x-gift-bank">MBBank · STK: <strong>1430180506534</strong></p>
        <div class="x-gift-btn-row">
          <button type="button" class="x-copy-stk" data-copy-stk="1430180506534">Sao chép STK</button>
          <a class="x-save-qr" href="images/qr_chong-code.png" download="QR-ChuRe-LeQuocHuy.png"><svg class="x-ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v8m-3.5-3.5L8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Lưu QR</a>
        </div>
      </article>
      <article data-gift="bride">
        <span class="x-gift-seal" aria-hidden="true">囍</span>
        <p class="x-label">Cô dâu</p>
        <h3>Nguyễn Vũ Thu Phương</h3>
        <img class="qr-code" src="images/qr_vo-code.png" alt="Mã QR chuyển khoản ACB cho cô dâu Nguyễn Vũ Thu Phương" loading="lazy" />
        <p class="x-gift-bank">ACB · STK: <strong>9043737</strong></p>
        <div class="x-gift-btn-row">
          <button type="button" class="x-copy-stk" data-copy-stk="9043737">Sao chép STK</button>
          <a class="x-save-qr" href="images/qr_vo-code.png" download="QR-CoDau-NguyenVuThuPhuong.png"><svg class="x-ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v8m-3.5-3.5L8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Lưu QR</a>
        </div>
      </article>
    </div>
  </section>
`;

const main = document.querySelector("main");
const footer = main?.querySelector(":scope > footer");
if (footer) main.insertBefore(extras, footer);
else main?.append(extras);

if (window.location.hash) {
  const anchorTarget = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  if (anchorTarget) window.requestAnimationFrame(() => anchorTarget.scrollIntoView());
}

const extraRevealItems = extras.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const extraObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      extraObserver.unobserve(entry.target);
    }),
    { threshold: 0.1 },
  );
  extraRevealItems.forEach((item) => extraObserver.observe(item));
} else {
  extraRevealItems.forEach((item) => item.classList.add("is-visible"));
}

// Album ảnh Lật 3D Coverflow + chuyển đổi Dạng lưới (lấy cảm hứng từ chungdoi.com)
const albumSec = extras.querySelector(".x-album");
const album3dWrap = extras.querySelector("[data-album-3d]");
const albumGridWrap = extras.querySelector("[data-album-grid]");
const albumCards = [...extras.querySelectorAll(".x-album-3d-card")];
const albumDotsWrap = extras.querySelector("[data-album-dots]");
const albumCounter = extras.querySelector("[data-album-counter]");
let activeAlbumIdx = 0;

if (albumCards.length && albumDotsWrap) {
  albumCards.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "x-album-dot";
    dot.setAttribute("aria-label", `Xem ảnh ${idx + 1}`);
    dot.addEventListener("click", () => updateAlbum3D(idx));
    albumDotsWrap.append(dot);
  });
}

function updateAlbum3D(targetIdx) {
  const total = albumCards.length;
  if (!total) return;
  activeAlbumIdx = (targetIdx + total) % total;

  albumCards.forEach((card, i) => {
    let diff = i - activeAlbumIdx;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const abs = Math.abs(diff);
    const clampedDiff = Math.max(-2, Math.min(2, diff));
    const clampedAbs = Math.abs(clampedDiff);
    const tx = clampedDiff * 50;
    const tz = -clampedAbs * 125;
    const ry = clampedDiff * 34;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.72;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.78 : abs === 2 ? 0.36 : 0;
    const zIndex = 20 - Math.min(abs, 10);

    // Ảnh ở giữa không dùng transform 3D để trình duyệt vẽ nét như ảnh thường
    card.style.transform = abs === 0 ? "none" : `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
    card.style.opacity = String(opacity);
    card.style.zIndex = String(zIndex);
    card.style.pointerEvents = abs <= 2 ? "auto" : "none";
    card.classList.toggle("is-center", diff === 0);
  });

  if (albumCounter) {
    albumCounter.textContent = `${activeAlbumIdx + 1} / ${total}`;
  }
  const dots = albumDotsWrap ? [...albumDotsWrap.children] : [];
  dots.forEach((d, idx) => d.classList.toggle("is-active", idx === activeAlbumIdx));
}

updateAlbum3D(0);

extras.querySelector("[data-album-prev]")?.addEventListener("click", () => updateAlbum3D(activeAlbumIdx - 1));
extras.querySelector("[data-album-next]")?.addEventListener("click", () => updateAlbum3D(activeAlbumIdx + 1));

// Vuốt trái/phải trên sân khấu 3D
const stage3D = extras.querySelector("[data-album-3d-stage]");
let touchStartX = 0;
stage3D?.addEventListener("pointerdown", (e) => {
  touchStartX = e.clientX;
});
stage3D?.addEventListener("pointerup", (e) => {
  const dx = e.clientX - touchStartX;
  if (Math.abs(dx) > 36) {
    updateAlbum3D(dx < 0 ? activeAlbumIdx + 1 : activeAlbumIdx - 1);
  }
});

// Chuyển đổi Lật 3D <-> Dạng lưới
extras.querySelectorAll("[data-album-view]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const mode = tab.dataset.albumView;
    if (albumSec) albumSec.dataset.albumMode = mode;
    extras.querySelectorAll("[data-album-view]").forEach((t) => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (album3dWrap && albumGridWrap) {
      album3dWrap.hidden = mode !== "3d";
      albumGridWrap.hidden = mode !== "grid";
    }
  });
});

// Tương tác đóng ấn triện đỏ đô lên ngày 28/11 trên tờ lịch
const calSheet = extras.querySelector("[data-cal-sheet]");
const calStampBtn = extras.querySelector("[data-cal-stamp-trigger]");
const calDay28 = extras.querySelector("[data-cal-day-28]");
const calStampLabel = extras.querySelector("[data-cal-stamp-label]");

function triggerCalendarStamp() {
  if (!calSheet) return;
  calSheet.classList.remove("is-stamped", "is-jolting");
  void calSheet.offsetWidth;
  calSheet.classList.add("is-stamped", "is-jolting");
  if (calStampLabel) {
    calStampLabel.textContent = "Đã đóng ấn hẹn ngày 28.11.2026 · Chạm đóng lại";
  }
}

calStampBtn?.addEventListener("click", triggerCalendarStamp);
calDay28?.addEventListener("click", triggerCalendarStamp);

// Đếm ngược thời gian thực
function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();
  if (remaining <= 0) {
    const countdown = document.querySelector("[data-countdown]");
    const message = remaining > -86400000 ? "Hôm nay là ngày đại hỷ!" : "Cảm ơn bạn đã cùng chung vui!";
    if (countdown) countdown.innerHTML = `<p class="wedding-day-message">${message}</p>`;
    return false;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const dEl = document.querySelector("[data-days]");
  const hEl = document.querySelector("[data-hours]");
  const mEl = document.querySelector("[data-minutes]");
  const sEl = document.querySelector("[data-seconds]");
  if (dEl) dEl.textContent = String(days).padStart(2, "0");
  if (hEl) hEl.textContent = String(hours).padStart(2, "0");
  if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
  if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
  return true;
}

updateCountdown();
const countdownTimer = window.setInterval(() => {
  if (!updateCountdown()) window.clearInterval(countdownTimer);
}, 1000);

// Chuyển đổi địa điểm Nhà Trai / Nhà Gái trên bản đồ & Mã QR Chỉ Đường
const venueConfig = {
  groom: {
    heading: venueName,
    address: `${venueAddress} · 11:30 Thứ Bảy, 28/11/2026`,
    mapSrc: groomMapEmbed,
    dirHref: groomMapUrl,
    dirLabel: "Chỉ đường Google Maps",
    qrImg: groomLocationQr,
    qrPng: "qr-thiep-den-trang/qr-nha-hang.png",
    qrDownloadName: "QR-Chi-Duong-Selena-Palace.png",
    qrBadge: "QR Chỉ Đường · Nhà Hàng",
    qrLabel: venueName,
  },
  bride: {
    heading: brideVenueName,
    address: `${brideVenueAddress} · 16:00 Thứ Sáu, 27/11/2026`,
    mapSrc: brideMapEmbed,
    dirHref: brideMapUrl,
    dirLabel: "Chỉ đường Google Maps",
    qrImg: brideLocationQr,
    qrPng: "qr-thiep-den-trang/qr-nha-gai.png",
    qrDownloadName: "QR-Chi-Duong-Nha-Gai-Mao-Trung.png",
    qrBadge: "QR Chỉ Đường · Nhà Gái",
    qrLabel: brideVenueName,
  },
};

document.querySelectorAll("[data-venue-switch]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.venueSwitch;
    const info = venueConfig[key];
    if (!info) return;
    document.querySelectorAll("[data-venue-switch]").forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
    });
    const headingEl = document.querySelector("[data-venue-heading]");
    const addressEl = document.querySelector("[data-venue-address]");
    const dirEl = document.querySelector("[data-venue-dir]");
    const qrImgEl = document.querySelector("[data-venue-qr-img]");
    const qrBadgeEl = document.querySelector("[data-venue-qr-badge]");
    const qrLabelEl = document.querySelector("[data-venue-qr-label]");
    const qrDlEl = document.querySelector("[data-venue-qr-dl]");
    const mapFrame = document.querySelector(".map-frame");
    const map = mapFrame?.querySelector("iframe");
    if (headingEl) headingEl.textContent = info.heading;
    if (addressEl) addressEl.textContent = info.address;
    if (dirEl) {
      dirEl.href = info.dirHref;
      dirEl.textContent = info.dirLabel;
    }
    if (qrImgEl) {
      qrImgEl.src = info.qrImg;
      qrImgEl.alt = `Mã QR chỉ đường Google Maps đến ${info.heading}`;
    }
    if (qrBadgeEl) qrBadgeEl.textContent = info.qrBadge;
    if (qrLabelEl) qrLabelEl.textContent = info.qrLabel;
    if (qrDlEl) {
      qrDlEl.href = info.qrPng;
      qrDlEl.setAttribute("download", info.qrDownloadName);
    }
    if (map) {
      map.dataset.src = info.mapSrc;
      if (!map.hidden) {
        map.src = info.mapSrc;
      }
    }
  });
});

// Mở bản đồ nhúng
document.querySelector("[data-map-reveal]")?.addEventListener("click", () => {
  const mapFrame = document.querySelector(".map-frame");
  const map = mapFrame?.querySelector("iframe");
  if (map && (!map.src || map.src !== map.dataset.src)) map.src = map.dataset.src;
  if (map) map.hidden = false;
  mapFrame?.classList.remove("is-collapsed");
  mapFrame?.classList.add("is-open");
});

// Sao chép số tài khoản mừng cưới
document.querySelectorAll("[data-copy-stk]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const stk = btn.dataset.copyStk;
    const original = btn.textContent;
    try {
      await navigator.clipboard.writeText(stk);
      btn.textContent = "✓ Đã sao chép STK";
    } catch {
      btn.textContent = `STK: ${stk}`;
    }
    window.setTimeout(() => {
      btn.textContent = original;
    }, 2400);
  });
});

// Lightbox xem ảnh lớn cho tất cả các ảnh có [data-lightbox] trên trang (có dải thumbnail bên dưới kiểu chungdoi.com)
const lightbox = document.createElement("div");
lightbox.className = "wedding-lightbox";
lightbox.hidden = true;
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Xem ảnh phóng to");
lightbox.innerHTML = `
  <div class="lb-top">
    <span data-lb-count>1 / 1</span>
    <button type="button" class="lb-close" data-lb-close aria-label="Đóng ảnh">✕</button>
  </div>
  <div class="lb-stage">
    <button type="button" class="lb-nav lb-prev" data-lb-prev aria-label="Ảnh trước">‹</button>
    <img data-lb-img src="" alt="" />
    <button type="button" class="lb-nav lb-next" data-lb-next aria-label="Ảnh tiếp theo">›</button>
  </div>
  <p class="lb-caption" data-lb-caption></p>
  <div class="lb-thumbs" data-lb-thumbs role="tablist" aria-label="Danh sách ảnh thu nhỏ"></div>
`;
document.body.append(lightbox);

let lbItems = [];
let lbIndex = 0;
const lbImg = lightbox.querySelector("[data-lb-img]");
const lbCaption = lightbox.querySelector("[data-lb-caption]");
const lbCount = lightbox.querySelector("[data-lb-count]");
const lbThumbs = lightbox.querySelector("[data-lb-thumbs]");

function collectVisibleLightboxItems() {
  const seen = new Set();
  const list = [];
  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    if (el.closest("[hidden]")) return;
    const src = el.dataset.lightbox || el.querySelector("img")?.src;
    if (!src || seen.has(src)) return;
    seen.add(src);
    list.push(el);
  });
  return list;
}

function renderLightboxThumbs() {
  if (!lbThumbs) return;
  lbThumbs.replaceChildren();
  lbItems.forEach((item, idx) => {
    const src = item.dataset.lightbox || item.querySelector("img")?.src;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `lb-thumb${idx === lbIndex ? " is-active" : ""}`;
    btn.setAttribute("aria-label", `Ảnh ${idx + 1}`);
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    btn.append(img);
    btn.addEventListener("click", () => showLightboxAt(idx));
    lbThumbs.append(btn);
  });
}

function showLightboxAt(index) {
  lbItems = collectVisibleLightboxItems();
  if (!lbItems.length) return;
  lbIndex = (index + lbItems.length) % lbItems.length;
  const item = lbItems[lbIndex];
  const src = item.dataset.lightbox || item.querySelector("img")?.src;
  const alt = item.querySelector("img")?.alt || "Ảnh cưới Huy và Phương";
  const cap = item.dataset.caption || alt;
  lbImg.src = src;
  lbImg.alt = alt;
  lbCaption.textContent = cap;
  lbCount.textContent = `${lbIndex + 1} / ${lbItems.length}`;
  renderLightboxThumbs();
  lightbox.hidden = false;
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-lightbox]");
  if (!trigger) return;
  if (trigger.classList.contains("x-album-3d-card") && !trigger.classList.contains("is-center")) {
    const idx3d = Number(trigger.getAttribute("data-3d-index") ?? albumCards.indexOf(trigger));
    if (!Number.isNaN(idx3d)) updateAlbum3D(idx3d);
    return;
  }
  lbItems = collectVisibleLightboxItems();
  const targetSrc = trigger.dataset.lightbox || trigger.querySelector("img")?.src;
  const idx = lbItems.findIndex((item) => (item.dataset.lightbox || item.querySelector("img")?.src) === targetSrc);
  showLightboxAt(idx >= 0 ? idx : 0);
});

lightbox.querySelector("[data-lb-close]")?.addEventListener("click", () => { lightbox.hidden = true; });
lightbox.querySelector("[data-lb-prev]")?.addEventListener("click", () => showLightboxAt(lbIndex - 1));
lightbox.querySelector("[data-lb-next]")?.addEventListener("click", () => showLightboxAt(lbIndex + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.classList.contains("lb-stage")) {
    lightbox.hidden = true;
  }
});
document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") lightbox.hidden = true;
  if (event.key === "ArrowLeft") showLightboxAt(lbIndex - 1);
  if (event.key === "ArrowRight") showLightboxAt(lbIndex + 1);
});

// Gửi dạng text/plain để trình duyệt không cần hỏi trước (preflight), Apps Script vẫn đọc được JSON.
async function sendToSheet(payload) {
  const response = await fetch(sheetEndpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "send-failed");
}

const rsvpForm = document.querySelector("[data-rsvp-form]");
// Chọn "Xin vắng mặt" thì ẩn & bỏ qua ô buổi tiệc / số khách
function syncAttendFields() {
  if (!rsvpForm) return;
  const absent = rsvpForm.elements.namedItem("attendance")?.value === "no";
  rsvpForm.querySelectorAll("[data-attend-only]").forEach((field) => {
    field.hidden = absent;
    field.querySelectorAll("select, input").forEach((control) => { control.disabled = absent; });
  });
}
rsvpForm?.addEventListener("change", (event) => {
  if (event.target.name === "attendance") syncAttendFields();
});
rsvpForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.querySelector("[data-form-status]");
  if (!sheetEndpoint) {
    status.textContent = "Đã kiểm tra biểu mẫu. Đây vẫn là bản xem trước nên phản hồi chưa được lưu.";
    return;
  }
  const formData = new FormData(rsvpForm);
  const button = rsvpForm.querySelector("button[type=submit]");
  button.disabled = true;
  status.textContent = "Đang gửi xác nhận…";
  try {
    const eventSide = formData.get("event-side") || "";
    const rawMsg = (formData.get("message") || "").toString().trim();
    const guestName = (formData.get("guest-name") || "").toString().trim();
    if (!guestName) {
      status.textContent = "Vui lòng nhập tên của bạn để cô dâu chú rể tiện sắp xếp tiếp đón nhé.";
      button.disabled = false;
      return;
    }
    const combinedMessage = eventSide
      ? rawMsg ? `[${eventSide}] ${rawMsg}` : `[${eventSide}]`
      : rawMsg;
    await sendToSheet({
      type: "rsvp",
      name: guestName,
      attendance: formData.get("attendance"),
      guests: formData.get("guests"),
      message: combinedMessage,
      website: formData.get("website"),
    });
    rsvpForm.reset();
    syncAttendFields();
    status.textContent = "Cảm ơn bạn! Huy và Phương đã nhận được phản hồi.";
  } catch {
    status.textContent = "Chưa gửi được. Bạn kiểm tra mạng rồi thử lại nhé.";
  } finally {
    button.disabled = false;
  }
});

const wishForm = document.querySelector("[data-wish-form]");
const wishNameInput = wishForm?.elements.namedItem("wish-name");
const wishMessageInput = wishForm?.elements.namedItem("wish-message");
const anonymousInput = wishForm?.elements.namedItem("anonymous");
const wishList = document.querySelector("[data-wish-list]");
const wishEmpty = document.querySelector("[data-wish-empty]");
const wishStorageKey = "huy-phuong-preview-wishes";

// Gợi ý lời chúc nhanh + Đũa thần đổi lời chúc ngẫu nhiên (tham khảo chungdoi.com)
const magicWishes = [
  "Chúc Quốc Huy và Thu Phương trăm năm tình viên mãn, bạc đầu nghĩa phu thê! 囍",
  "Chúc hai bạn luôn nắm chặt tay nhau đi qua mọi mùa nắng mưa, tổ ấm nhỏ lúc nào cũng ngập tràn tiếng cười! ♥",
  "Mừng ngày vui của hai gia đình! Chúc đôi trẻ sớm đón thiên thần nhỏ đáng yêu nhé! ✿",
  "Nhìn thiệp là thấy ngập tràn hạnh phúc rồi. Chúc hai bạn một khởi đầu hôn nhân thật rực rỡ và bình an! ✦",
  "Chúc cô dâu chú rể mãi giữ được ánh mắt nồng ấm như ngày đầu tiên gặp gỡ giữa mùa thu Hà Nội!",
  "Hạnh phúc là biết đủ bên nhau mỗi ngày. Chúc Huy & Phương trọn đời êm ấm, vạn sự cát tường! 囍",
  "Chúc mừng tân lang Quốc Huy & tân nương Thu Phương! Trăm năm hòa hợp, sắt cầm hảo hợp!",
  "Chúc đám cưới của hai bạn thật trọn vẹn, ấm cúng và mở ra chương mới rực rỡ nhất cuộc đời!",
];
let magicWishIdx = 0;

document.querySelectorAll("[data-wish-suggest]").forEach((chip) => {
  chip.addEventListener("click", () => {
    if (!wishMessageInput) return;
    wishMessageInput.value = chip.dataset.wishSuggest;
    wishMessageInput.focus();
  });
});

document.querySelector("[data-wish-wand]")?.addEventListener("click", (e) => {
  if (!wishMessageInput) return;
  const btn = e.currentTarget;
  btn.classList.remove("is-sparkling");
  void btn.offsetWidth;
  btn.classList.add("is-sparkling");
  wishMessageInput.value = magicWishes[magicWishIdx % magicWishes.length];
  magicWishIdx += 1;
  wishMessageInput.focus();
});

// Nếu máy chặn localStorage, lời chúc vẫn hiện trong lần xem này.
let unsavedWishes = [];

function readPreviewWishes() {
  if (unsavedWishes.length) return unsavedWishes;
  try {
    return JSON.parse(window.localStorage.getItem(wishStorageKey) || "[]");
  } catch {
    return unsavedWishes;
  }
}

// wishes: mới nhất đứng trước.
function renderWishes(wishes) {
  wishList.replaceChildren();
  wishEmpty.hidden = wishes.length > 0;
  wishes.forEach((wish) => {
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
  wishNameInput.placeholder = anonymousInput.checked ? "Sẽ hiển thị là Ẩn danh" : "Nhập tên của bạn";
});

function renderPreviewWishes() {
  renderWishes(readPreviewWishes().slice(-6).reverse());
}

function showWishBubble() {
  const bubble = document.createElement("div");
  bubble.className = "wish-bubble";
  bubble.setAttribute("role", "status");
  bubble.innerHTML = "<span>囍</span><strong>Lời chúc phúc của bạn đã được ghi lại</strong>";
  document.body.append(bubble);
  window.setTimeout(() => bubble.remove(), 3600);
}

function resetWishForm() {
  wishForm.reset();
  if (wishNameInput) {
    wishNameInput.disabled = false;
    wishNameInput.required = false;
    wishNameInput.placeholder = "Nhập tên của bạn (để trống nếu ẩn danh)";
  }
}

async function loadApprovedWishes() {
  try {
    const response = await fetch(`${sheetEndpoint}?action=wishes`);
    const result = await response.json();
    if (result.ok) renderWishes(result.wishes);
  } catch {
    // Không tải được thì giữ dòng "Chưa có lời chúc nào".
  }
}

wishForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(wishForm);
  const senderName = formData.get("anonymous")
    ? "Ẩn danh"
    : String(formData.get("wish-name") || "").trim() || "Ẩn danh";
  if (sheetEndpoint) {
    const status = document.querySelector("[data-wish-status]");
    const button = wishForm.querySelector("button[type=submit]");
    button.disabled = true;
    status.textContent = "Đang gửi lời chúc…";
    try {
      await sendToSheet({
        type: "wish",
        name: senderName,
        message: formData.get("wish-message"),
        website: formData.get("website"),
      });
      resetWishForm();
      status.textContent = "Cảm ơn bạn! Lời chúc sẽ hiện ở đây sau khi Huy và Phương đọc.";
      showWishBubble();
    } catch {
      status.textContent = "Chưa gửi được. Bạn kiểm tra mạng rồi thử lại nhé.";
    } finally {
      button.disabled = false;
    }
    return;
  }

  const wishes = readPreviewWishes();
  wishes.push({
    name: senderName,
    message: String(formData.get("wish-message")).trim(),
  });
  let saved = true;
  try {
    window.localStorage.setItem(wishStorageKey, JSON.stringify(wishes));
  } catch {
    saved = false;
    unsavedWishes = wishes;
  }
  resetWishForm();
  document.querySelector("[data-wish-status]").textContent = saved
    ? "Đã thêm vào bản xem thử trên thiết bị này. Lời chúc chưa được gửi lên máy chủ."
    : "Máy này không cho lưu, lời chúc chỉ hiện trong lần xem này.";
  renderPreviewWishes();
  showWishBubble();
});

if (sheetEndpoint) loadApprovedWishes();
else renderPreviewWishes();
