# ShopMart

ShopMart is an e-commerce web application built with Next.js and TypeScript. It connects to the Route Egypt E-commerce API and provides the main features of an online store, including product browsing, shopping cart management, wishlists, and order placement.

**Live Demo:** [ShopMart](https://shopmart-khaki.vercel.app/)

## Tech Stack

- **Next.js 16** – App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **NextAuth.js** – Authentication and session management
- **React Hook Form** – Form handling
- **Zod** – Form validation
- **shadcn/ui & Radix UI** – UI components
- **Lucide React** – Icons
- **Route Egypt E-commerce API** – Products, authentication, cart, and orders

## Features

### Authentication
- User registration and login
- Session management with NextAuth.js
- Forgot password request
- Change password

### Products
- Browse the available products
- View product details and images
- Display product ratings
- Browse products by category
- Browse products by brand

### Shopping Cart
- Add products to the cart
- Update product quantities
- Remove individual items
- Clear the cart
- View the cart item count

### Wishlist
- Add products to the wishlist
- View saved products
- Remove products from the wishlist

### Orders & Payments
- Place orders using Cash on Delivery
- Online payments through Stripe Checkout
- View order history and order status

### Addresses
- Add delivery addresses
- View saved addresses
- Remove addresses

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

Move into the project directory:

```bash
cd fresh-next
```

Install the dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_BASE_URL=https://ecommerce.routemisr.com/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the e-commerce API |
| `NEXT_PUBLIC_APP_URL` | Application URL used when creating a Stripe Checkout session |
| `NEXTAUTH_SECRET` | Secret used by NextAuth.js |

Replace `your_nextauth_secret` with a secure secret value.

When deploying the application, set `NEXT_PUBLIC_APP_URL` to your deployed application URL and configure the environment variables in your hosting provider.

Keep `.env.local` private and never commit it to the repository.

### Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
├── app/
│   ├── (auth)/          # Login, registration, and password pages
│   ├── (pages)/         # Products, cart, wishlist, orders, and addresses
│   ├── _actions/        # Server Actions
│   ├── api/auth/        # NextAuth API route
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
│
├── components/
│   ├── cart/            # Cart components
│   ├── common/          # Shared components
│   ├── products/        # Product components
│   ├── ui/              # Reusable UI components
│   └── wishlist/        # Wishlist components
│
├── interfaces/          # TypeScript interfaces
├── lib/                 # Authentication and utilities
├── providers/           # Authentication and cart providers
├── services/            # API service functions
└── proxy.ts             # Route access handling
```

## API & Payment Integration

ShopMart uses the Route Egypt E-commerce API to retrieve product, category, and brand data, and to handle authentication and shopping operations.

For online payments, the application requests a Stripe Checkout session through the API and redirects the user to the returned checkout URL.

## Author

**Yousef Amgad**

[GitHub](https://github.com/YousefAmgad0)