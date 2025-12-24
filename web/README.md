## Web Application (Next.js + TypeScript + Tailwind + Prisma)

Web Application template ที่รองรับการเข้าสู่ระบบ แยก Role และมี API สำหรับเรียกใช้จากเว็บและ mobile app

รายละเอียดการเชื่อมต่อฐานข้อมูลและ Prisma ดูที่ไฟล์ `README_DB.md`

## Stack หลัก

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Prisma + PostgreSQL
- JWT Auth (Cookie สำหรับเว็บ + Bearer token สำหรับ mobile)

## การติดตั้งและรันด้วย npm

ภายในโฟลเดอร์ `web` ให้ใช้คำสั่งต่อไปนี้

```bash
# ติดตั้ง dependency (ครั้งแรก)
npm install

# รัน dev server
npm run dev

# build production
npm run build

# รัน production server
npm start

# ตรวจ eslint
npm run lint
```

## การตั้งค่า Environment

สร้างไฟล์ `.env.local` ในโฟลเดอร์ `web` (อย่าให้มีช่องว่างนำหน้า key) โดยมีค่านี้อย่างน้อย

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
JWT_SECRET="your_jwt_secret_here"
JWT_EXPIRES_IN="7d"
```

## การเตรียมฐานข้อมูล (สรุป)

รายละเอียดเต็ม ๆ อยู่ใน `README_DB.md` แต่โดยสรุปทำตามนี้

1. สร้างฐานข้อมูล PostgreSQL จริง และตั้งค่า `DATABASE_URL` ให้ถูกต้อง
2. รัน Prisma migrate และ generate

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## โครงสร้างหน้าสำคัญ

- `/` หน้า Landing แนะนำระบบ และปุ่มไปหน้า Login
- `/login` หน้าเข้าสู่ระบบ (เว็บใช้ cookie, mobile สามารถเรียก API โดยตรง)
- `/register` หน้า สมัครสมาชิก (เลือก role ได้)
- `/dashboard` หน้าแดชบอร์ดหลัง login แสดง email + role ของผู้ใช้

## API สำหรับ Mobile / External Client

- `POST /api/auth/register` – สมัครสมาชิกใหม่
- `POST /api/auth/login` – Login
  - Response: `{ token, user: { id, email, name, role } }`
  - Mobile ควรเก็บ `token` เอง (เช่น AsyncStorage / SecureStore)
- `GET /api/auth/me` – ดึงข้อมูล user จาก JWT
  - รองรับทั้ง cookie (ฝั่งเว็บ) และ `Authorization: Bearer <token>` (ฝั่ง mobile)
- `POST /api/auth/logout` – ลบ cookie `auth_token` (ใช้สำหรับเว็บ)

## Role-based Access (แนวทาง)

Middleware (`src/middleware.ts`) จะเช็ก JWT จาก cookie หรือ header

- Route public: `/`, `/login`, `/register`, `/api/auth/*`
- Route อื่น: ถ้าไม่มี JWT → redirect ไป `/login` หรือคืน 401 สำหรับ API

หากต้องการจำกัดสิทธิ์ในแต่ละหน้า/endpoint เพิ่มเติม

- อ่าน token แล้วตรวจ `payload.role` ก่อน return response
- ถ้าไม่ตรง role ที่ต้องการให้คืน 403 (Forbidden) หรือ redirect ตามที่ออกแบบ
