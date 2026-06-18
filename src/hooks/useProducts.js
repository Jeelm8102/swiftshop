import { useEffect, useState, useMemo } from "react";
import { getProducts, getCategories } from "../services/productService";

const PRODUCTS_LIMIT = 194;

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts(PRODUCTS_LIMIT, 0),
          getCategories(),
        ]);
        setProducts(productsResponse.products);
        setCategories(categoriesResponse);
      } catch {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.brand)
          .filter(Boolean)
      ),
    ].sort();
  }, [products]);

  return {
    products,
    categories,
    brands,
    loading,
    error,
  };
};

export default useProducts;