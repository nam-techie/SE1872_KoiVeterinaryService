const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <button 
                className="page-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Trước
            </button>

            <span className="page-info">
                Trang {currentPage} / {totalPages}
            </span>

            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Sau
            </button>
        </div>
    );
};

export default Pagination; 