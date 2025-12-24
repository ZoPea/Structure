# 🚀 วิธี Push โปรเจกต์ขึ้น Git (Quick Start)

## วิธีที่ 1: ใช้ UI ใน Cursor/VS Code (ง่ายที่สุด)

### ขั้นตอนที่ 1: Initialize Repository

1. เปิด Source Control panel (กด `Ctrl+Shift+G` หรือคลิกไอคอน Git ที่ sidebar ซ้าย)
2. คุณจะเห็นข้อความ: "The folder currently open doesn't have a Git repository"
3. คลิกปุ่ม **"Initialize Repository"** (ปุ่มสีชมพู)
4. รอสักครู่ Git จะถูก initialize

### ขั้นตอนที่ 2: Add ไฟล์ทั้งหมด

1. ใน Source Control panel คุณจะเห็นไฟล์ทั้งหมดเป็น "Changes"
2. คลิกปุ่ม **"+"** ตรง "Changes" เพื่อ stage ไฟล์ทั้งหมด
   - หรือคลิก **"Stage All Changes"**
3. ตรวจสอบว่า `.env.example` ถูก add แล้ว (ควรเห็น `web/.env.example` และ `mobile/.env.example`)
4. ตรวจสอบว่า `.env.local` **ไม่ถูก add** (ไม่ควรเห็นใน list)

### ขั้นตอนที่ 3: Commit

1. ใส่ commit message ในช่อง "Message" ด้านบน:
   ```
   Initial commit: HRM project with web, mobile, and docker setup
   ```
2. กด `Ctrl+Enter` หรือคลิกปุ่ม **"✓ Commit"**

### ขั้นตอนที่ 4: Push ขึ้น GitHub/GitLab

#### ถ้ายังไม่มี Repository บน GitHub/GitLab:

**วิธีที่ 1: ใช้ "Publish to GitHub" (แนะนำ)**

1. ใน Source Control panel จะมีปุ่ม **"Publish to GitHub"** (ปุ่มสีชมพู)
2. คลิกปุ่มนั้น
3. เลือก:
   - **Public** (ทุกคนเห็นได้) หรือ **Private** (เฉพาะคุณ)
4. ใส่ชื่อ repository (เช่น `HRM`)
5. คลิก **"Publish"**
6. รอให้ GitHub สร้าง repository และ push ไฟล์ขึ้นไป

**วิธีที่ 2: สร้าง Repository บน GitHub ก่อน**

