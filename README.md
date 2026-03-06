# Shoppy E‑Commerce

Shoppy is a full‑stack e‑commerce application designed to demonstrate scalable
architecture, type‑safe development, and real‑world commerce flows. It includes
authentication, product CRUD, Stripe checkout, promo codes, confirmation emails,
search, filtering, favorites, and a smooth, responsive UI.

**Live Demo:** https://shoppy.dev-ltd.cloud

---

## Highlights

- **Monorepo architecture** using Next.js, TypeScript, Prisma, and PostgreSQL
- **Secure Stripe checkout** with server‑side validation and promo code support
- **Authentication & authorization** powered by Clerk
- **Transactional emails** via Resend (order confirmations)
- **Admin dashboard** for product management (CRUD, stock, pricing)
- **Modern shopping experience** with filtering, search, favorites, basket
  logic, “buy it now,” and “buy again”
- **Optimistic UI updates** for a fast, responsive feel

---

## Tech Stack

### **Frontend**

- **Framework:** React 19 + Next.js (App Router)
- **Language:** TypeScript
- **UI Components:** Shadcn-UI
- **Styling:** Tailwind CSS
- **Transactional Emails:** Resend
- **Authentication:** Clerk
- **State Management / Store:** Zustand

### **Backend**

- **Framework:** Next.js server routes / API routes / Server Actions
- **Language:** TypeScript
- **Database:** PostgreSQL and Prisma

### **Infrastructure**

- Stripe for payments
- Clerk for auth & RBAC
- Resend for transactional emails
- Cloud hosting (Cloud Run / Render)
- Environment‑based configuration

---

## Core Features

### User Experience

- Product browsing with filtering & search
- Favorites system with instant UI updates
- Basket logic with quantity management
- “Buy it now” for single‑item checkout
- “Buy again” for quick repeat purchases
- Optimistic updates for responsiveness

### Commerce Logic

- Stripe checkout session creation
- Promo code validation
- Secure server‑side payment handling
- Order creation & confirmation emails

### Admin Dashboard

- Product CRUD (create, update, delete)
- Stock, pricing, and metadata management
- Image uploads
- Role‑based access (admin vs. customer)

---

## Database Design

The PostgreSQL schema is modeled with Prisma and supports:

- Products, categories, and variants
- Orders, order items, and payment metadata
- Favorites and user‑product relationships
- Promo codes and discount logic
- Clerk user IDs for authentication consistency

The schema is optimized for clean relational modeling and predictable queries.

---
