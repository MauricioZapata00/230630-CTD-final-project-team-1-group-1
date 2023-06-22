import Next from "../../assets/proximo.png";
import Back from "../../assets/atras.png";
import ResetPage from "../../assets/resetPage.png";
import LastPage from "../../assets/lastPage.png";

const Pagination = ({ currentPage, handlePrevPage, handleNextPage, handleResetPage, handleLastPage, totalPages, onPageChange }) => {


  return (
    <div>
      <div className="pagination">
        <button onClick={handleResetPage} disabled={currentPage === 0}>
          <img src={ResetPage} alt="ResetPage" className={currentPage === 0 ? "opaque-image" : ""} />
        </button>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          <img src={Back} alt="Back" className={currentPage === 0 ? "opaque-image" : ""} />
        </button>
        <span>{currentPage + 1}</span>
        <button onClick={handleNextPage} disabled={currentPage === 2}>
          <img src={Next} alt="Next" className={currentPage === 2 ? "opaque-image" : ""} />
        </button>
        <button onClick={handleLastPage} disabled={currentPage === 2}>
          <img src={LastPage} alt="LastPage" className={currentPage === 2 ? "opaque-image" : ""} />
        </button>
      </div>
    </div>
  );
};

export default Pagination