# การใช้งาน PostgreSQL ใน Docker

Template นี้ใช้ Docker Compose เพื่อรัน PostgreSQL database ใน container

## 🚀 วิธีใช้งาน

### 1. เริ่มต้น PostgreSQL Container

```bash
# รัน PostgreSQL (ใน background)
docker-compose up -d

# หรือรันพร้อมดู logs
docker-compose up
```

### 2. ตรวจสอบว่า Container รันอยู่

```bash
docker-compose ps
```

ควรเห็น container `app_postgres` มี status เป็น `Up`

### 3. ดู Logs

```bash
docker-compose logs postgres
# หรือดู logs แบบ real-time
docker-compose logs -f postgres
```

### 4. หยุด Container

```bash
docker-compose down
```

### 5. หยุดและลบข้อมูล (ระวัง! จะลบข้อมูลทั้งหมด)

```bash
docker-compose down -v
```

## 📋 การตั้งค่าเริ่มต้น

จาก `docker-compose.yml`:

- **Username**: `postgres`
- **Password**: `postgres`
- **Database**: `app_db` (เปลี่ยนได้ตามต้องการ)
- **Port**: `5432` (mapped จาก container ไปที่ host)

## 🔧 เปลี่ยน Password และ Database Name

### วิธีที่ 1: แก้ไข docker-compose.yml โดยตรง

แก้ไขไฟล์ `docker-compose.yml`:

```yaml
environment:
   POSTGRES_USER: your_username
   POSTGRES_PASSWORD: your_secure_password
   POSTGRES_DB: your_database_name
```

### วิธีที่ 2: ใช้ docker-compose.override.yml (แนะนำ)

1. คัดลอกไฟล์ `docker-compose.override.example.yml` เป็น `docker-compose.override.yml`:

```bash
cp docker-compose.override.example.yml docker-compose.override.yml
```

2. แก้ไขค่าตามต้องการใน `docker-compose.override.yml`

3. รัน `docker-compose up -d` ใหม่

**ข้อดี:** ไม่ต้องแก้ไขไฟล์หลัก และไฟล์ override จะถูก git ignore อัตโนมัติ

## 🔗 เชื่อมต่อกับ Next.js App

### 1. ตั้งค่า DATABASE_URL ใน `.env.local`

ในโฟลเดอร์ `web` สร้างหรือแก้ไขไฟล์ `.env.local`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
```

**ถ้าเปลี่ยน username/password/database name ให้แก้ URL ตาม:**

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
```

### 2. รัน Prisma Migrate

```bash
cd web
yarn prisma migrate dev --name init
yarn prisma generate
```

## 🛠️ คำสั่งที่มีประโยชน์

### เข้าไปใน PostgreSQL Container

```bash
docker-compose exec postgres psql -U postgres -d app_db
```

### Backup Database

```bash
docker-compose exec postgres pg_dump -U postgres app_db > backup.sql
```

### Restore Database

```bash
docker-compose exec -T postgres psql -U postgres app_db < backup.sql
```

### ดูข้อมูลในตาราง

```bash
# เข้าไปใน container
docker-compose exec postgres psql -U postgres -d app_db

# ใน psql prompt:
\dt              # ดูรายการตาราง
SELECT * FROM "User";  # ดูข้อมูลในตาราง User
\q               # ออกจาก psql
```

### ลบและสร้าง Container ใหม่

```bash
# หยุดและลบ container + volume
docker-compose down -v

# สร้างใหม่
docker-compose up -d
```

## 📦 Volume (การเก็บข้อมูล)

ข้อมูล PostgreSQL ถูกเก็บใน Docker volume ชื่อ `postgres_data`

- **ข้อมูลจะไม่หาย** แม้จะหยุด container
- **ข้อมูลจะหาย** ถ้ารัน `docker-compose down -v`

### ดูรายการ Volumes

```bash
docker volume ls
```

### ลบ Volume (ระวัง! จะลบข้อมูลทั้งหมด)

```bash
docker volume rm app_postgres_data
```

## 🔍 Troubleshooting

### 1. Port 5432 ถูกใช้งานอยู่แล้ว

**ปัญหา:** `Error: bind: address already in use`

**วิธีแก้:**
- เปลี่ยน port mapping ใน `docker-compose.yml`:

```yaml
ports:
   - "5433:5432"  # ใช้ port 5433 แทน
```

- แล้วแก้ `DATABASE_URL` เป็น `localhost:5433`

### 2. Container ไม่ start

**วิธีแก้:**
```bash
# ดู logs
docker-compose logs postgres

# ลบ container และ volume แล้วสร้างใหม่
docker-compose down -v
docker-compose up -d
```

### 3. เชื่อมต่อ Database ไม่ได้

**ตรวจสอบ:**
1. Container รันอยู่หรือไม่: `docker-compose ps`
2. Port ถูกต้องหรือไม่: `DATABASE_URL` ใช้ port เดียวกับที่ map ใน docker-compose
3. Username/Password ถูกต้องหรือไม่
4. Database name ถูกต้องหรือไม่

### 4. ข้อมูลหายหลังจาก restart

**สาเหตุ:** อาจลบ volume ไปแล้ว

**วิธีแก้:** ข้อมูลควรอยู่ถ้าไม่รัน `docker-compose down -v`

## 🎯 ขั้นตอนเริ่มต้นใช้งาน

1. **รัน PostgreSQL:**
   ```bash
   docker-compose up -d
   ```

2. **ตั้งค่า `.env.local` ใน `web/`:**
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
   ```

3. **รัน Prisma Migrate:**
   ```bash
   cd web
   yarn prisma migrate dev --name init
   yarn prisma generate
   ```

4. **รัน Next.js:**
   ```bash
   yarn dev
   ```

5. **ทดสอบ:** เรียก API register เพื่อสร้าง user ใหม่

## 📚 เอกสารเพิ่มเติม

- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

