import SkeletonCard from "./SkeletonCard";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      {/* Title skeleton */}
      <div className="loader-title" />

      <div className="loader-grid">
        {/* Sidebar Filter skeleton */}
        <div className="loader-sidebar">
          <div className="sidebar-skeleton">
            <div className="skeleton-label" />
            <div className="skeleton-input" />
            <div className="skeleton-label" />
            <div className="skeleton-input" />
            <div className="skeleton-label" />
            <div className="skeleton-input" />
          </div>
        </div>

        {/* Catalog Items Grid skeleton */}
        <div className="loader-main">
          <div className="skeleton-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;