# Full-Stack Project Template

Template โครงสร้างโปรเจกต์ Full-Stack ที่รองรับทั้ง Web Application และ Mobile Application พร้อมระบบ Authentication และ Database setup

## 📁 โครงสร้างโปรเจกต์

```
PROJECT_NAME/
├── web/                          # Next.js Web Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── api/              # API Routes
│   │   │   │   └── auth/         # Authentication APIs
│   │   │   │       ├── login/    # Login endpoint
│   │   │   │       ├── logout/   # Logout endpoint
│   │   │   │       ├── me/       # Get current user
│   │   │   │       └── register/ # Register endpoint
│   │   │   ├── dashboard/        # Dashboard page
│   │   │   ├── login/            # Login page
│   │   │   ├── register/         # Register page
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── page.tsx          # Home page
│   │   └── lib/                  # Utility libraries
│   │       ├── auth.ts           # Authentication utilities
│   │       └── prisma.ts         # Prisma client
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── public/                   # Static assets
│   ├── package.json              # Dependencies
│   └── tsconfig.json             # TypeScript config
│
├── mobile/                       # React Native Mobile Application
│   ├── src/
│   │   ├── config/               # Configuration files
│   │   │   └── api.ts            # API base URL config
│   │   ├── contexts/             # React Contexts
│   │   │   └── AuthContext.tsx   # Authentication context
│   │   ├── screens/              # Screen components
│   │   │   ├── LoginScreen.tsx   # Login screen
│   │   │   ├── RegisterScreen.tsx # Register screen
│   │   │   └── DashboardScreen.tsx # Dashboard screen
│   │   └── services/              # API services
│   │       └── api.ts            # API client
│   ├── App.tsx                   # App entry point
│   ├── package.json              # Dependencies
│   └── tsconfig.json             # TypeScript config
│
├── docker-compose.yml            # PostgreSQL Docker setup
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

## 🏗️ โครงสร้าง Web Application (Next.js)

### App Router Structure
- **`src/app/`** - Next.js App Router pages และ routes
- **`src/app/api/`** - API routes สำหรับ backend endpoints
- **`src/app/api/auth/`** - Authentication API endpoints
- **`src/lib/`** - Shared utility functions และ libraries

### Key Files
- `src/app/layout.tsx` - Root layout component
- `src/app/page.tsx` - Home page
- `src/app/login/page.tsx` - Login page
- `src/app/register/page.tsx` - Register page
- `src/app/dashboard/page.tsx` - Dashboard page (protected)
- `src/lib/auth.ts` - Authentication helper functions
- `src/lib/prisma.ts` - Prisma client instance

## 📱 โครงสร้าง Mobile Application (React Native)

### Source Structure
- **`src/config/`** - Configuration files (API URLs, etc.)
- **`src/contexts/`** - React Context providers (Auth, etc.)
- **`src/screens/`** - Screen components (Login, Register, Dashboard)
- **`src/services/`** - API service layer

### Key Files
- `App.tsx` - Application entry point
- `src/config/api.ts` - API base URL configuration
- `src/contexts/AuthContext.tsx` - Authentication state management
- `src/services/api.ts` - API client (Axios)

## 🗄️ Database Structure

### Prisma Schema
   - **`web/prisma/schema.prisma`** - Database schema definition
   - User model with role-based access control
   - Authentication fields (email, password, etc.)
   - แก้ไข schema ตามความต้องการของโปรเจกต์

## 🐳 Docker Structure

### Docker Compose
   - **`docker-compose.yml`** - PostgreSQL container configuration
   - Database: `app_db` (เปลี่ยนได้ตามต้องการ)
   - Port: `5432`
   - Volume: `postgres_data`

## 🔧 Configuration Files

### Web
- `package.json` - Node.js dependencies
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration

### Mobile
- `package.json` - Node.js dependencies
- `tsconfig.json` - TypeScript configuration
- `babel.config.js` - Babel configuration
- `app.json` - Expo configuration

## 📝 Environment Variables

### Web (`.env.local`)
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
JWT_SECRET="your_jwt_secret_here"
JWT_EXPIRES_IN="7d"
```

### Mobile (`.env.local`)
```env
API_BASE_URL="http://localhost:3000"
```

## 🎯 การใช้งาน Template นี้

### ขั้นตอนการเริ่มต้นโปรเจกต์ใหม่

1. **Clone หรือ Fork** template นี้
   ```bash
   git clone <template-repo-url> your-project-name
   cd your-project-name
   ```

2. **เปลี่ยนชื่อโปรเจกต์** (ถ้าต้องการ)
   - แก้ไข `package.json` ใน `web/` และ `mobile/`
   - แก้ไข `docker-compose.yml` (container name, database name)
   - แก้ไข `prisma/schema.prisma` (models ตามความต้องการ)

3. **ติดตั้ง dependencies**
   ```bash
   # Web
   cd web
   npm install
   
   # Mobile
   cd ../mobile
   npm install
   ```

4. **ตั้งค่า environment variables**
   - สร้าง `.env.local` ใน `web/` และ `mobile/`
   - ดูตัวอย่างใน `.env.example`

5. **ตั้งค่า Database**
   ```bash
   # รัน PostgreSQL
   docker-compose up -d
   
   # รัน Prisma migrate
   cd web
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. **เริ่มพัฒนา**
   - เพิ่มโค้ดลงในไฟล์ placeholder ที่เตรียมไว้
   - แก้ไข schema ตามความต้องการ
   - สร้าง features ใหม่ตามโครงสร้างที่มีอยู่

### 💡 คำแนะนำสำหรับ Template

- **โครงสร้างนี้เป็น Template** - ไม่มีโค้ดจริง มีเฉพาะโครงสร้างและ placeholder
- **แก้ไขตามความต้องการ** - ปรับ schema, models, และ features ตามโปรเจกต์ของคุณ
- **เก็บโครงสร้างไว้** - โครงสร้าง folder และ naming convention ถูกออกแบบมาให้ใช้งานง่าย
- **เพิ่ม Features** - สร้าง features ใหม่ตามโครงสร้างที่มีอยู่

## 📚 เอกสารเพิ่มเติม

- **Template Usage**: `TEMPLATE_USAGE.md` - คู่มือการใช้งาน template
- **Web App**: `web/README.md`
- **Database**: `web/README_DB.md`
- **Docker**: `README_DOCKER.md`
- **Mobile App**: `mobile/README.md`

## 🛠️ Tech Stack

### Web
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Mobile
- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- Expo Secure Store

### Infrastructure
- Docker
- PostgreSQL

## 📄 License

[Your License Here]
