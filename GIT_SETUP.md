# การตั้งค่า Git สำหรับโปรเจกต์ HRM

## ✅ สิ่งที่ทำแล้ว

1. **สร้าง `.gitignore` ที่ root level** - สำหรับทั้งโปรเจกต์
2. **แก้ไข `.gitignore` ใน `web/`** - อนุญาตให้ push `.env.example`
3. **แก้ไข `.gitignore` ใน `mobile/`** - อนุญาตให้ push `.env.example`
4. **สร้าง `README.md`** - เอกสารหลักของโปรเจกต์

## 🎯 เป้าหมาย

- ✅ Push `.env.example` ขึ้น git ได้ (ทั้ง web และ mobile)
- ✅ รวม web และ mobile เป็น git repository เดียวกัน
- ✅ `.env.local` ยังคงถูก ignore (ไม่ push)

## 📝 ขั้นตอนการ Setup Git

### 1. ตรวจสอบว่า Git ถูก initialize แล้วหรือยัง

```bash
# จากโฟลเดอร์ root (HRM/)
cd C:\Users\ZoPea\Desktop\DEV\HRM

# เช็คว่ามี .git folder หรือยัง
dir .git
```

### 2. ถ้ายังไม่มี Git repository

```bash
# Initialize git repository
git init

# เพิ่ม remote (ถ้ามี)
git remote add origin <your-repo-url>
```

### 3. เพิ่มไฟล์ทั้งหมด

```bash
# เพิ่มไฟล์ทั้งหมด (รวม .env.example)
git add .

# เช็คว่า .env.example ถูก add แล้ว
git status
```

คุณควรเห็น:
- ✅ `web/.env.example` (untracked หรือ staged)
- ✅ `mobile/.env.example` (untracked หรือ staged)
- ❌ `web/.env.local` (ignored - ไม่แสดง)
- ❌ `mobile/.env.local` (ignored - ไม่แสดง)

### 4. Commit และ Push

```bash
# Commit
git commit -m "Initial commit: HRM project with web, mobile, and docker setup"

# Push (ถ้ามี remote)
git push -u origin main
# หรือ
git push -u origin master
```

## 🔍 ตรวจสอบว่า .env.example ถูก track แล้ว

```bash
# เช็ค git status
git status

# ควรเห็น:
# - web/.env.example (new file)
# - mobile/.env.example (new file)
# - ไม่เห็น .env.local (ถูก ignore)
```

## 📋 สรุปไฟล์ที่ Push ขึ้น Git

### ✅ Push ได้ (Tracked)
- `.env.example` (ทั้ง web และ mobile)
- `docker-compose.yml`
- Source code ทั้งหมด
- `README.md`, `README_DB.md`, `README_DOCKER.md`
- Configuration files

### ❌ ไม่ Push (Ignored)
- `.env.local`
- `.env`
- `node_modules/`
- `.next/`, `.expo/`
- `docker-compose.override.yml`
- Build outputs

## 🛠️ คำสั่งที่มีประโยชน์

### ดูไฟล์ที่ถูก ignore

```bash
git status --ignored
```

### ดูไฟล์ที่ถูก track

```bash
git ls-files
```

### Force add ไฟล์ที่ถูก ignore (ไม่แนะนำ)

```bash
# ถ้าต้องการ force add .env.local (ไม่แนะนำ!)
git add -f web/.env.local
```

## ⚠️ ข้อควรระวัง

1. **อย่า push `.env.local`** - ไฟล์นี้มีข้อมูลส่วนตัว (password, secret keys)
2. **ใช้ `.env.example`** - เป็น template ที่ไม่มีข้อมูลจริง
3. **ตรวจสอบก่อน push** - ใช้ `git status` และ `git diff` ตรวจสอบก่อน commit

## 🎯 Workflow ที่แนะนำ

### เมื่อเริ่มโปรเจกต์ใหม่

1. Clone repository
2. คัดลอก `.env.example` เป็น `.env.local`
3. แก้ไข `.env.local` ตามต้องการ
4. `.env.local` จะถูก ignore อัตโนมัติ

### เมื่อเพิ่ม Environment Variable ใหม่

1. แก้ไข `.env.example` (เพิ่มตัวแปรใหม่พร้อมค่า placeholder)
2. Commit `.env.example`
3. แก้ไข `.env.local` ในเครื่องตัวเอง (ไม่ commit)

### ตัวอย่าง

**`.env.example`** (push ขึ้น git):
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
JWT_SECRET="your_jwt_secret_here"
```

**`.env.local`** (ไม่ push - ignore):
```env
DATABASE_URL="postgresql://postgres:myrealpassword@localhost:5432/hrm_db?schema=public"
JWT_SECRET="my_actual_secret_key_12345"
```

## 📚 เอกสารเพิ่มเติม

- [Git Documentation](https://git-scm.com/doc)
- [.gitignore Patterns](https://git-scm.com/docs/gitignore)

