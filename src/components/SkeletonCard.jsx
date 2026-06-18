import "./Loader.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-media" />
      <div className="skeleton-details">
        <div className="skeleton-title-1" />
        <div className="skeleton-title-2" />
        <div className="skeleton-row">
          <div className="skeleton-price" />
          <div className="skeleton-rating" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
