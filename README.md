# SwiftShop - E-Commerce Product Catalog

SwiftShop is a responsive, modern e-commerce product catalog web application built with React, Vite, Tailwind CSS 4.0, CSS custom properties, and standard CSS modules. It features live search, custom category and price range filtering, a responsive mobile drawer, product sorting, and persistent light/dark themes.

---

## 🛠️ Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (recommended version LTS 18+ or 20+).

### 1. Install Dependencies
Run the following command to download and install all package dependencies:
```bash
npm install
```

### 2. Run the Development Server
Launch the local dev server:
```bash
npm run dev
```
Once the server is running, navigate to `http://localhost:5173` in your web browser.

### 3. Build for Production
To bundle the application into optimized static assets within the `dist` directory:
```bash
npm run build
```

### 4. Preview the Production Build
Test the production-ready assets locally:
```bash
npm run preview
```

### 5. Linting
Check for code syntax issues, formatting, and react-hooks compliance:
```bash
npm run lint
```

---

## 💡 Assumptions Made

1. **API Backend Availability**:
   - The application relies on the public [DummyJSON API](https://dummyjson.com) as its data source for products and categories.
2. **Client-Side Filtering, Searching, & Sorting**:
   - The application retrieves `194` items in a single request during initialization (`PRODUCTS_LIMIT = 194`).
   - All searching (across title, description, and brand), sorting (by price/rating), and filtering (by category, price range, and brands) are computed on the client side using JavaScript array methods (`filter`, `sort`, `slice`).
   - This assumption optimizes responsivity for smaller catalogs, eliminating the need for repeated network requests when users adjust filters.
3. **Data Schema Consistency**:
   - Assumes products returned from the API conform to a standard schema containing fields such as: `id`, `title`, `thumbnail`, `category`, `discountPercentage`, `price`, `brand`, `rating`, `stock`, and `description`.
   - Items with a missing or null `brand` field are defaulted to `"Generic"`.
4. **Local Theme Persistence**:
   - Assumes users prefer to persist their theme preference (Light or Dark mode) across sessions. The selection is stored in and retrieved from the browser's `localStorage`.
5. **Static Cart Count Display**:
   - The shopping cart icon in the navigation header displays a fixed badge count of `3` for visual fidelity, as the full stateful shopping cart context was not required for this iteration.

---

## 📐 Architectural Decisions

1. **Framework & Tooling**:
   - **React 19 & Vite**: Selected for cutting-edge React features (such as optimized component lifecycles) and Vite's superfast Hot Module Replacement (HMR) and optimized rollup-based production builds.
   - **React Router DOM v7**: Used for seamless client-side page transitions between the Product List (`/`) and Product Details (`/product/:id`) views.
2. **Hybrid Styling Architecture**:
   - **Tailwind CSS v4.0 + Component CSS**: Features Tailwind CSS utility classes inside elements (e.g. for SVG icons, responsive layout parameters, transitions) alongside modular, vanilla CSS stylesheet components (`ProductCard.css`, `Navbar.css`, etc.). This combination maintains clean stylesheet separation while leveraging utility variables.
   - **Dynamic Styling Custom Tokens**: Core themes (colors, backgrounds, shadows) are defined as CSS custom properties (variables) inside [index.css](file:///g:/Projects/E_commerce/src/index.css). The dark mode is toggled by dynamically adding or removing the `.dark` class from the root HTML element.
3. **State Management**:
   - **React Context API**: A global `FilterContext` and `FilterProvider` manage active search, sorting, categorization, price boundary, and pagination state. This enables decoupled components like the `Navbar` (search) and `Filters` (sidebar) to keep in perfect sync.
   - **Custom Hooks**: Encapsulated state logic into hooks (`useProducts` for data loading, unique brand extraction, loading states; `useFilterContext` for consuming filtering state).
4. **Network Client**:
   - **Axios**: Standardized API requests using a centralized Axios instance configured with a `10000ms` timeout to gracefully handle slow network conditions.

---

## 🚀 Improvements if Given More Time

1. **Server-Side Pagination, Search, and Filters**:
   - If the catalog scales beyond a few hundred items, loading all products initially will degrade performance. We would refactor the data layer to utilize DummyJSON query options (e.g. `/products/search?q=query`, `/products/category/category-name`, `?limit=12&skip=12`) to fetch only necessary pages of products from the server.
2. **TypeScript Migration**:
   - Migrate the codebase to TypeScript. Defining explicit interfaces for `Product`, `FilterState`, and API responses would prevent runtime errors and improve developer onboarding.
3. **Automated Testing**:
   - Integrate unit tests using `Vitest` and `React Testing Library` for hooks (`useProducts`) and pure utilities (`filterProducts.js`).
   - Implement E2E tests using `Playwright` to test core user scenarios (e.g., search keywords, filter by price, toggle dark mode, navigate to detail page).
4. **URL Query Param Sync**:
   - Synchronize filter selections (e.g. search keyword, brand selection, minimum/maximum price) to the URL query string (`/?search=phone&minPrice=100`). This would allow users to share pre-filtered product catalogs and preserve browser navigation history.
5. **Interactive Shopping Cart**:
   - Transform the static cart badge into a fully functioning React Context-based Shopping Cart, complete with an "Add to Cart" action, dynamic cart sidebar drawer, count adjustment, subtotal calculations, and a checkout drawer.
6. **Asset Optimization**:
   - Use dynamic responsive source sets (`srcset`) or image proxy services to serve smaller WebP/AVIF format images corresponding to display densities and device sizes, speeding up initial page weight significantly.
