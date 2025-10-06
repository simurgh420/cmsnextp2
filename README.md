# CMSNextP2 - پنل مدیریت فارسی (RTL) با Next.js 15

یک پنل مدیریت حرفه‌ای برای سیستم‌های CMS و فروشگاه آنلاین با تمرکز بر پشتیبانی کامل از زبان فارسی و راست‌چین (RTL)، ساخته شده با Next.js 15، Prisma و PostgreSQL.

---

## 🚀 تکنولوژی‌ها و ابزارهای اصلی

- **Next.js 15** (App Router, SSR, ISR, SSG)
- **TypeScript** (strict)
- **Prisma ORM** + **PostgreSQL**
- **Tailwind CSS v4** (RTL, custom theme)
- **shadcn/ui** (Radix primitives, Table, Dialog, Form, ... )
- **React Hook Form** + **Zod** (اعتبارسنجی فرم)
- **Clerk** (احراز هویت و محافظت از مسیرها)
- **Zustand** (مدیریت نوتیفیکیشن)
- **Sonner** (toast notifications)
- **Lucide React** و **React Icons**
- **Recharts** (نمودارها و داشبورد)
- **Husky** (pre-commit hooks)
- **Turbopack** (dev/build)

---

## 📁 ساختار پروژه

```
src/
├── app/
│   ├── (admin)/
│   │   ├── dashboard/      # داشبورد مدیریتی
│   │   ├── products/       # محصولات (CRUD)
│   │   ├── orders/         # سفارشات (CRUD)
│   │   ├── categories/     # دسته‌بندی‌ها (CRUD)
│   │   ├── comments/       # نظرات (CRUD)
│   │   ├── reports/        # گزارشات و آمار
│   │   └── settings/       # تنظیمات سیستم
│   ├── api/                # API routes (نمونه و توسعه)
│   ├── sign-in/            # صفحه ورود Clerk
│   ├── sign-up/            # صفحه ثبت‌نام Clerk
│   ├── [`src/app/layout.tsx`](src/app/layout.tsx )          # Root layout (RTL, ClerkProvider, Toaster)
│   ├── [`src/app/globals.css`](src/app/globals.css )         # استایل پایه و تم
│   └── [`src/app/page.tsx`](src/app/page.tsx )            # صفحه اصلی (public)
├── components/
│   ├── ui/                 # کامپوننت‌های پایه (Button, Table, ...)
│   ├── layout/             # Header, Sidebar (config-driven)
│   ├── products/           # فرم و جدول محصولات
│   ├── orders/             # فرم و جدول سفارشات
│   ├── categories/         # فرم و جدول دسته‌بندی‌ها
│   ├── dashboard/          # داشبورد و چارت‌ها
│   ├── reports/            # گزارشات و نمودارها
│   ├── notifications/      # Dropdown و آیکون نوتیفیکیشن
│   ├── settings/           # تنظیمات سیستم و کاربر
│   └── [`src/components/Pagination.tsx`](src/components/Pagination.tsx )      # کامپوننت صفحه‌بندی
├── hooks/                  # هوک‌های سفارشی (pagination, search)
├── lib/                    # ابزارها، types، اعتبارسنجی، prisma
├── stores/                 # Zustand store (notifications)
├── application/            # سرویس‌های دامنه (business logic)
├── prisma/                 # مدل‌های دیتابیس و migrations
└── public/                 # تصاویر و assets
```

---

## ✨ ویژگی‌های کلیدی

