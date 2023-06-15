const Pagination = ({ currentPage, handlePrevPage, handleNextPage, totalPages, onPageChange }) => {
  
  
    return (
     <div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          &lt; Anterior
        </button>
        <span>{currentPage +1}</span>
        <button onClick={handleNextPage} disabled={currentPage === 2}>
          Siguiente &gt;
        </button>
      </div>
    </div>
    );
  };

export default Pagination