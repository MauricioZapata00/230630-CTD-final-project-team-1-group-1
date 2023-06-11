const Pagination = ({ currentPage, handlePrevPage, handleNextPage, totalPages, onPageChange }) => {
  //  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    return (
     <div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          &lt; Anterior
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === 2}>
          Siguiente &gt;
        </button>
      </div>
      {/*<ul className="pagination">
      {currentPage > 1 && (
        <li className="pagination-button" onClick={() => onPageChange(currentPage - 1)}>
          Atrás
        </li>
      )}
      {pages.map((page) => (
        <li
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </li>
      ))}
      {currentPage < totalPages && (
        <li className="pagination-button" onClick={() => onPageChange(currentPage + 1)}>
          Adelante
        </li>
      )}
      <li className="current-page">Página {currentPage}</li>
    </ul>*/}
    </div>
    );
  };

export default Pagination