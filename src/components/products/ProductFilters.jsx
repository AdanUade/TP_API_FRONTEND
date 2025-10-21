import { SORT_OPTIONS, SORT_LABELS } from '../../constants/productCategories';

// Define the specific sort options available for this component
const availableSortOptions = [
    SORT_OPTIONS.DEFAULT,
    SORT_OPTIONS.PRICE_ASC,
    SORT_OPTIONS.PRICE_DESC,
];

const ProductFilters = ({
sortOrder,
onSortChange,
showOnlyOnSale,
onSaleFilterChange,
showSaleFilter = true 
}) => {
return (
<div className="bg-white border-4 border-black p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-lg shadow-[8px_8px_0_0_#FBBF24]">
    
    {showSaleFilter && (
    <div className="flex items-center gap-3">
        <input
        id="onSaleFilter"
        type="checkbox"
        checked={showOnlyOnSale}
        onChange={(e) => onSaleFilterChange(e.target.checked)}
        className="h-6 w-6 accent-blue-500 border-black cursor-pointer"
        />
        <label htmlFor="onSaleFilter" className="font-bold text-lg select-none cursor-pointer">
        Mostrar solo ofertas
        </label>
    </div>
    )}

    <div className={`flex items-center gap-2 ${!showSaleFilter ? 'w-full justify-end' : ''}`}>
    <label htmlFor="sortOrder" className="font-bold text-lg">Ordenar por:</label>
    <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="border-2 border-black rounded-md p-2 font-bold focus:outline-none focus:ring-2 ring-blue-500 bg-white"
    >
        {availableSortOptions.map(optionKey => (
            <option key={optionKey} value={optionKey}>
                {SORT_LABELS[optionKey] || optionKey}
            </option>
        ))}
    </select>
    </div>
</div>
);
};

export default ProductFilters;
