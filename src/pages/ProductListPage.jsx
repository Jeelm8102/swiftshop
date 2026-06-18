import { useMemo, useState } from "react";
import useProducts from "../hooks/useProducts";
import useFilterContext from "../hooks/useFilterContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { filterProducts } from "../utils/filterProducts";
import "./ProductListPage.css";

const ITEMS_PER_PAGE = 12;

const ProductListPage = () => {
  const { products, categories, brands, loading, error } = useProducts();
  const { filters, setFilters } = useFilterContext();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (filters.page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, filters.page]);

  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "",
      brands: [],
      minPrice: "",
      maxPrice: "",
      sortBy: "featured",
      page: 1,
    });
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="catalog-container">
      {/* Page Title & Intro */}
      <div className="catalog-title-section">
        <h1 className="catalog-title">Explore Products</h1>
        <p className="catalog-subtitle">
          Discover handpicked items and tech essentials at unbeatable prices.
        </p>
      </div>

      <div className="catalog-layout">
        {/* Backdrop for mobile drawer */}
        {isMobileFiltersOpen && (
          <div
            className="mobile-filter-backdrop"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
        )}

        {/* Left Side: Filter Sidebar */}
        <aside className={`catalog-sidebar ${isMobileFiltersOpen ? "open" : ""}`}>
          <Filters
            categories={categories}
            brands={brands}
            onClose={() => setIsMobileFiltersOpen(false)}
          />
        </aside>

        {/* Right Side: Product Catalog Grid */}
        <main className="catalog-main">
          {/* Catalog Top Header Controls */}
          <div className="catalog-header">
            <span className="results-count">
              Showing <span>{filteredProducts.length}</span> products
            </span>

            {/* Mobile Filter Button and Sorting */}
            <div className="catalog-header-actions">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="mobile-filter-btn"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Filters
              </button>

              <div className="sort-container">
                <label htmlFor="sortBy" className="sort-label">
                  Sort by:
                </label>
                <select
                  id="sortBy"
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products List Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="product-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* No Results Empty State */
            <div className="empty-state">
              <div className="empty-icon-box">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="empty-title">No products found</h3>
              <p className="empty-desc">
                Your filters are too restrictive. Try adjusting price limits or cleaning search terms.
              </p>
              <button onClick={handleResetFilters} className="reset-btn">
                Reset All Filters
              </button>
            </div>
          )}

          {/* Catalog Pagination Controls */}
          {paginatedProducts.length > 0 && (
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={(page) =>
                setFilters((prev) => ({
                  ...prev,
                  page,
                }))
              }
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListPage;