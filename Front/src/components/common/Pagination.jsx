import Next from "../../assets/proximo.png";
import Back from "../../assets/atras.png";
import ResetPage from "../../assets/resetPage.png";
import LastPage from "../../assets/lastPage.png";
import PropTypes from "prop-types";

const Pagination = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
  handleResetPage,
  handleLastPage,
}) => {
  return (
    <div>
      <div className="pagination">
        <button onClick={handleResetPage} disabled={currentPage === 0}>
          <img
            src={ResetPage}
            alt="ResetPage"
            className={currentPage === 0 ? "opaque-image" : ""}
          />
        </button>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          <img
            src={Back}
            alt="Back"
            className={currentPage === 0 ? "opaque-image" : ""}
          />
        </button>
        <span>{currentPage + 1}</span>
        <button onClick={handleNextPage} disabled={currentPage === 2}>
          <img
            src={Next}
            alt="Next"
            className={currentPage === 2 ? "opaque-image" : ""}
          />
        </button>
        <button onClick={handleLastPage} disabled={currentPage === 2}>
          <img
            src={LastPage}
            alt="LastPage"
            className={currentPage === 2 ? "opaque-image" : ""}
          />
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handleResetPage: PropTypes.func.isRequired,
  handleLastPage: PropTypes.func.isRequired,
};

export default Pagination;
