import Button from '../common/Button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage < 3) {
                pages.push(0, 1, 2, 3, '...', totalPages - 1);
            } else if (currentPage > totalPages - 4) {
                pages.push(0, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
            } else {
                pages.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
            }
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            <Button
                variant="secondary"
                className="!w-auto !py-2 !px-4 !bg-yellow-400 hover:!bg-yellow-500 border-2 border-black"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                &lt;
            </Button>

            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="px-2 font-bold">
                            ...
                        </span>
                    );
                }

                return (
                    <Button
                        key={page}
                        variant="secondary"
                        className={`!w-auto !py-2 !px-4 border-2 border-black !min-w-[40px] ${currentPage === page
                            ? '!bg-red-500 !text-white hover:!bg-red-600'
                            : '!bg-yellow-400 hover:!bg-yellow-500'
                            }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page + 1}
                    </Button>
                );
            })}

            <Button
                variant="secondary"
                className="!w-auto !py-2 !px-4 !bg-yellow-400 hover:!bg-yellow-500 border-2 border-black"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                &gt;
            </Button>
        </div>
    );
};

export default Pagination;
