# ร้านเจ๊แดง เจ้าตำรับไข่ฟก — GitHub Pages

ชุดไฟล์นี้พร้อมนำขึ้น GitHub Pages

## โครงสร้าง
- `index.html` — หน้าเว็บไซต์หลัก
- `images/` — สำหรับรูปจริงของร้าน
- `apps-script/Code.gs` — Backend สำหรับบันทึกการจองลง Google Sheet
- `apps-script/SETUP-Google-Sheet.txt` — คู่มือตั้งค่า Google Apps Script

## วิธีขึ้น GitHub Pages
1. สร้าง Repository ใหม่ เช่น `jaedang-khaifok`
2. อัปโหลด `index.html` และโฟลเดอร์ `images` ขึ้น Repository
3. ไปที่ Settings > Pages
4. Source เลือก `Deploy from a branch`
5. Branch เลือก `main` และ `/ (root)`
6. กด Save
7. รอ GitHub สร้าง URL ของเว็บไซต์

## ระบบจองโต๊ะ
Deploy `apps-script/Code.gs` เป็น Google Apps Script Web App แล้วนำ URL ที่ลงท้าย `/exec` ไปแทนค่า `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` ใน `index.html`

## การใส่รูปจริง
นำรูปจริงใส่ใน `images/` เช่น `khaifok.jpg`, `restaurant-1.jpg`, `menu-1.jpg` แล้วแก้ `src` ใน `index.html` เช่น `images/khaifok.jpg`
