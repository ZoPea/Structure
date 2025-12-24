## การเชื่อมต่อฐานข้อมูล PostgreSQL + Prisma

Template นี้ใช้ PostgreSQL เป็นฐานข้อมูลหลัก และใช้ Prisma เป็น ORM

## 0. วิธีรัน PostgreSQL

### ตัวเลือกที่ 1: ใช้ Docker (แนะนำ - ง่ายและรวดเร็ว)

โปรเจกต์นี้มี `docker-compose.yml` สำหรับรัน PostgreSQL ใน Docker

**ขั้นตอน:**

1. รัน PostgreSQL:
  ```bash
  # จากโฟลเดอร์ root ของโปรเจกต์
  docker-compose up -d
  ```

2. ตั้งค่า `DATABASE_URL` ใน `web/.env.local`:
  ```env
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
  ```

3. รัน Prisma migrate:
  ```bash
  cd web
  npx prisma migrate dev --name init
  npx prisma generate
  ```

**ดูรายละเอียดเพิ่มเติม:** `../README_DOCKER.md`

### ตัวเลือกที่ 2: ติดตั้ง PostgreSQL โดยตรง

ติดตั้ง PostgreSQL บนเครื่องของคุณเอง แล้วสร้าง database ตามปกติ

---

## 1. ตั้งค่า Connection String (`DATABASE_URL`)

ในไฟล์ `.env.local` (โฟลเดอร์ `web`) ให้กำหนดค่า `DATABASE_URL` (ห้ามมีช่องว่างนำหน้า key)

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
```

อธิบายส่วนต่าง ๆ

- **USER**: ชื่อผู้ใช้ของฐานข้อมูล (เช่น `postgres`)
- **PASSWORD**: รหัสผ่านของ USER
- **HOST**: ที่อยู่ของเซิร์ฟเวอร์ฐานข้อมูล (เช่น `localhost` หรือ IP)
- **5432**: พอร์ตของ PostgreSQL (ส่วนใหญ่ใช้ 5432)
- **DB_NAME**: ชื่อฐานข้อมูลที่สร้างไว้ เช่น `app_db` (เปลี่ยนได้ตามต้องการ)
- `?schema=public`: ใช้ schema `public` (ค่า default ของ PostgreSQL)

ตัวอย่างจริง

```env
DATABASE_URL="postgresql://postgres:MyStrongPass@localhost:5432/app_db?schema=public"
```

## 2. โครงสร้าง Prisma Schema

ไฟล์ `prisma/schema.prisma` มีโครงหลักดังนี้

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  MANAGER
  USER
}
```

## 3. สร้างฐานข้อมูลจริง

### 3.1 DB ใหม่ (ว่าง ๆ) - แนะนำสำหรับโปรเจกต์ใหม่

ให้สร้างฐานข้อมูลใหม่ใน PostgreSQL ก่อน (เช่น ผ่าน DBeaver, pgAdmin, หรือ psql)

ตัวอย่างคำสั่ง (ถ้าใช้ `psql`)

```sql
CREATE DATABASE app_db;
```

แล้วตั้งค่า `DATABASE_URL` ให้ชี้ไปที่ DB นี้

**ข้อดี:**
- ✅ ไม่มีตารางเก่ามากวน
- ✅ Prisma migrate จะสร้างตารางใหม่ทั้งหมด
- ✅ ปลอดภัย ไม่กระทบข้อมูลเดิม

### 3.2 DB ที่มีข้อมูลอยู่แล้ว - ใช้ได้ แต่ต้องระวัง

**ถ้า DB ของคุณมีตารางอื่นอยู่แล้ว (แต่ยังไม่มีตาราง `User`)**

✅ **ใช้ได้เลย** - Prisma migrate จะสร้างเฉพาะตาราง `User` และ enum `Role` เท่านั้น

**ถ้า DB ของคุณมีตาราง `User` อยู่แล้ว**

⚠️ **ต้องระวัง** - Prisma migrate อาจจะ:

1. **ถ้าตาราง `User` มีโครงสร้างเหมือน schema.prisma อยู่แล้ว**
  - ✅ ใช้ได้เลย แต่ต้องระวังเรื่อง migration history
  - แนะนำ: ใช้ `yarn prisma db push` แทน `yarn prisma migrate dev` (ไม่สร้าง migration file)

2. **ถ้าตาราง `User` มีโครงสร้างต่างจาก schema.prisma**
  - ❌ อาจเกิด error หรือข้อมูลเสียหาย
  - แนะนำ: **สำรองข้อมูลก่อน** หรือใช้ DB ใหม่

### 3.3 วิธีเช็คว่า DB มีตาราง `User` อยู่แล้วหรือไม่

