import { Link } from 'react-router-dom';

const CardImage = ({ 
    id, 
    image, 
    name, 
    onSale, 
    outOfStock, 
    size = 'large', // 'large' para ProductCard, 'small' para CartItem, 'detail' para ProductDetail
    showLink = true 
}) => {
    const sizeClasses = {
        small: 'w-24 h-24',
        medium: 'w-40 h-40',
        large: 'w-full h-56',
        detail: 'w-full h-auto min-h-96'
    };

    const objectFitClass = size === 'detail' ? 'object-cover' : 'object-contain';
    const textSizeClass = size === 'detail' ? 'text-2xl' : 'text-lg';

    const imageContent = (
        <div className={`relative ${sizeClasses[size]}`}>
            {(size === 'large' || size === 'detail') && onSale && !outOfStock && (
                <div className={`absolute top-${size === 'detail' ? '4' : '0'} left-${size === 'detail' ? '4' : '0'} bg-yellow-400 text-black font-bold p-${size === 'detail' ? '3' : '2'} transform -rotate-6 ${size === 'detail' ? '' : '-translate-x-2 -translate-y-2'} border-${size === 'detail' ? '4' : '2'} border-black ${size === 'detail' ? 'shadow-[4px_4px_0_0_#000]' : ''} z-10`}>
                    {size === 'detail' ? <span className="text-2xl">¡OFERTA!</span> : '¡OFERTA!'}
                </div>
            )}
            {image ? (
                <div className="w-full h-full bg-white flex items-center justify-center">
                    <img 
                        src={`data:image/jpeg;base64,${image}`} 
                        alt={name} 
                        className={`w-full h-full ${objectFitClass}`}
                    />
                </div>
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className={`text-gray-500 ${textSizeClass} font-bold`}>Sin Imagen</span>
                </div>
            )}
            {(size === 'large' || size === 'detail') && outOfStock && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <span className={`text-white ${size === 'detail' ? 'text-5xl px-8 py-6' : 'text-3xl px-6 py-4'} font-bold uppercase border-4 border-white transform rotate-[-12deg] shadow-2xl`}>
                        Agotado
                    </span>
                </div>
            )}
        </div>
    );

    if (!showLink) {
        return imageContent;
    }

    return (
        <Link to={`/product/${id}`} className="block cursor-pointer">
            {imageContent}
        </Link>
    );
};

export default CardImage;