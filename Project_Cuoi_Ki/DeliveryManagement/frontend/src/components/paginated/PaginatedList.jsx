import React, { useState } from 'react';
import './PaginatedList.css'; // Đảm bảo CSS được import

const PaginatedList = ({ items, itemsPerPage, renderItem }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedItems = items.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="pagination-container">
            {/* Nội dung danh sách */}
            <div className="pagination-content">
                {paginatedItems.map(renderItem)}
            </div>

            {/* Điều hướng phân trang */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &#8592;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
};

export default PaginatedList;
