import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon-box">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-msg">
        {message || "We encountered an unexpected error. Please try again."}
      </p>
      <button onClick={() => window.location.reload()} className="retry-btn">
        Retry Connection
      </button>
    </div>
  );
};

export default ErrorMessage;