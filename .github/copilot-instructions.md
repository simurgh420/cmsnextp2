# Copilot Instructions for CMSNextP2

## Architecture Overview

This is a Next.js 15 project using the App Router, serving as a Persian (RTL) admin dashboard for a CMS/e-commerce system. It manages entities like products, orders, customers, categories, reports, and settings via Prisma-backed PostgreSQL.

- **Routing**: App Router with parallel routes. Public root at `src/app/page.tsx` (placeholder). Admin routes under `(admin)` group: `/admin/dashboard`, `/admin/products`, etc. Dynamic segments like `[id]/page.tsx` for details/edit.
- **Layouts**: Root `src/app/layout.tsx` sets RTL (`dir="rtl"`, `lang="fa"`), Geist fonts, Tailwind globals. Admin-specific `src/app/(admin)/layout.tsx` wraps children in basic HTML structure. Section layouts (e.g., `src/app/(admin)/products/layout.tsx`) add headers/breadcrumbs.
- **Components**:
  - UI: shadcn/ui primitives in `src/components/ui/` (Button, Input, Table, Form, Dialog, Select from Radix + Tailwind).
  - Layout: `src/components/layout/` with Sidebar (`Sidebar.tsx` using config-driven nav items with react-icons/lucide) and Header.
  - Domain: `src/components/products/` (ProductForm with react-hook-form/zod, ProductsTable mapping to ProductRow with actions).
- **Data Layer**: Prisma in `prisma/schema.prisma` (e.g., Product model with name, price, status enum). Currently using mocks in `src/application/products/products.mock.ts`; replace with `import { PrismaClient } from '@prisma/client'` in server components for real queries (e.g., `prisma.product.findMany()`).
- **Business Logic**: Types in `src/application/products/products.types.ts`. Mocks for dev; future API routes in `src/app/api/`.
- **Styling**: Tailwind CSS v4 (PostCSS config), custom theme in `src/app/globals.css` (background/foreground vars, dark mode). RTL via dir="rtl". Animations via tw-animate-css.

Data flow example: In `src/app/(admin)/products/page.tsx` (client component), load `mockProducts`, compute stats, pass to `ProductsTable` → `ProductRow` (handles edit/delete via Link/Dialog). For production, shift to server component: `async function ProductsPage() { const products = await prisma.product.findMany(); return <ProductsTable products={products} />; }`.

## Conventions and Patterns

- **TypeScript**: Strict (`tsconfig.json`), infer types from Zod schemas or Prisma. Use `Omit<Product, 'id'>` for create forms. Props typed with FC<Props>.
- **Components**: Functional, 'use client' for interactivity (forms, state). Colocate with routes. Export default for pages.
- **Forms**: react-hook-form + zodResolver. Schema in component (e.g., `z.object({ name: z.string().min(2), price: z.number().min(1000) })`). shadcn FormField for validation display.
- **Navigation**: Next.js Link for routing. Sidebar config in `src/components/layout/Sidebar/Sidebar.config.ts` (array of {label, href, icon}). Active state via `usePathname().startsWith(href)`.
- **Actions**: Console.log for prototypes (e.g., handleSubmit, handleDelete). Use Dialog for confirmations. Links for edit (`/products/edit/[id]` – note: align with route structure).
- **Icons**: react-icons (FaPlus) or lucide-react (MdDashboard). Size 16-20px.
- **Internationalization**: All UI text in Persian. Use toLocaleString() for numbers (e.g., price).
- **Error Handling**: FormMessage for validation. No global yet; add try/catch in async fetches.

Example pattern: ProductRow uses TableRow, conditional status badge (`text-green-600` for active), Link to edit, DialogTrigger for delete.

## Developer Workflows

- **Run Dev**: `npm run dev` (Turbopack enabled, http://localhost:3000). Admin at `/admin/...`.
- **Build/Start**: `npm run build` (Turbopack), `npm run start`.
- **Lint/Format**: `npm run lint` (ESLint flat config, next/core-web-vitals, some TS rules off like no-unused-vars). `npm run format` (Prettier).
- **Prisma**:
  - Generate client: `npx prisma generate`.
  - Migrate: `npx prisma migrate dev --name <description>`.
  - Studio (DB viewer): `npx prisma studio`.
  - Reset dev DB: `npx prisma migrate reset` (destructive, confirm!).
  - Env: Set `DATABASE_URL` in `.env` for PostgreSQL.
- **shadcn/ui**: Add components via CLI (if installed) or copy from `src/components/ui/`. Update `components.json` for config.
- **Dependencies**: `npm install <pkg>`. Husky for pre-commit (via prepare script).
- **Debugging**: Console.log in handlers. Use VS Code debugger for Next.js. Check Prisma logs in terminal.

No tests configured; add Vitest/Jest if needed, place in `__tests__/` or colocate.

## Integrations and Dependencies

- **Prisma**: '@prisma/client' for queries. Models: Product (id: cuid, name, price: Float, status: Status enum, image?). Expand schema for Order, Customer, etc.
- **UI Libs**: shadcn/ui (Radix primitives, cva for variants, clsx/tailwind-merge for classes). Lucide/react-icons for icons.
- **Forms/Validation**: react-hook-form, zod (@hookform/resolvers).
- **Next.js**: v15 features (async components, Turbopack). Metadata in layouts/pages.
- **External**: No auth (add NextAuth.js). Images in `public/` (noImage.jpg fallback). Future: API routes for CRUD, upload to cloud (e.g., Uploadthing).

Key files:
- `prisma/schema.prisma`: DB models.
- `src/app/(admin)/products/page.tsx`: List with mocks/stats.
- `src/components/products/ProductForm.tsx`: Form with validation.
- `src/components/layout/Sidebar/Sidebar.tsx`: Responsive nav.
- `package.json`: Scripts/deps (next@15, prisma@6, react@19).
- `.CATEGORIES_LEARNING_GUIDE.md`: Project structure guide (not code, but helpful for patterns).

Follow these to maintain consistency: Use mocks for UI dev, switch to Prisma for data persistence. Prioritize RTL/Persian text in new components.
