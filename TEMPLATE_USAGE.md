# คู่มือการใช้งาน Template

Template นี้เป็นโครงสร้างโปรเจกต์ Full-Stack ที่พร้อมใช้งานสำหรับโปรเจกต์ใหม่ๆ

## 🎯 วัตถุประสงค์

Template นี้ถูกออกแบบมาเพื่อ:
- **เร่งการเริ่มต้นโปรเจกต์** - ไม่ต้องสร้างโครงสร้างจากศูนย์
- **มาตรฐานโครงสร้าง** - โครงสร้างที่ทดสอบแล้วและใช้งานได้จริง
- **รองรับทั้ง Web และ Mobile** - โครงสร้างพร้อมสำหรับทั้ง 2 platform
- **Authentication Ready** - มีโครงสร้าง authentication พร้อมใช้งาน

## 📋 สิ่งที่รวมอยู่ใน Template

### ✅ มีให้แล้ว
- โครงสร้าง folder ทั้งหมด
- Configuration files (TypeScript, ESLint, Tailwind, etc.)
- Docker setup สำหรับ PostgreSQL
- Prisma schema ตัวอย่าง (User model)
- Placeholder files ในทุกตำแหน่งที่สำคัญ
- README และเอกสารประกอบ

### ❌ ไม่มี (ต้องเขียนเอง)
- โค้ดจริง (มีเฉพาะ placeholder)
- Business logic
- UI components
- API implementations

## 🚀 ขั้นตอนการใช้งาน Template

### 1. Clone Template

```bash
git clone <template-repo-url> your-project-name
cd your-project-name
```

### 2. เปลี่ยนชื่อโปรเจกต์

#### 2.1 เปลี่ยนชื่อใน package.json

**Web (`web/package.json`):**
```json
{
  "name": "your-project-web",
  ...
}
```

**Mobile (`mobile/package.json`):**
```json
{
  "name": "your-project-mobile",
  ...
}
```

#### 2.2 เปลี่ยนชื่อใน Docker

**`docker-compose.yml`:**
```yaml
services:
  postgres:
    container_name: your_project_postgres
    environment:
      POSTGRES_DB: your_project_db
```

**Volume name:**
```yaml
volumes:
  postgres_data:  # เปลี่ยนเป็น your_project_postgres_data (ถ้าต้องการ)
```

#### 2.3 เปลี่ยนชื่อ Database

**`.env.local` (web):**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/your_project_db?schema=public"
```

### 3. แก้ไข Prisma Schema

แก้ไข `web/prisma/schema.prisma` ตามความต้องการ:

```prisma
// เปลี่ยนชื่อ model
model User {
  // แก้ไข fields ตามความต้องการ
}

// เพิ่ม models ใหม่
model Product {
  id        String   @id @default(cuid())
  name      String
  price     Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4. ติดตั้ง Dependencies

```bash
# Web
cd web
npm install
npx prisma generate

# Mobile
cd ../mobile
npm install
```

### 5. ตั้งค่า Environment Variables

**Web (`.env.local`):**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/your_project_db?schema=public"
JWT_SECRET="your_secure_jwt_secret_here"
JWT_EXPIRES_IN="7d"
```

**Mobile (`.env.local`):**
```env
API_BASE_URL="http://localhost:3000"
```

### 6. เริ่มพัฒนา

1. **เพิ่มโค้ดใน placeholder files**
  - เริ่มจาก `web/src/app/page.tsx` (home page)
  - แล้วค่อยๆ เพิ่ม features อื่นๆ

2. **สร้าง API endpoints**
  - เพิ่มโค้ดใน `web/src/app/api/**/route.ts`
  - ใช้โครงสร้างที่มีอยู่เป็นแนวทาง

3. **สร้าง Mobile screens**
  - เพิ่มโค้ดใน `mobile/src/screens/*.tsx`
  - ใช้โครงสร้างที่มีอยู่เป็นแนวทาง

## 📁 โครงสร้างที่แนะนำให้เก็บไว้

### Web
- `src/app/` - Next.js App Router structure
- `src/lib/` - Utility functions
- `prisma/` - Database schema

### Mobile
- `src/screens/` - Screen components
- `src/services/` - API services
- `src/contexts/` - React Contexts
- `src/config/` - Configuration

## 🔧 Customization Tips

### เปลี่ยนชื่อ Role

ใน `web/prisma/schema.prisma`:
```prisma
enum Role {
  ADMIN
  MANAGER
  USER
  // เพิ่ม roles ใหม่ตามต้องการ
}
```

### เพิ่ม Models ใหม่

```prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  price     Float
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  // ... existing fields
  products  Product[]  // เพิ่ม relation
}
```

### เพิ่ม API Routes ใหม่

สร้าง folder ใหม่ใน `web/src/app/api/`:
```
api/
├── auth/
└── products/        # เพิ่มใหม่
    └── route.ts
```

### เพิ่ม Mobile Screens ใหม่

สร้างไฟล์ใหม่ใน `mobile/src/screens/`:
```
screens/
├── LoginScreen.tsx
├── RegisterScreen.tsx
├── DashboardScreen.tsx
└── ProductScreen.tsx  # เพิ่มใหม่
```

## 📝 Checklist สำหรับโปรเจกต์ใหม่

- [ ] Clone template
- [ ] เปลี่ยนชื่อโปรเจกต์ (package.json, docker-compose.yml)
- [ ] เปลี่ยนชื่อ database
- [ ] แก้ไข Prisma schema
- [ ] ติดตั้ง dependencies
- [ ] ตั้งค่า environment variables
- [ ] รัน Prisma migrate
- [ ] เพิ่มโค้ดใน placeholder files
- [ ] ทดสอบการทำงาน
- [ ] Commit และ push

## 🎨 Best Practices

1. **เก็บโครงสร้างไว้** - ใช้โครงสร้างที่มีอยู่เป็นแนวทาง
2. **Naming Convention** - ใช้ชื่อที่สอดคล้องกันทั้งโปรเจกต์
3. **Type Safety** - ใช้ TypeScript ให้เต็มที่
4. **Environment Variables** - อย่า commit `.env.local`
5. **Documentation** - อัปเดต README เมื่อเพิ่ม features ใหม่

## 📚 เอกสารเพิ่มเติม

- **Web App**: `web/README.md`
- **Database**: `web/README_DB.md`
- **Docker**: `README_DOCKER.md`
- **Mobile App**: `mobile/README.md`

## 🆘 ปัญหาที่พบบ่อย

### 1. Database connection failed

**แก้ไข:**
- ตรวจสอบว่า Docker container รันอยู่: `docker-compose ps`
- ตรวจสอบ `DATABASE_URL` ใน `.env.local`
- ตรวจสอบว่า database name ตรงกับ docker-compose.yml

### 2. Prisma Client not found

**แก้ไข:**
```bash
cd web
npx prisma generate
```

### 3. Module not found (@/...)

**แก้ไข:**
- ตรวจสอบ `tsconfig.json` และ `babel.config.js` (mobile)
- รีสตาร์ท dev server

## 💬 Support

หากมีคำถามหรือต้องการความช่วยเหลือ:
- ตรวจสอบ README files ในแต่ละโฟลเดอร์
- ดูเอกสารของแต่ละ technology stack
- สร้าง issue ใน repository (ถ้ามี)

---

**Happy Coding! 🚀**

