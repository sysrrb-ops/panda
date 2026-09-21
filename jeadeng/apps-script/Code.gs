/**
 * ร้านเจ๊แดง เจ้าตำรับไข่ฟก - ระบบรับจองโต๊ะลง Google Sheet
 * วิธีใช้:
 * 1) สร้าง Google Sheet ใหม่
 * 2) เปิด Extensions > Apps Script
 * 3) วางโค้ดนี้แทน Code.gs เดิม
 * 4) แก้ SHEET_NAME ได้ถ้าต้องการ
 * 5) Deploy > New deployment > Web app
 *    Execute as: Me
 *    Who has access: Anyone
 * 6) คัดลอก Web app URL ไปวางในตัวแปร APPS_SCRIPT_URL ของไฟล์ HTML
 */

const SHEET_NAME = 'Reservations';

function doGet() {
  return ContentService
    .createTextOutput('Jaedang reservation service is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    ensureHeader_(sheet);

    const p = (e && e.parameter) ? e.parameter : {};
    const bookingId = createBookingId_();
    const timestamp = new Date();

    const row = [
      timestamp,
      bookingId,
      safeCell_(p.name),
      safeCell_(p.date),
      safeCell_(p.time),
      safeCell_(p.people),
      safeCell_(p.phone),
      safeCell_(p.note),
      'รอยืนยัน',
      safeCell_(p.source || 'website')
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, bookingId: bookingId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error(err);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function ensureHeader_(sheet) {
  const headers = [
    'เวลาที่ส่ง',
    'รหัสการจอง',
    'ชื่อผู้จอง',
    'วันที่มาใช้บริการ',
    'เวลา',
    'จำนวนผู้ใช้บริการ',
    'เบอร์โทรศัพท์',
    'หมายเหตุ',
    'สถานะ',
    'แหล่งที่มา'
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, headers.length);
  }
}

function createBookingId_() {
  const tz = Session.getScriptTimeZone() || 'Asia/Bangkok';
  const stamp = Utilities.formatDate(new Date(), tz, 'yyyyMMdd-HHmmss');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `JD-${stamp}-${random}`;
}

// ป้องกันค่าจากผู้ใช้ถูกตีความเป็นสูตรใน Google Sheets
function safeCell_(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 1000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