- **پنل مدیریت کاملاً فارسی و راست‌چین (RTL)**
- **سیستم مدیریت محصولات، سفارشات، دسته‌بندی‌ها و نظرات (CRUD)**
- **داشبورد تحلیلی با نمودارهای Recharts**
- **گزارشات پیشرفته و KPI**
- **فرم‌های پیشرفته با اعتبارسنجی Zod**
- **نوتیفیکیشن toast و dropdown با Sonner و Zustand**
- **محافظت از مسیرها با Clerk (middleware)**
- **طراحی واکنش‌گرا و تم تاریک/روشن**
- **کد تمیز و تایپ‌سیف با TypeScript**
- **پشتیبانی از SSR, ISR, SSG برای بهینه‌سازی SEO و سرعت**
- **پوشه‌بندی و معماری مدرن (App Router, Parallel Routes, Layouts)**

---

## 🛠 راه‌اندازی و توسعه

### پیش‌نیازها

- Node.js 18+
- PostgreSQL
- npm یا yarn

### مراحل نصب

1. کلون پروژه:

   ```bash
   git clone <repository-url>
   cd cmsnextp2
   ```

2. نصب وابستگی‌ها:

   ```bash
   npm install
   ```

3. تنظیم متغیرهای محیطی:

   ```bash
   cp .env.example .env
   # مقادیر Clerk و DATABASE_URL را وارد کنید
   ```

4. راه‌اندازی دیتابیس:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma studio
   ```

5. اجرای پروژه:
   ```bash
   npm run dev
   ```

---

## 🔒 احراز هویت و محافظت از مسیرها

- **Clerk** برای احراز هویت استفاده شده است.
- **middleware.ts** فقط اجازه ایجاد/ویرایش/حذف را به کاربران لاگین‌شده می‌دهد.
- مشاهده لیست محصولات، سفارشات و ... برای همه آزاد است، اما برای افزودن/ویرایش/حذف باید وارد شوید.
- دکمه‌های action (ویرایش/حذف) فقط برای کاربران لاگین‌شده فعال هستند.

---

## 🧩 معماری و الگوهای کدنویسی

- **App Router**: هر بخش admin یک route جداگانه دارد.
- **Layouts**: لایه‌بندی چندگانه (root, admin, section).
- **Sidebar/Navigation**: مبتنی بر config و آیکون‌های Lucide/React-Icons.
- **فرم‌ها**: react-hook-form + zodResolver، نمایش خطا با FormMessage.
- **کامپوننت‌های UI**: shadcn/ui (Button, Table, Dialog, ...).
- **نوتیفیکیشن**: Sonner برای toast و Zustand برای dropdown.
- **هوک‌های سفارشی**: usePagination, useSearch.
- **کد تمیز**: استفاده از TypeScript، تفکیک props، و الگوهای best practice.

---

## 📊 مدل‌های دیتابیس (Prisma)

- **Product**: id, name, price, status, image, categoryId, ...
- **Order**: id, productId, userId, quantity, status, createdAt, ...
- **Category**: id, name, slug, ...
- **Comment**: id, productId, userId, text, status, ...
- **User**: id, email, name, ...

---

## 🧪 تست و توسعه

- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint/Format**: `npm run lint` / `npm run format`
- **Prisma Studio**: `npm run studio`
- **Migrate**: `npm run migrate`
- **Generate**: `npm run generate`

---

## 📝 نکات مهم برای رزومه

- **معماری مدرن**: App Router، SSR/ISR، Prisma، Clerk، Zustand
- **کد تمیز و خوانا**: رعایت separation of concerns، تایپ‌سیف، پوشه‌بندی حرفه‌ای
- **UI/UX حرفه‌ای**: RTL، تم تاریک/روشن، واکنش‌گرا، نوتیفیکیشن پیشرفته
- **امنیت**: محافظت از مسیرهای حساس با Clerk و middleware
- **قابلیت توسعه**: افزودن راحت ماژول‌های جدید (مثلاً مشتریان، فاکتورها، ...)

---

## 📄 لایسنس

MIT

---

## 👤 توسعه‌دهنده

- [نام شما] - توسعه‌دهنده اصلی

---

**این پروژه یک نمونه کامل برای رزومه و نمایش مهارت‌های توسعه فول‌استک مدرن است.**

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
