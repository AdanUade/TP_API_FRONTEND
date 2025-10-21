const ProductCardSkeleton = () => (
    <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-[8px_8px_0_0_#000] flex flex-col">
        <div className="w-full h-56 bg-gray-300 animate-pulse" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 animate-pulse" />
                <div className="mt-auto">
                <div className="h-10 bg-gray-300 rounded w-1/2 mb-4 animate-pulse" />
                <div className="h-12 bg-gray-300 rounded w-full animate-pulse" />
            </div>
        </div>
    </div>
);

export default ProductCardSkeleton;