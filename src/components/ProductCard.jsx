import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Calculate original price from discount percentage
  const originalPrice =
    product.discountPercentage && product.discountPercentage > 0
      ? Math.round(product.price / (1 - product.discountPercentage / 100))
      : null;

  // Render SVG Stars based on rating float value
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(
          <svg
            key={i}
            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === floorRating + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative w-3.5 h-3.5">
            <svg
              className="absolute top-0 left-0 w-3.5 h-3.5 text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute top-0 left-0 w-[50%] h-full overflow-hidden">
              <svg
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-3.5 h-3.5 text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card"
    >
      {/* Image Container with Badges */}
      <div className="card-media">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />

        {/* Category Badge */}
        <span className="category-tag">
          {product.category}
        </span>

        {/* Discount Badge */}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="discount-tag">
            -{Math.round(product.discountPercentage)}% OFF
          </span>
        )}
      </div>

      {/* Details Container */}
      <div className="card-details">
        {/* Brand */}
        <span className="brand-name">
          {product.brand || "Generic"}
        </span>

        {/* Title */}
        <h3 className="product-title">
          {product.title}
        </h3>

        {/* Ratings block */}
        <div className="stars-row">
          <div className="stars-container">{renderStars(product.rating)}</div>
          <span className="stars-val">
            {product.rating}
          </span>
        </div>

        {/* Price & Action button row */}
        <div className="price-row">
          <div className="price-box">
            {originalPrice && (
              <span className="original-price">
                ${originalPrice}
              </span>
            )}
            <span className="final-price">
              ${product.price}
            </span>
          </div>

          {/* Details Arrow Icon */}
          <div className="arrow-btn">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;