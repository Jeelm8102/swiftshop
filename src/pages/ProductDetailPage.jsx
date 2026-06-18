import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError("Unable to fetch product detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  // Calculate original list price
  const originalPrice =
    product.discountPercentage && product.discountPercentage > 0
      ? Math.round(product.price / (1 - product.discountPercentage / 100))
      : null;

  // Handle mock cart trigger
  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Render SVG rating stars
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(
          <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === floorRating + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <svg className="absolute top-0 left-0 w-4 h-4 text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute top-0 left-0 w-[50%] h-full overflow-hidden">
              <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="detail-container">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-btn">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </button>

      {/* Detail Split Layout Box */}
      <div className="detail-box">
        {/* Left Column: Image Area */}
        <div className="image-column">
          <div className="image-wrapper">
            <img src={product.thumbnail} alt={product.title} />
            {/* Overlay Category tag */}
            <span className="detail-category-tag">
              {product.category}
            </span>
            {/* Overlay Discount tag */}
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="detail-discount-tag">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Spec Info Area */}
        <div className="info-column">
          <div>
            {/* Brand Title */}
            <span className="detail-brand-name">
              {product.brand || "Generic"}
            </span>

            {/* Product Title */}
            <h1 className="detail-title">{product.title}</h1>

            {/* Ratings and Reviews */}
            <div className="detail-ratings">
              <div className="stars-list">{renderStars(product.rating)}</div>
              <span className="ratings-text">
                {product.rating} (Rating)
              </span>
            </div>

            {/* Price Segment */}
            <div className="price-segment">
              <span className="detail-price">${product.price}</span>
              {originalPrice && (
                <div className="detail-price-compare">
                  <span className="detail-original-price">${originalPrice}</span>
                  <span className="save-amount">
                    You save ${originalPrice - product.price}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="detail-description">{product.description}</p>
          </div>

          {/* Table Specs & Add To Cart Button */}
          <div className="specs-section">
            {/* Spec Sheet Table */}
            <div className="spec-table">
              <div className="spec-row">
                <span className="spec-label">Brand</span>
                <span className="spec-value">{product.brand || "Generic"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Category</span>
                <span className="spec-value">{product.category}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Availability</span>
                <div>
                  {product.stock > 10 ? (
                    <span className="stock-badge instock">
                      <span className="stock-dot" />
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="stock-badge lowstock">
                      <span className="stock-dot" />
                      Low Stock ({product.stock} left)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mock Purchase Button */}
            <button
              onClick={handleAddToCart}
              className={`add-to-cart-btn ${addedToCart ? "success" : "indigo"}`}
            >
              {addedToCart ? (
                <>
                  <svg fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;