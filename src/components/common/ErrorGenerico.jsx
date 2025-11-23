
const ErrorGenerico = ({ 
    message = 'Ocurrió un error inesperado.', 
    variant = 'form',
    title 
}) => {
    if (variant === 'form') {
        return (
            <div className="bg-red-500 border-4 border-black text-white font-bold p-4 mb-6 rounded-lg shadow-[6px_6px_0_0_#000] animate-shake">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">⚠️</span>
                    <p className="text-xl uppercase">{message}</p>
                </div>
            </div>
        );
    }

    if (variant === 'page') {
        return (
            <div className="text-center p-10 bg-red-100 border-4 border-red-500 text-red-700 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">{title || '¡KAPOW! Algo salió mal.'}</h3>
                <p className="text-lg">{message}</p>
            </div>
        );
    }

    return null;
};

export default ErrorGenerico;