รันคำสั่ง SQL นี้ใน PostgreSQL:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'User';
```

- ถ้าไม่มีผลลัพธ์ = ยังไม่มีตาราง `User` → ใช้ได้เลย
- ถ้ามีผลลัพธ์ = มีตาราง `User` อยู่แล้ว → ต้องเช็คโครงสร้างก่อน

### 3.4 วิธีเช็คโครงสร้างตาราง `User` ที่มีอยู่

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'User'
ORDER BY ordinal_position;
```

เปรียบเทียบกับ schema.prisma:
- ต้องมีคอลัมน์: `id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`
- `email` ต้องเป็น `unique`
- `role` ต้องเป็น enum หรือ varchar ที่รองรับค่า `ADMIN`, `MANAGER`, `USER`

### 3.5 วิธีจัดการกับ DB ที่มีตาราง `User` อยู่แล้ว

**ตัวเลือก 1: ใช้ `prisma db push` (ไม่สร้าง migration file)**

```bash
yarn prisma db push
yarn prisma generate
```

- ✅ อัปเดตโครงสร้างตารางให้ตรงกับ schema.prisma
- ⚠️ ไม่สร้าง migration history (เหมาะกับ development)

**ตัวเลือก 2: Baseline migration (สำหรับ production)**

```bash
# 1. สร้าง migration file แต่ไม่รัน
yarn prisma migrate dev --create-only --name init

# 2. แก้ไข migration file ให้ตรงกับโครงสร้างที่มีอยู่

# 3. Mark migration ว่า complete โดยไม่รัน
yarn prisma migrate resolve --applied init

# 4. Generate Prisma Client
yarn prisma generate
```

**ตัวเลือก 3: ใช้ DB ใหม่ (แนะนำที่สุด)**

- สร้าง DB ใหม่สำหรับโปรเจกต์นี้
- ปลอดภัย ไม่กระทบข้อมูลเดิม

## 4. รัน Prisma Migrate และ Generate

ในโฟลเดอร์ `web` ให้รัน (แนะนำใช้ Yarn)

```bash
yarn prisma migrate dev --name init
yarn prisma generate
```

สิ่งที่จะเกิดขึ้น

- Prisma จะสร้างตาราง `User` และ enum `Role` ในฐานข้อมูล
- สร้าง Prisma Client ตาม schema ไว้ใน `node_modules/@prisma/client`

## 5. การใช้งาน Prisma ในโค้ด

มี helper อยู่ในไฟล์ `src/lib/prisma.ts` ซึ่ง export ตัวแปร `prisma`

ตัวอย่างการใช้งาน (สรุป)

```ts
import { prisma } from '@/lib/prisma';

async function example() {
  const users = await prisma.user.findMany();
}
```

## 6. การทดสอบการเชื่อมต่อ

หลังจากตั้งค่า `.env.local` และรัน `yarn prisma migrate dev` แล้ว

1. รัน `yarn dev`
2. ลองเรียก API สมัครสมาชิก
  - POST `http://localhost:3000/api/auth/register`
  - body:

  ```json
  {
    "email": "admin@example.com",
    "password": "password123",
    "name": "Admin",
    "role": "ADMIN"
  }
  ```

3. ถ้าทุกอย่างถูกต้อง จะมีข้อมูลถูกบันทึกลงตาราง `User` ในฐานข้อมูล

## 7. ปัญหาที่พบบ่อย

- **ต่อ DB ไม่ได้ / ECONNREFUSED**
  - เช็กว่า PostgreSQL รันอยู่จริง และ HOST/PORT ถูกต้อง
  - เช็กว่า firewall อนุญาตให้เชื่อมต่อได้

- **Prisma error: DATABASE_URL is empty**
  - เช็กว่าไฟล์ `.env.local` อยู่ในโฟลเดอร์ `web`
  - รีสตาร์ท dev server หลังแก้ `.env.local`

- **ชื่อ key ผิดเพราะมีช่องว่างนำหน้า**
  - ตรวจดูว่า `DATABASE_URL` ขึ้นต้นบรรทัดโดยไม่มี space หรือ tab นำหน้า

- **Error: Table "User" already exists**
  - แสดงว่า DB มีตาราง `User` อยู่แล้ว
  - วิธีแก้: ใช้ `yarn prisma db push` แทน `yarn prisma migrate dev`
  - หรือลบตารางเก่าก่อน (ระวัง! จะลบข้อมูลทั้งหมด): `DROP TABLE "User" CASCADE;`

- **Error: Migration failed - column already exists**
  - แสดงว่าโครงสร้างตารางบางส่วนตรงกับ schema แล้ว
  - วิธีแก้: ใช้ `yarn prisma db push` เพื่อ sync โครงสร้าง
  - หรือเช็คโครงสร้างตารางที่มีอยู่แล้ว (ดูส่วน 3.4)

- **Error: Unique constraint violation on email**
  - แสดงว่ามี email ซ้ำในตาราง `User`
  - วิธีแก้: ลบข้อมูลซ้ำ หรือแก้ email ให้ไม่ซ้ำ


