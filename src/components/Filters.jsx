import useFilterContext from "../hooks/useFilterContext";
import "./Filters.css";

const Filters = ({ categories, brands, onClose }) => {
  const { filters, setFilters } = useFilterContext();

  const handleCategoryChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      category: e.target.value,
      page: 1,
    }));
  };

  const handleBrandChange = (brand) => {
    const exists = filters.brands.includes(brand);
    setFilters((prev) => ({
      ...prev,
      brands: exists
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
      page: 1,
    }));
  };

  const handleClearFilters = () => {
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

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.brands.length > 0 ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.sortBy !== "featured";

  return (
    <div className="filter-sidebar">
      {/* Header */}
      <div className="filter-header">
        <h2>Filters</h2>
        <div className="filter-header-actions">
          {hasActiveFilters && (
            <button onClick={handleClearFilters} className="clear-btn">
              Clear All
            </button>
          )}
          <button onClick={onClose} className="filter-close-btn" aria-label="Close filters">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="filter-section">
        <label className="filter-label">Category</label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Boundaries */}
      <div className="filter-section">
        <label className="filter-label">Price Range ($)</label>
        <div className="price-range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: e.target.value,
                page: 1,
              }))
            }
            className="price-input"
          />
          <span className="price-range-divider">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: e.target.value,
                page: 1,
              }))
            }
            className="price-input"
          />
        </div>
      </div>

      {/* Brands Selection list */}
      <div className="filter-section">
        <label className="filter-label">Brands ({brands.length})</label>
        <div className="brands-container">
          {brands.map((brand) => (
            <label key={brand} className="brand-label">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="brand-checkbox"
              />
              <span className="brand-name-span">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;