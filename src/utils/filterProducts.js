export const filterProducts = (products, filters) => {
  if (!products) return [];

  // 1. Filtering
  const filtered = products.filter((product) => {
    // Category match
    const categoryMatch =
      !filters.category ||
      product.category === filters.category;

    // Brand match
    const brandMatch =
      !filters.brands ||
      filters.brands.length === 0 ||
      filters.brands.includes(product.brand);

    // Min price match
    const minPriceMatch =
      !filters.minPrice ||
      product.price >= Number(filters.minPrice);

    // Max price match
    const maxPriceMatch =
      !filters.maxPrice ||
      product.price <= Number(filters.maxPrice);

    // Search query match (checks title, description and brand)
    const searchMatch =
      !filters.search ||
      [product.title, product.description, product.brand]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(filters.search.toLowerCase())
        );

    return (
      categoryMatch &&
      brandMatch &&
      minPriceMatch &&
      maxPriceMatch &&
      searchMatch
    );
  });

  // 2. Sorting
  if (filters.sortBy === "price-asc") {
    return filtered.sort((a, b) => a.price - b.price);
  }
  if (filters.sortBy === "price-desc") {
    return filtered.sort((a, b) => b.price - a.price);
  }
  if (filters.sortBy === "rating-desc") {
    return filtered.sort((a, b) => b.rating - a.rating);
  }

  // Default: 'featured' (original order or ID order)
  return filtered;
};