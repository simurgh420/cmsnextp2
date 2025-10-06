import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// مسیرهایی که نیاز به احراز هویت دارند (ایجاد، ویرایش، حذف)
const isProtectedActionRoute = createRouteMatcher([
  '/categories/new',
  '/categories/edit(.*)',
  '/categories/[id]',
  '/products/new',
  '/products/edit(.*)',
  '/products/[id]',
  '/orders/new',
  '/orders/edit(.*)',
  '/orders/[id]',
  '/comments/new',
  '/comments/edit(.*)',
  '/comments/[id]',
]);
// مسیرهای عمومی (فقط مشاهده)
const isPublicViewRoute = createRouteMatcher([
  '/products',
  '/orders',
  '/comments',
  '/categories',
  '/dashboard',
  '/reports',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = new URL(req.url);

  // اگر کاربر لاگین نکرده و می‌خواهد به صفحات action دسترسی پیدا کند
  if (!userId && isProtectedActionRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // اگر کاربر لاگین کرده و می‌خواهد به صفحه sign-in/sign-up برود
  if (userId && (url.pathname === '/sign-in' || url.pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
});

export const config = {
  matcher: [
    // همه‌ی مسیرها به جز فایل‌های استاتیک و _next
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
