// Nhận xác nhận tham dự và lời chúc từ thiệp, ghi vào Google Sheet này.
// Cách cài: xem README, mục "Nhận phản hồi vào Google Sheet".

const RSVP_SHEET = "Xác nhận";
const WISH_SHEET = "Lời chúc";
const WISH_APPROVED_COLUMN = 4;
const MAX_NAME = 80;
const MAX_MESSAGE = 500;
const MAX_PUBLIC_WISHES = 40;

// Chạy một lần trong trình soạn Apps Script để tạo hai tab và dòng tiêu đề.
function setup() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  prepareSheet(book, RSVP_SHEET, ["Thời gian", "Tên", "Tham dự", "Số người", "Lời nhắn"]);
  prepareSheet(book, WISH_SHEET, ["Thời gian", "Tên", "Lời chúc", "Hiện trên thiệp"]);
}

function prepareSheet(book, name, headers) {
  const sheet = book.getSheetByName(name) || book.insertSheet(name);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  return sheet;
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (error) {
    return reply({ ok: false, error: "bad-request" });
  }
  // Ô ẩn "website": người thật để trống, bot thường điền vào. Trả ok để bot không thử lại.
  if (data.website) return reply({ ok: true });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    if (data.type === "rsvp") {
      const name = clean(data.name, MAX_NAME);
      if (!name) return reply({ ok: false, error: "missing-name" });
      const attending = data.attendance === "yes";
      const guests = attending ? Math.min(5, Math.max(1, parseInt(data.guests, 10) || 1)) : 0;
      book.getSheetByName(RSVP_SHEET).appendRow([
        new Date(), name, attending ? "Sẽ đến" : "Xin phép vắng", guests, clean(data.message, MAX_MESSAGE),
      ]);
      return reply({ ok: true });
    }
    if (data.type === "wish") {
      const message = clean(data.message, MAX_MESSAGE);
      if (!message) return reply({ ok: false, error: "missing-message" });
      const sheet = book.getSheetByName(WISH_SHEET);
      sheet.appendRow([new Date(), clean(data.name, MAX_NAME) || "Ẩn danh", message, false]);
      sheet.getRange(sheet.getLastRow(), WISH_APPROVED_COLUMN).insertCheckboxes();
      return reply({ ok: true });
    }
    return reply({ ok: false, error: "unknown-type" });
  } finally {
    lock.releaseLock();
  }
}

// Thiệp gọi ?action=wishes để lấy các lời chúc đã được tích "Hiện trên thiệp", mới nhất trước.
function doGet(e) {
  if (e.parameter.action !== "wishes") return reply({ ok: true });
  const rows = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WISH_SHEET).getDataRange().getValues().slice(1);
  const wishes = rows
    .filter((row) => row[WISH_APPROVED_COLUMN - 1] === true)
    .slice(-MAX_PUBLIC_WISHES)
    .reverse()
    .map((row) => ({ name: String(row[1]), message: String(row[2]) }));
  return reply({ ok: true, wishes });
}

// Cắt độ dài, và chặn chuỗi bắt đầu bằng = + - @ để Sheet không hiểu nhầm thành công thức.
function clean(value, max) {
  const text = String(value || "").trim().slice(0, max);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
