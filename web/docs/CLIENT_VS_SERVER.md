# 'use client' ใน Next.js App Router

## ภาพรวม

Next.js App Router (Next.js 13+) แบ่ง component เป็น 2 ประเภท:

1. **Server Component** (ค่า default) - รันฝั่ง server เท่านั้น
2. **Client Component** - รันฝั่ง browser (ต้องมี `'use client'`)

## ทำไมต้องใช้ 'use client'?

### Server Component (ไม่มี 'use client')

```tsx
// src/app/dashboard/page.tsx
import { cookies } from 'next/headers'; // ✅ ใช้ได้เฉพาะ server
import { verifyAuthToken } from '@/lib/auth';

export default async function DashboardPage() {
  // ✅ ใช้ async/await ได้
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  // ✅ อ่าน DB, API calls ได้โดยตรง
  // ✅ ไม่ส่งโค้ด JavaScript ไปที่ browser (เล็กกว่า, เร็วกว่า)
  
  return <div>Dashboard</div>;
}
```

**ข้อจำกัด:**
- ❌ ใช้ `useState`, `useEffect`, `onClick` ไม่ได้
- ❌ ใช้ browser APIs (`window`, `localStorage`) ไม่ได้
- ❌ ไม่มี interactivity (ปุ่มกด, form submit)

### Client Component (มี 'use client')

```tsx
// src/app/login/page.tsx
'use client'; // ⚠️ ต้องใส่บรรทัดแรก

import { useState } from 'react';

export default function LoginPage() {
  // ✅ ใช้ useState, useEffect, event handlers ได้
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ ใช้ fetch, onClick, onChange ได้
    await fetch('/api/auth/login', { ... });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

**ข้อจำกัด:**
- ❌ ใช้ `cookies()` จาก `next/headers` ไม่ได้ (ต้องใช้ `document.cookie` หรือ API route)
- ❌ ใช้ `async` component ไม่ได้ (แต่ใช้ async function ใน event handler ได้)

## เปรียบเทียบในโปรเจกต์นี้

### หน้า Login (`src/app/login/page.tsx`)
```tsx
'use client'; // ✅ ต้องมี เพราะใช้ useState, onChange, onSubmit
```

**เหตุผล:**
- ใช้ `useState` เพื่อเก็บค่า email, password
- ใช้ `onChange` เพื่ออัปเดต state
- ใช้ `onSubmit` เพื่อส่ง form

### หน้า Dashboard (`src/app/dashboard/page.tsx`)
```tsx
// ❌ ไม่มี 'use client' = Server Component
import { cookies } from 'next/headers'; // ✅ ใช้ได้
```

**เหตุผล:**
- อ่าน cookie จาก server โดยตรง (ปลอดภัยกว่า)
- ไม่ต้องใช้ interactivity (แค่แสดงข้อมูล)
- โค้ด JavaScript ไม่ถูกส่งไปที่ browser (เล็กกว่า)

## สรุป

| คุณสมบัติ | Server Component | Client Component |
|-----------|------------------|------------------|
| `'use client'` | ❌ ไม่ต้องใส่ | ✅ ต้องใส่ |
| `useState`, `useEffect` | ❌ ใช้ไม่ได้ | ✅ ใช้ได้ |
| `onClick`, `onChange` | ❌ ใช้ไม่ได้ | ✅ ใช้ได้ |
| `cookies()` จาก `next/headers` | ✅ ใช้ได้ | ❌ ใช้ไม่ได้ |
| อ่าน DB โดยตรง | ✅ ใช้ได้ | ❌ ใช้ไม่ได้ (ต้องผ่าน API) |
| ส่งโค้ดไปที่ browser | ❌ ไม่ส่ง | ✅ ส่ง (ใหญ่กว่า) |
| SEO | ✅ ดีกว่า (SSR) | ⚠️ ต้องใช้ SSR ด้วย |

## หลักการใช้งาน

1. **ใช้ Server Component เป็นค่า default** (ไม่ใส่ `'use client'`)
   - เมื่อไม่ต้องใช้ interactivity
   - เมื่อต้องการอ่าน DB, cookie, API โดยตรง

2. **ใช้ Client Component เมื่อจำเป็น** (ใส่ `'use client'`)
   - เมื่อต้องใช้ `useState`, `useEffect`
   - เมื่อต้องใช้ event handlers (`onClick`, `onChange`, `onSubmit`)
   - เมื่อต้องใช้ browser APIs

3. **ผสมกันได้** - Server Component สามารถ import Client Component ได้

```tsx
// Server Component
import ClientButton from './ClientButton';

export default function ServerPage() {
  return (
    <div>
      <p>Server Component</p>
      <ClientButton /> {/* Client Component */}
    </div>
  );
}
```

## ตัวอย่างเพิ่มเติม

### ตัวอย่างที่ต้องใช้ 'use client'

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### ตัวอย่างที่ไม่ต้องใช้ 'use client'

```tsx
// ไม่มี 'use client' = Server Component
import { prisma } from '@/lib/prisma';

export default async function UserList() {
  const users = await prisma.user.findMany(); // ✅ อ่าน DB โดยตรง
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}
```

