# CMSNextP2 – پنل مدیریت فارسی (RTL) با Next.js 15

[![Next.js](https://img.shields.io/badge/Next.js-15-black)]()
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-336791)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC)]()
[![Clerk](https://img.shields.io/badge/Auth-Clerk-orange)]()

یک **پنل مدیریت مدرن و راست‌چین (RTL-first)** برای CMS و فروشگاه آنلاین، ساخته‌شده با **Next.js 15، Prisma و PostgreSQL**.  
این پروژه به‌عنوان یک **نمونه کامل برای رزومه** طراحی شده و معماری سه‌لایه (Presentation → Application → Infrastructure) را پیاده‌سازی می‌کند.




## 🌐 نمایش زنده

[مشاهده دمو آنلاین](https://cmsnextp2.vercel.app/dashboard) 🚀

---

## 🚀 تکنولوژی‌ها

| لایه | ابزارها |
|------|---------|
| Presentation | Next.js 15 (App Router), Tailwind v4 (RTL), shadcn/ui, React Hook Form + Zod |
| Application  | Zustand (state), Sonner (toast), Custom Hooks (pagination, search) |
| Infrastructure | Prisma ORM, PostgreSQL, Clerk (Auth & Middleware), Husky (CI/CD) |

---

## ✨ ویژگی‌های کلیدی
- 🎨 **RTL-first UI** با تم تاریک/روشن  
- 🔐 **Granular Access Control**: مشاهده آزاد، CRUD فقط برای کاربران لاگین‌شده  
- 📊 **داشبورد تحلیلی** با Recharts و KPI  
- 🧩 **کامپوننت‌های ماژولار** (Table, Form, Dialog, Pagination)  
- 🔔 **سیستم نوتیفیکیشن یکپارچه** (Sonner + Zustand)  
- 🛠 **معماری سه‌لایه**: جداسازی کامل UI، منطق دامنه و دیتابیس  
- 🚀 **SEO & Performance**: SSR, ISR, SSG  

---

## 📁 ساختار پروژه
\`\`\`
src/
├── app/ (admin routes, api, auth pages)
├── components/ (ui, layout, features)
├── application/ (business logic & services)
├── lib/ (utils, validation, prisma client)
├── stores/ (zustand)
├── prisma/ (schema & migrations)
└── public/ (assets)
\`\`\`

---

## 🔒 احراز هویت و دسترسی
- Clerk برای مدیریت Auth و Middleware  
- Public: مشاهده محصولات، سفارشات، نظرات  
- Protected: CRUD فقط برای کاربران لاگین‌شده  
- Role-based Extensibility آماده (قابل توسعه برای Admin/Editor/Viewer)  

---

## 🛠 راه‌اندازی
\`\`\`bash
git clone <repo>
cd cmsnextp2
npm install
cp .env.example .env   # Clerk & DATABASE_URL
npx prisma migrate dev
npm run dev
\`\`\`

---

## 📊 مدل‌های دیتابیس (Prisma)
- Product, Order, Category, Comment, User  
(با روابط و اعتبارسنجی کامل)

---

## 📝 نکات رزومه
- معماری مدرن و ماژولار  
- RTL-first Design  
- Granular Access Control  
- DRY Skeletons & Loading States  
- CI/CD با Husky + Vercel  

---

## 📄 لایسنس
MIT

## 👤 توسعه‌دهنده
[@simurgh420](https://github.com/simurgh420)
