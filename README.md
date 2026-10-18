# Demo thiệp cưới Huy & Phương

Năm mẫu độc lập, cùng tông đỏ, thiết kế ưu tiên điện thoại (trên máy tính thiệp
hiển thị thành một cột giữa nền trang trí):

- `index.html` · **01 Son Mài**: đỏ son, vàng kim, chữ Song Hỷ, mở bằng hai cánh cửa son
- `editorial.html` · **02 Thư Tay**: giấy kem, mực đỏ son, chữ in lớn, mục đánh số như một bức thư
- `keepsake.html` · **03 Hồng Nhung**: hồng phấn, đỏ nhung, cúc họa mi, lịch tháng 11
- `photo-editorial.html` · **04 Tơ Duyên**: sợi tơ hồng vẽ dần theo khi cuộn, thẻ cào để xem ngày cưới
- `wine-rustic.html` · **05 Chuyện Hai Ta**: sách tranh cắt giấy, năm chương chuyện tình chuyển cảnh theo khi cuộn

Cấu trúc:

- `demo-common.css` / `demo-common.js`: khung trang, thanh chọn mẫu, nhạc, màn mở thiệp
- `wedding-extras.css` / `wedding-extras.js`: các phần chung (gia đình, chuyện tình,
  album, lịch trình, đếm ngược, bản đồ, xác nhận tham dự, lời chúc, mừng cưới)
- `themes/*.css`: màu, font và bố cục riêng của từng mẫu; `themes/*.js` cho phần tương tác riêng của mẫu 04 và 05
- `apps-script/Code.gs`: nhận xác nhận tham dự và lời chúc vào Google Sheet

## Nhận phản hồi vào Google Sheet

Khi chưa cài, thiệp chạy chế độ xem trước: xác nhận không được gửi đi, lời chúc chỉ lưu trên máy khách.
Cài một lần, khoảng 5 phút:

1. Tạo một Google Sheet mới (ví dụ "Thiệp cưới Huy & Phương").
2. Trong Sheet, chọn **Tiện ích mở rộng → Apps Script**. Xoá hết nội dung có sẵn, dán toàn bộ
   `apps-script/Code.gs` vào, bấm **Lưu**.
3. Chọn hàm **setup** ở thanh trên cùng, bấm **Chạy**. Google sẽ hỏi quyền truy cập Sheet: chọn tài khoản,
   **Nâng cao → Đi tới … (không an toàn)** → **Cho phép**. Đây là script của chính bạn nên Google cảnh báo
   như vậy. Sheet sẽ có hai tab mới: **Xác nhận** và **Lời chúc**.
4. Bấm **Triển khai → Tùy chọn triển khai mới**, chọn loại **Ứng dụng web**:
   - Thực thi dưới dạng: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
5. Bấm **Triển khai**, sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/…/exec`).
6. Mở `wedding-extras.js`, dán URL vào dòng `const sheetEndpoint = "";` rồi commit và push.

Dùng hằng ngày:

- Tab **Xác nhận**: mỗi khách một dòng gồm thời gian, tên, sẽ đến hay vắng, số người và lời nhắn.
- Tab **Lời chúc**: lời chúc mới có ô **Hiện trên thiệp** chưa tích. Tích vào thì lời chúc hiện trên thiệp
  cho mọi người cùng xem (40 lời mới nhất). Bỏ tích là ẩn đi.
- Nếu sửa `Code.gs` sau này: **Triển khai → Quản lý các bản triển khai → sửa (bút chì) → Phiên bản mới**
  để giữ nguyên URL. Tạo bản triển khai mới sẽ ra URL khác.

Các mẫu có nhạc piano tạm do trình duyệt tạo. Nhạc chỉ phát khi khách bấm nút.

Cần xác nhận trước khi gửi khách mời:

- Địa chỉ Selena Palace tại Km 19 Quốc lộ 32, Đức Thượng, Hoài Đức, Hà Nội.
- Ngày âm lịch đang ghi là 20 tháng 10 năm Bính Ngọ (tính cho 28/11/2026).
