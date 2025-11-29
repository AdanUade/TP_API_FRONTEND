import RcPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Button from '../common/Button';

// Custom item render to match existing styles
const itemRender = (current, type, element) => {
    if (type === 'page') {
        return (
            <Button
                variant="secondary"
                className="!w-auto !py-2 !px-4 border-2 border-black bg-white hover:bg-yellow-400 !min-w-[40px]"
            >
                {current}
            </Button>
        );
    }
    if (type === 'prev') {
        return (
            <Button
                variant="secondary"
                className="!w-auto !py-2 !px-4 bg-white hover:bg-yellow-400 border-2 border-black"
            >
                {"<"}
            </Button>
        );
    }
    if (type === 'next') {
        return (
            <Button
                variant="secondary"
                className="!w-auto !py-2 !px-4 bg-white hover:bg-yellow-400 border-2 border-black"
            >
                {">"}
            </Button>
        );
    }
    if (type === 'jump-prev' || type === 'jump-next') {
        return <span className="px-4 py-2 font-bold">...</span>;
    }
    return element;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // rc-pagination is 1-based, but our app logic is 0-based.
    // We need to convert.
    // current: currentPage + 1
    // total: totalPages * pageSize (since we don't have total items here easily, let's fake it or request totalItems prop)
    // Wait, rc-pagination needs `total` (items) and `pageSize`.
    // The previous component took `totalPages`.

    // If we only have `totalPages`, we can simulate `total` by `totalPages * 10` and `pageSize = 10`.
    const pageSize = 10;
    const total = totalPages * pageSize;

    return (
        <div className="flex justify-center items-center mt-12 pagination-wrapper">
            <style>{`
                .pagination-wrapper .rc-pagination {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: none;
                    background: transparent;
                }
                .pagination-wrapper .rc-pagination-item {
                    border: none;
                    background: transparent;
                    margin: 0;
                    padding: 0;
                    cursor: pointer;
                }
                .pagination-wrapper .rc-pagination-item a {
                    text-decoration: none;
                }
                .pagination-wrapper .rc-pagination-item-active button {
                    background-color: #EF4444 !important; /* Tailwind red-500 */
                    color: white;
                }
                .pagination-wrapper .rc-pagination-prev,
                .pagination-wrapper .rc-pagination-next,
                .pagination-wrapper .rc-pagination-jump-prev,
                .pagination-wrapper .rc-pagination-jump-next {
                    margin: 0;
                    padding: 0;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }
                .pagination-wrapper .rc-pagination-disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
            <RcPagination
                current={currentPage + 1}
                total={total}
                pageSize={pageSize}
                onChange={(page) => onPageChange(page - 1)}
                itemRender={itemRender}
                showTitle={false}
            />
        </div>
    );
};

export default Pagination;
