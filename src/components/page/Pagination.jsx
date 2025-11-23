import Button from '../common/Button';

const getPageNumbers = ({ totalPages, currentPage, siblingCount = 1 }) => {
    if (totalPages <= 7) { // Show all pages if 7 or less
        return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages = new Set();
    pages.add(0); // Always show first page

    // Pages around current page
    for (let i = Math.max(0, currentPage - siblingCount); i <= Math.min(totalPages - 1, currentPage + siblingCount); i++) {
        pages.add(i);
    }

    pages.add(totalPages - 1); // Always show last page

    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    const finalPages = [];

    let lastPage = -1;
    for (const page of sortedPages) {
        if (lastPage !== -1 && page > lastPage + 1) {
            finalPages.push('...');
        }
        finalPages.push(page);
        lastPage = page;
    }

    return finalPages;
};


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = getPageNumbers({ totalPages, currentPage });

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                variant="secondary"
                className="!w-auto !py-2 !px-4 bg-white hover:bg-yellow-400 border-2 border-black"
            >
                {"<"}
            </Button>

            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`dots-${index}`} className="px-4 py-2 font-bold">
                            ...
                        </span>
                    );
                }

                return (
                    <Button
                        key={page}
                        onClick={() => onPageChange(page)}
                        variant={currentPage === page ? "danger" : "secondary"}
                        className={`!w-auto !py-2 !px-4 border-2 border-black ${
                            currentPage === page
                                ? ''
                                : 'bg-white hover:bg-yellow-400'
                        }`}
                    >
                        {page + 1}
                    </Button>
                );
            })}

            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                variant="secondary"
                className="!w-auto !py-2 !px-4 bg-white hover:bg-yellow-400 border-2 border-black"
            >
                {">"}
            </Button>
        </div>
    );
};

export default Pagination;