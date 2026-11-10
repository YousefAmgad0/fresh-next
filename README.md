ShopMart
ShopMart is an e-commerce web application frontend built with Next.js, React, and TypeScript. It connects to the Route Egypt E-commerce REST API and provides a shopping experience that covers product discovery, customer accounts, cart and wishlist management, checkout, saved addresses, and order history.

The application uses the Next.js App Router, server-rendered pages for catalog data, client-side components for interactive workflows, and Server Actions for authenticated operations that communicate with the backend API.
Features
Product discovery

- Browse the available product catalog.
- Open individual product pages with product images, brand and category information, prices, and ratings.
- Explore products by category or brand.
- View related products within a selected category or brand.
  Customer accounts
- Create an account and sign in with email and password.
- Sign in through NextAuth's Credentials provider, backed by the e-commerce API.
- Sign out and access account-related pages through the user menu.
- Request a password-reset email.
- Change the password while signed in.
- Validate registration and login form data with React Hook Form and Zod.
- Protect account pages and redirect users according to their authentication state.
  Shopping cart and wishlist
- Add products to the shopping cart.
- View cart items and update product quantities.
- Remove individual items or clear the cart.
- See the cart item count in the shared navigation.
- Add products to a wishlist, view saved products, and remove them.
  Checkout and orders
- Enter shipping details during checkout.
- Choose Cash on Delivery or Stripe-hosted checkout through the backend checkout-session endpoint.
- View previous orders, purchased products, totals, payment methods, and payment/delivery statuses.
  Address management
- Add and view saved shipping addresses.
- Remove saved addresses.
  User interface
- Responsive layouts and a mobile navigation menu.
- Reusable UI primitives built with shadcn/ui patterns and Radix UI.
- Product image carousel, loading indicators, and toast notifications.
  Tech Stack
  Area Technologies
  Framework Next.js 16 (App Router)
  UI React 19, TypeScript
  Styling Tailwind CSS 4, tw-animate-css
  Authentication NextAuth.js v4, Credentials Provider, JWT
  Forms and validation React Hook Form, Zod, @hookform/resolvers
  UI components shadcn/ui patterns, Radix UI
  Icons Lucide React
  Notifications Sonner
  Carousel Embla Carousel, embla-carousel-autoplay
  Backend Route Egypt E-commerce REST API

Getting Started
Prerequisites

- Node.js 20.9 or later.
- npm.
- Access to the Route Egypt E-commerce API.

1. Clone the repository
   git clone https://github.com/YousefAmgad0/fresh-next.git
   cd fresh-next
2. Install dependencies
   npm install
3. Configure environment variables
   Create a .env.local file in the project root:
   NEXT_PUBLIC_BASE_URL=https://ecommerce.routemisr.com/api/v1
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXTAUTH_SECRET=replace_with_a_secure_random_secret
   Variable Purpose
   NEXT_PUBLIC_BASE_URL Base URL used by the authentication and product services.
   NEXT_PUBLIC_APP_URL Application URL passed to the backend when creating a checkout session. Use your deployed application URL in production.
   NEXTAUTH_SECRET Secret used by NextAuth to sign and decode session tokens. Use a strong, private value.

Generate a secure secret with:
openssl rand -base64 32
Keep .env.local private and never commit real secrets. The repository's .gitignore excludes environment files.
API configuration note: Some service functions currently call the Route Egypt API URL directly, while the authentication and product services use NEXT_PUBLIC_BASE_URL. If you change backend providers, update those service URLs as well.

4. Run the development server
   npm run dev
   Open http://localhost:3000 in your browser.
   Available Scripts
   Command Description
   npm run dev Start the local development server.
   npm run build Create a production build.
   npm run start Start the production server after building.
   npm run lint Run ESLint.

Application Routes
Route Description Access
/ Home page Public
/products Product catalog Public
/products/[productId] Product details Public
/categories All categories Public
/categories/[categoriesId] Products in a category Public
/brands All brands Public
/brands/[brandID] Products from a brand Public
/register Create an account Public
/login Sign in Public
/forgot-password Request a password-reset email Public
/cart Shopping cart and checkout Sign-in required
/wishlist Saved products Sign-in required
/address Manage saved addresses Sign-in required
/allorders Order history Sign-in required
/changePassword Change account password Sign-in required

Project Structure
src/
├── app/
│ ├── (auth)/ # Registration, login, and password pages
│ ├── (pages)/ # Storefront and customer account routes
│ ├── \_actions/ # Server Actions for cart, profile, user, and wishlist
│ ├── api/auth/[...nextauth]/ # NextAuth API route
│ ├── globals.css # Global styles and Tailwind theme
│ ├── layout.tsx # Root layout and shared providers
│ └── page.tsx # Home page
├── components/
│ ├── cart/ # Cart items and checkout UI
│ ├── common/ # Shared navbar and footer
│ ├── products/ # Product actions
│ ├── ui/ # Reusable UI components
│ └── wishlist/ # Wishlist actions
├── interfaces/ # TypeScript data interfaces
├── lib/ # Authentication, utilities, and validation schemas
├── providers/ # NextAuth session and cart context providers
├── proxy.ts # Authentication-based route protection
└── services/ # Backend API service functions
Architecture Overview

- App Router: Route groups organize authentication pages separately from storefront and account pages without adding the group names to the URL.
- Server and Client Components: Catalog and detail pages fetch backend data on the server. Client Components handle interactive forms, cart updates, wishlist actions, and navigation state.
- Server Actions: Authenticated cart, wishlist, address, checkout, and password operations retrieve the user's API token on the server before making backend requests.
- Authentication: NextAuth uses its Credentials provider to authenticate against the backend. The application stores the backend token in the NextAuth JWT and uses it for protected API requests.
- Shared state: AuthProvider exposes the NextAuth session, while CartContextProvider keeps the cart item count available to shared UI such as the navbar.
- Validation: Zod schemas define registration and login validation rules and are integrated with React Hook Form.
  Backend Integration
  ShopMart uses the Route Egypt E-commerce API for product catalog data and customer operations. The frontend does not include its own database or e-commerce backend in this repository.

The backend is responsible for account registration and authentication, product/category/brand data, cart and wishlist persistence, address management, order creation, and checkout-session creation. Stripe checkout is initiated through the backend API; this repository does not integrate the Stripe SDK directly.
Notes

- A password-reset email request is implemented. A separate reset-code entry and password-reset completion page is not included in the current codebase.
- The repository does not currently define an automated test script.
- Product search, product filtering/sorting, and an admin dashboard are not part of the current implementation.
  License
  No license file is included in the current repository. Add a LICENSE file if you intend to distribute the project under a specific open-source license.
