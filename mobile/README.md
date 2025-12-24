# Mobile Application (React Native + Expo)

Mobile Application template ที่ใช้ React Native + Expo รองรับทั้ง iOS และ Android จาก code เดียวกัน พร้อมระบบ Authentication และ API integration

## 🚀 เทคโนโลยีที่ใช้

- **React Native** - Framework สำหรับสร้าง mobile app
- **Expo** - Toolchain และ runtime สำหรับ React Native
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **Axios** - HTTP client สำหรับเรียก API
- **Expo Secure Store** - เก็บ JWT token อย่างปลอดภัย

## ✨ คุณสมบัติ

- ✅ Login / Register
- ✅ JWT Authentication (เก็บ token ใน secure storage)
- ✅ Dashboard แสดงข้อมูลผู้ใช้
- ✅ Role-based access (USER, MANAGER, ADMIN)
- ✅ ใช้ code เดียวกันสำหรับ iOS และ Android
- ✅ TypeScript path alias (`@/...`)

## 📋 ความต้องการของระบบ

- Node.js 18+ 
- npm หรือ yarn
- สำหรับ iOS: ต้องใช้ macOS + Xcode (หรือใช้ Expo Go app)
- สำหรับ Android: Android Studio (หรือใช้ Expo Go app)

## 🛠️ การติดตั้งและรัน

### 1. ติดตั้ง Dependencies

```bash
cd mobile
npm install
# หรือ
yarn install
```

### 2. ตั้งค่า API URL

แก้ไขไฟล์ `src/config/api.ts`:

```typescript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000' // สำหรับ iOS Simulator / Android Emulator
  : 'https://your-production-domain.com';
```

**สำคัญ:** ถ้าใช้ **physical device** (มือถือจริง) ให้เปลี่ยนเป็น IP address ของเครื่องที่รัน Next.js backend

ตัวอย่าง:
```typescript
export const API_BASE_URL = 'http://192.168.1.100:3000';
```

หา IP address ได้จาก:
- Windows: `ipconfig` (ดู IPv4 Address)
- Mac/Linux: `ifconfig` (ดู inet)

### 3. รัน Next.js Backend ก่อน

ต้องรัน Next.js backend ให้พร้อมก่อน (ดู `../web/README.md`)

```bash
cd ../web
yarn dev
```

Backend จะรันที่ `http://localhost:3000`

### 4. รัน Mobile App

#### วิธีที่ 1: ใช้ Expo Go (แนะนำสำหรับทดสอบ)

1. ติดตั้ง Expo Go app บนมือถือ:
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. รัน development server:

```bash
cd mobile
npm start
# หรือ
yarn start
```

3. Scan QR code ที่แสดงใน terminal ด้วย Expo Go app

#### วิธีที่ 2: ใช้ iOS Simulator (ต้องใช้ macOS)

```bash
npm run ios
# หรือ
yarn ios
```

#### วิธีที่ 3: ใช้ Android Emulator

```bash
npm run android
# หรือ
yarn android
```

## 📱 หน้าจอในแอป

### Login Screen (`/src/screens/LoginScreen.tsx`)
- หน้าเข้าสู่ระบบ
- กรอก email และ password
- มีลิงก์ไปหน้า Register

### Register Screen (`/src/screens/RegisterScreen.tsx`)
- หน้าสมัครสมาชิก
- กรอก email, name (ไม่บังคับ), password, role
- หลังจากสมัครสำเร็จจะ login อัตโนมัติ

### Dashboard Screen (`/src/screens/DashboardScreen.tsx`)
- หน้าหลักหลัง login
- แสดงข้อมูลผู้ใช้ (email, name, role)
- ปุ่มออกจากระบบ

## 🏗️ โครงสร้างโปรเจกต์

```
mobile/
├── src/
│   ├── config/
│   │   └── api.ts          # API configuration
│   ├── contexts/
│   │   └── AuthContext.tsx # Auth context สำหรับจัดการ user state
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── DashboardScreen.tsx
│   └── services/
│       └── api.ts          # API client (axios)
├── App.tsx                 # Main app component
├── babel.config.js         # Babel config สำหรับ path alias
├── tsconfig.json           # TypeScript config
└── package.json
```

