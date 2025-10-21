import Button from './Button';

const QuantitySelector = ({ 
    quantity, 
    onDecrease, 
    onIncrease, 
    disabled = false,
    size = 'small', // 'small' para carrito, 'large' para ProductDetail
    showLabel = false // Para mostrar u ocultar "Cantidad:"
}) => {
    const sizeClasses = {
        small: {
            button: '!w-10 !h-10 !text-2xl',
            display: 'w-12 h-10 text-2xl',
            container: ''
        },
        large: {
            button: '!w-12 !h-12 !text-3xl',
            display: 'w-16 h-12 text-3xl',
            container: 'my-6'
        }
    };

    const styles = sizeClasses[size];

    return (
        <div className={`flex items-center gap-4 ${styles.container}`}>
            {showLabel && <label className="text-2xl font-bold">Cantidad:</label>}
            <div className="flex items-center border-2 border-black rounded-md overflow-hidden">
                <Button 
                    onClick={onDecrease}
                    disabled={disabled || quantity <= 1}
                    className={`${styles.button} !rounded-none !border-0 !border-b-0 !p-0 bg-gray-200 hover:bg-gray-300 flex items-center justify-center`}
                >
                    -
                </Button>
                <span className={`${styles.display} text-center font-bold flex items-center justify-center bg-white`}>
                    {quantity}
                </span>
                <Button 
                    onClick={onIncrease}
                    disabled={disabled}
                    className={`${styles.button} !rounded-none !border-0 !border-b-0 !p-0 bg-gray-200 hover:bg-gray-300 flex items-center justify-center`}
                >
                    +
                </Button>
            </div>
        </div>
    );
};

export default QuantitySelector;