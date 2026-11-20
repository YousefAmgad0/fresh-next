# ShopMart — E-Commerce Web Application

ShopMart is a full-featured e-commerce web application built with **Next.js, React, and TypeScript**. It provides a complete shopping experience, allowing users to explore products, manage their shopping carts and wishlists, manage delivery addresses, and place orders using Stripe or Cash on Delivery.

The application integrates with the Route Egypt E-Commerce API for product data, authentication, and shopping operations.

**Live Demo:** [ShopMart](https://shopmart-khaki.vercel.app/)

**GitHub Repository:** [YousefAmgad0/fresh-next](https://github.com/YousefAmgad0/fresh-next)

---

## Features

### Authentication & Account Management
- User registration with form validation.
- Login and logout with NextAuth.js.
- Session management.
- Forgot password functionality.
- Change password functionality.
- Protected routes for authenticated users.

### Product Catalog
- Browse available products.
- View detailed product information.
- Product image carousel.
- Display product prices and ratings.
- Browse products by category.
- Browse products by brand.
- Navigate between products, categories, and brands.

### Shopping Cart
- Add products to the shopping cart.
- Increase or decrease product quantities.
- Remove individual products.
- Clear the entire cart.
- Display cart item count in the navigation bar.
- Calculate item subtotals and cart totals.
- Handle empty cart states.

### Wishlist
- Add products to the wishlist.
- View saved products.
- Remove products from the wishlist.
- Display the total number of saved products.
- Navigate directly to product details.

### Checkout & Payments
- Shipping information during checkout.
- Stripe Checkout for online payments.
- Cash on Delivery.
- Order creation through the API.

### Orders
- View order history.
- Display order information and purchased products.
- View order totals and payment methods.
- Track payment and delivery status.

### Address Management
- Add delivery addresses.
- View saved addresses.
- Remove saved addresses.

### User Experience
- Responsive layouts for different screen sizes.
- Loading indicators and skeleton states.
- Toast notifications for user feedback.
- Reusable UI components.
- Product navigation and breadcrumbs.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | App Router, server rendering, and application routing |
| React 19 | Building interactive user interfaces |
| TypeScript | Static typing and maintainable code |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | Reusable interface components |
| Radix UI | Accessible UI primitives |
| NextAuth.js | Authentication and session management |
| React Hook Form | Form state management |
| Zod | Form validation |
| Sonner | Toast notifications |
| Lucide React | Icons |
| Embla Carousel | Product image carousel |
| JWT Decode | Reading authentication token payloads |
| Route Egypt E-Commerce API | Backend and e-commerce operations |
| Stripe | Online payment processing |
| Vercel | Deployment and hosting |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YousefAmgad0/fresh-next.git
```

Navigate to the project directory:

```bash
cd fresh-next
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
NEXT_PUBLIC_BASE_URL=https://ecommerce.routemisr.com/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Base URL of the Route Egypt E-Commerce API |
| `NEXT_PUBLIC_APP_URL` | Application URL used when creating Stripe Checkout sessions |
| `NEXTAUTH_SECRET` | Secret used by NextAuth.js |

Generate a secure secret for `NEXTAUTH_SECRET` and replace the placeholder value.

For production deployment, configure the environment variables in your hosting provider and set `NEXT_PUBLIC_APP_URL` to your deployed application URL.

**Important:** Never commit `.env.local` or expose secret keys in your repository.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```text
src/
├── app/
│   ├── (auth)/             # Authentication pages
│   ├── (pages)/            # Main application pages
│   ├── _actions/           # Server Actions
│   ├── api/auth/           # NextAuth API route
│   ├── layout.tsx          # Root application layout
│   └── page.tsx            # Home page
│
├── components/
│   ├── cart/               # Shopping cart components
│   ├── common/             # Shared components
│   ├── products/           # Product components
│   ├── ui/                 # Reusable UI components
│   └── wishlist/           # Wishlist components
│
├── interfaces/             # TypeScript interfaces
├── lib/                    # Authentication and utilities
├── providers/              # React context providers
├── services/               # API service functions
└── proxy.ts                # Route access handling
```

---

## API & Payment Integration

ShopMart integrates with the **Route Egypt E-Commerce API** to handle product data, authentication, categories, brands, cart operations, wishlists, addresses, and orders.

For payments, the application supports:

- **Stripe Checkout:** Redirects users to Stripe's hosted checkout page through a checkout session created by the API.
- **Cash on Delivery:** Allows users to place orders with cash payment.

Both payment methods have been tested as part of the application's checkout flow.

---

## Deployment

The application is deployed on [Vercel](https://vercel.com/).

**Live Application:** [https://shopmart-khaki.vercel.app/](https://shopmart-khaki.vercel.app/)

---

## Author

**Yousef Amgad**

- [GitHub](https://github.com/YousefAmgad0)
- [ShopMart Repository](https://github.com/YousefAmgad0/fresh-next)
