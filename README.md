# Demo thiệp cưới Huy & Phương

Ba mẫu thiết kế mang đậm dấu ấn thẩm mỹ Á Đông đương đại, ưu tiên điện thoại
(trên máy tính thiệp hiển thị thành một khung dọc giữa nền họa tiết trang trí):

- `index.html` · **01 Son Mài × Thư Tay (Bản Chủ Đạo)**: kết hợp sắc **Đỏ Đô Sơn Mài thếp vàng** với nền **Giấy Dó Màu Be ấm**. Màn mở đóng ấn chu sa lên phong bì đỏ đô để mở nắp và rút tờ thiệp màu be ra; khi cuộn có nét bút chu sa & chỉ vàng dẫn lối, cuộn thư lụa tự động lăn trục gỗ mở dần kèm đóng mộc Hỷ Sự, và bài vị đỏ đô có lớp nhũ vàng để cào xem ngày giờ lành.
- `photo-editorial.html` · **02 Tơ Duyên**: cảm hứng Hồng Tuyến Nguyệt Lão với đôi khung ảnh vòm lụa kết nối bằng nút thắt đồng tâm, sợi chỉ hồng vẽ dần khi cuộn và thẻ cào Kim Bài Hỷ Sự xem ngày cưới.
- `wine-rustic.html` · **03 Chuyện Hai Ta**: nghệ thuật tranh cắt giấy Á Đông kết hợp đèn lồng hỷ sự và khung tròn hoa văn trên bìa, kể chuyện tình qua 5 hồi chuyển cảnh theo thao tác cuộn.

Cấu trúc:

- `demo-common.css` / `demo-common.js`: khung trang, thanh chọn mẫu (kèm nút `↻ Mở thiệp` để xem lại hiệu ứng cổng mở), nhạc nền ngũ cung/hộp nhạc, nút thả tim chúc phúc (`囍`), hiệu ứng cánh hoa & bụi vàng rơi, màn mở thiệp.
- `wedding-extras.css` / `wedding-extras.js`: các phần dùng chung (thiệp gia tiên hai bên gia đình, dòng thời gian chuyện tình, album 6 ảnh kèm Lightbox phóng to, lịch trình nghi lễ & bảng màu Dress Code, tờ lịch tháng 11/2026 đánh dấu ngày cưới 28/11 & đồng hồ đếm ngược, bản đồ, xác nhận tham dự, sổ vàng lưu bút kèm gợi ý lời chúc nhanh, phong bao mừng cưới kèm nút sao chép STK).
- `themes/*.css`: màu, font, họa tiết Á Đông và bố cục riêng của từng mẫu; `themes/*.js` cho phần tương tác riêng của mẫu 03 và 04.
- `apps-script/Code.gs`: nhận xác nhận tham dự và lời chúc vào Google Sheet.

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
