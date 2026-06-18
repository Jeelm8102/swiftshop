import { useState } from "react";
import FilterContext from "./FilterContext";

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    brands: [],
    minPrice: "",
    maxPrice: "",
    sortBy: "featured",
    page: 1,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
