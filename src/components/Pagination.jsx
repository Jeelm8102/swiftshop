import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="pagination-btn"
      >
        Prev
      </button>

      {/* Pages List */}
      <div className="page-numbers-list">
        {[...Array(totalPages)].map((_, index) => {
          const isSelected = currentPage === index + 1;
          return (
            <button
              key={index}
              onClick={() => {
                onPageChange(index + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`page-btn ${isSelected ? "active" : ""}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;