1. ไปที่ [GitHub.com](https://github.com) → คลิก **"New repository"**
2. ใส่ชื่อ repository (เช่น `HRM`)
3. เลือก Public/Private
4. **อย่า** check "Initialize with README" (เพราะเรามีไฟล์อยู่แล้ว)
5. คลิก **"Create repository"**
6. กลับมาที่ Cursor → ใน Source Control panel จะมีปุ่ม **"Publish Branch"**
7. คลิกปุ่มนั้น → เลือก GitHub → เลือก repository ที่สร้างไว้

#### ถ้ามี Repository อยู่แล้ว:

1. ใน Source Control panel → คลิก **"..."** (More Actions)
2. เลือก **"Remote"** → **"Add Remote"**
3. ใส่:
   - **Name**: `origin`
   - **URL**: `https://github.com/ZoPea/HRM.git` (เปลี่ยนเป็น URL ของคุณ)
4. คลิก **"OK"**
5. คลิก **"..."** → **"Push"** → เลือก remote `origin` และ branch `main` (หรือ `master`)

---

## วิธีที่ 2: ใช้ Command Line (Terminal)

### ขั้นตอนที่ 1: Initialize Repository

```bash
cd C:\Users\ZoPea\Desktop\DEV\HRM
git init
```

### ขั้นตอนที่ 2: Add ไฟล์ทั้งหมด

```bash
git add .
```

### ขั้นตอนที่ 3: ตรวจสอบว่า .env.example ถูก add แล้ว

```bash
git status
```

คุณควรเห็น:
- ✅ `web/.env.example` (new file)
- ✅ `mobile/.env.example` (new file)
- ❌ ไม่เห็น `.env.local` (ถูก ignore)

### ขั้นตอนที่ 4: Commit

```bash
git commit -m "Initial commit: HRM project with web, mobile, and docker setup"
```

### ขั้นตอนที่ 5: เพิ่ม Remote และ Push

#### ถ้ายังไม่มี Repository บน GitHub:

**สร้าง Repository บน GitHub ก่อน:**

1. ไปที่ [GitHub.com](https://github.com)
2. คลิก **"+"** → **"New repository"**
3. ใส่ชื่อ: `HRM`
4. เลือก Public/Private
5. **อย่า** check "Initialize with README"
6. คลิก **"Create repository"**

**แล้วรันคำสั่ง:**

```bash
# เพิ่ม remote
git remote add origin https://github.com/ZoPea/HRM.git
# เปลี่ยน ZoPea/HRM เป็น username/repo ของคุณ

# เปลี่ยนชื่อ branch เป็น main (ถ้ายังเป็น master)
git branch -M main

# Push
git push -u origin main
```

#### ถ้ามี Repository อยู่แล้ว:

```bash
# เพิ่ม remote
git remote add origin https://github.com/ZoPea/HRM.git
# เปลี่ยนเป็น URL ของคุณ

# Push
git push -u origin main
# หรือ
git push -u origin master
```

---

## 🔍 ตรวจสอบว่าทำสำเร็จ

### ตรวจสอบใน Cursor/VS Code:

1. เปิด Source Control panel
2. ควรเห็น "No changes" (ไม่มีไฟล์ที่ยังไม่ได้ commit)
3. ดูที่ status bar ด้านล่าง → ควรเห็น branch name (เช่น `main`)

### ตรวจสอบบน GitHub:

1. ไปที่ repository ของคุณบน GitHub
2. ควรเห็นไฟล์ทั้งหมด:
   - ✅ `web/.env.example`
   - ✅ `mobile/.env.example`
   - ✅ `docker-compose.yml`
   - ✅ `README.md`
   - ❌ ไม่เห็น `.env.local` (ถูก ignore)

---

## ⚠️ ข้อควรระวัง

### 1. อย่า Push `.env.local`

ตรวจสอบก่อน push:
```bash
git status
```

ถ้าเห็น `.env.local` ใน list → **อย่า commit!**

### 2. ตรวจสอบ `.gitignore`

```bash
# ดูไฟล์ที่ถูก ignore
git status --ignored
```

ควรเห็น:
- `.env.local` (ignored)
- `node_modules/` (ignored)
- `.next/` (ignored)

### 3. ถ้า Push ผิด (push `.env.local` ไปแล้ว)

```bash
# ลบไฟล์จาก git (แต่เก็บไฟล์ไว้ในเครื่อง)
git rm --cached web/.env.local
git rm --cached mobile/.env.local

# Commit การลบ
git commit -m "Remove .env.local from git"

# Push อีกครั้ง
git push
```

---

## 📝 Commit Message ที่แนะนำ

```
Initial commit: HRM project with web, mobile, and docker setup
```

หรือ

```
feat: Initial commit

- Add Next.js web application with authentication
- Add React Native mobile app
- Add Docker setup for PostgreSQL
- Add documentation (README, GIT_SETUP, etc.)
```

---

## 🎯 สรุป Quick Steps

### ใช้ UI (Cursor/VS Code):
1. คลิก **"Initialize Repository"**
2. คลิก **"+"** เพื่อ stage ไฟล์ทั้งหมด
3. ใส่ commit message → กด `Ctrl+Enter`
4. คลิก **"Publish to GitHub"** → เลือก Public/Private → Publish

### ใช้ Command Line:
```bash
git init
git add .
git commit -m "Initial commit: HRM project"
git remote add origin https://github.com/ZoPea/HRM.git
git branch -M main
git push -u origin main
```

---

## 🆘 ปัญหาที่พบบ่อย

### 1. "fatal: not a git repository"

**แก้ไข:**
```bash
cd C:\Users\ZoPea\Desktop\DEV\HRM
git init
```

### 2. "error: failed to push some refs"

**แก้ไข:**
```bash
# Pull ก่อน (ถ้ามีไฟล์บน remote)
git pull origin main --allow-unrelated-histories

# แล้ว push อีกครั้ง
git push -u origin main
```

### 3. "Permission denied"

**แก้ไข:**
- ใช้ Personal Access Token แทน password
- หรือใช้ SSH key

---

## 📚 เอกสารเพิ่มเติม

- `GIT_SETUP.md` - เอกสารการตั้งค่า Git แบบละเอียด
- [GitHub Docs](https://docs.github.com/)
- [Git Documentation](https://git-scm.com/doc)