## 🔐 การทำงานของ Authentication

1. **Login**: เรียก `POST /api/auth/login` → รับ `token` → เก็บใน Secure Store
2. **API Calls**: ทุก request จะมี header `Authorization: Bearer <token>` อัตโนมัติ
3. **Token Expired**: ถ้า API ตอบ 401 → ลบ token และ redirect ไป Login
4. **Logout**: ลบ token จาก Secure Store

## 🌐 การเชื่อมต่อกับ Backend

Mobile app เรียก API จาก Next.js backend:

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout (optional)

ดูรายละเอียด API ใน `../web/README.md`

## 🐛 Troubleshooting

### 1. ต่อ API ไม่ได้ (Network Error)

**ปัญหา:** Mobile app เรียก API ไม่ได้

**วิธีแก้:**
- ถ้าใช้ **physical device**: เปลี่ยน `API_BASE_URL` เป็น IP address ของเครื่อง (ไม่ใช่ `localhost`)
- เช็คว่า Next.js backend รันอยู่จริง
- เช็คว่า mobile device อยู่ใน network เดียวกันกับเครื่องที่รัน backend
- ถ้าใช้ Android Emulator: ใช้ `http://10.0.2.2:3000` แทน `localhost`

### 2. Module not found (@/...)

**ปัญหา:** TypeScript path alias ไม่ทำงาน

**วิธีแก้:**
- รีสตาร์ท Metro bundler (กด `r` ใน terminal ที่รัน `npm start`)
- ลบ cache: `npm start -- --reset-cache`

### 3. Token ไม่ถูกเก็บ

**ปัญหา:** Login สำเร็จแต่ token หาย

**วิธีแก้:**
- เช็คว่า `expo-secure-store` ติดตั้งแล้ว
- สำหรับ iOS Simulator: Secure Store ทำงานได้ปกติ
- สำหรับ Android Emulator: ต้องมี lock screen password

### 4. iOS Build Error

**ปัญหา:** `npm run ios` ไม่ทำงาน

**วิธีแก้:**
- ต้องใช้ macOS + Xcode
- หรือใช้ Expo Go app แทน

## 📦 Build สำหรับ Production

### iOS

```bash
# ต้องใช้ macOS
npm run ios -- --configuration Release
```

หรือใช้ EAS Build (Expo Application Services):
```bash
npm install -g eas-cli
eas build --platform ios
```

### Android

```bash
npm run android -- --variant release
```

หรือใช้ EAS Build:
```bash
eas build --platform android
```

## 📚 เอกสารเพิ่มเติม

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Documentation](https://reactnative.dev/)

## ✅ ใช้ Code เดียวกันสำหรับ iOS และ Android

**ใช่!** React Native + Expo ใช้ code เดียวกันสำหรับทั้ง iOS และ Android

- **UI Components**: ใช้ React Native components (`View`, `Text`, `TouchableOpacity`) ที่ทำงานได้ทั้ง 2 platform
- **Navigation**: React Navigation รองรับทั้ง iOS และ Android
- **API Calls**: Axios ทำงานได้ทั้ง 2 platform
- **Secure Storage**: Expo Secure Store ใช้ Keychain (iOS) และ Keystore (Android) อัตโนมัติ

**ความแตกต่างเล็กน้อย:**
- iOS: ใช้ Keychain สำหรับ secure storage
- Android: ใช้ EncryptedSharedPreferences
- แต่คุณไม่ต้องเขียน code แยก เพราะ Expo จัดการให้อัตโนมัติ

## 🎯 ขั้นตอนต่อไป

- เพิ่มหน้าใหม่ (เช่น Employee List, Leave Request)
- เพิ่ม Push Notifications
- เพิ่ม Image Upload
- เพิ่ม Offline Support

