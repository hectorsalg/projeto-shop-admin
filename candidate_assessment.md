# Coding Home Assessment — Shop Admin (Microfrontends)

## Goal
Build a small **Shop Admin** composed of multiple **independently deployable React microfrontends** (using Webpack Module Federation) that consume a **NestJS GraphQL** API.  

The purpose of this exercise is to evaluate your ability to learn and apply new technologies, design modular architectures, and deliver working software.

---

## What to Build

### Domain (minimal)
- **Product**: `id`, `name`, `price`, `inStock`
- **Order**: `id`, `items: {productId, qty}`, `status: PENDING|PAID|SHIPPED`, `total`

### Backend (NestJS + GraphQL)
- Implement a GraphQL API with the following operations:

**Queries**
- `products(search?: String): [Product!]!`
- `orders(status?: OrderStatus): [Order!]!`

**Mutations**
- `createProduct(input: {name, price, inStock}): Product!`
- `createOrder(input: {items: [{productId, qty}]}) : Order!`
- `updateOrderStatus(id: ID!, status: OrderStatus!): Order!`

**(Optional, stretch)**  
- Subscriptions: `orderStatusChanged(orderId: ID!): Order!`

Data persistence: use **SQLite** with **Prisma** (or an in-memory store if preferred). Provide a seed script.

### Frontend (React + TypeScript + Module Federation)
- **Shell (Container App)**  
  - Hosts the layout (navigation, router).
  - Dynamically loads remotes (NO compile-time imports).
  - Reads remote URLs from a manifest JSON (e.g., `mf.manifest.json`).

- **Remote A: Products**  
  - `/products`: list products with search.  
  - Form to create a new product.  
  - Exposes:
    - `./Routes` for navigation
    - `./Widget` (a small “Products Summary” card)

- **Remote B: Orders**  
  - `/orders`: list orders, filter by status.  
  - Create a new order from products.  
  - Update order status.  
  - Exposes:
    - `./Routes`
    - `./Widget` (an “Orders Summary” card)

- **Shell dashboard (`/`)**  
  - Composes both widgets from the remotes.

---

## Non-Functional Expectations
- **TypeScript everywhere**
- **Reasonable UI** (any library is fine)
- Easy local development (`yarn dev` or `yarn start:all`)
- Clear **README** with setup instructions, architecture diagram(s), and notes about tradeoffs/decisions

---

## Suggested Repo Layout
```
/shop-admin
  /apps
    /shell             # React host (MF container)
    /products-remote   # Products microfrontend
    /orders-remote     # Orders microfrontend
    /api               # NestJS GraphQL server
  /packages
    /types             # Shared types / GraphQL codegen outputs
    /ui                # (optional) shared UI components
  mf.manifest.json
  README.md
```

---

## Running Locally
- Install with `yarn` (or `pnpm`) at root  
- Start apps:
  - API → `http://localhost:4000/graphql`
  - Shell → `http://localhost:3000`
  - Products → `http://localhost:3001`
  - Orders → `http://localhost:3002`
- The shell should load remote entry URLs from `mf.manifest.json`

---

## Deliverables
- GitHub repository (public) with:
  - Source code for shell, remotes, and API
  - README including:
    - Setup/run instructions
    - Architecture diagram(s) and Module Federation decisions
    - Known limitations and possible improvements
- (Optional) short video (≤5 min) walking through the app and explaining architecture

---

## Stretch Goals (Optional)
If you have extra time, consider implementing:
- **Subscriptions** for live order updates
- **GraphQL Gateway** (split API into multiple services + gateway)
- **Authentication** with JWT
- **E2E tests** (Cypress/Playwright)

---

## Evaluation
We will look for:
- Working product flows (create/list products, create/update orders)
- Correct use of **Module Federation** (dynamic remotes, shared deps)
- Type safety across frontend and backend
- Clean code, project structure, and documentation
