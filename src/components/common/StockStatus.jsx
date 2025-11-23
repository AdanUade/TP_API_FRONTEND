const StockStatus = ({ stock, lowStockThreshold = 5 }) => {
    const isOutOfStock = stock === 0;
    const isLowStock = stock > 0 && stock <= lowStockThreshold;

    // Mensajes aleatorios de Flash cuando no hay stock
    const flashMessages = [
        "⚡ ¡Flash pasó corriendo y se llevó todo!",
        "💨 Ni con la Fuerza de la Velocidad llegas a tiempo... ¡Agotado!",
        "🏃‍♂️ Flash fue más rápido que tu Wi-Fi... ¡Ya no quedan!",
        "⚡ ¿Ves esas partículas doradas? Son los últimos átomos de stock...",
        "💨 Flash ya vibró hasta otra dimensión... ¡con los productos!",
        "⚡ Deberías haberte llamado Flash... ¡Llegaste tarde!",
        "🏃‍♂️ Flash compró todo a velocidad supersónica... ¡Agotado!"
    ];

    if (isOutOfStock) {
        const randomMessage = flashMessages[Math.floor(Math.random() * flashMessages.length)];
        return (
            <div className="bg-red-100 border-4 border-red-600 p-4 text-center rounded-md relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 animate-pulse"></div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-red-600 uppercase transform -rotate-1 relative z-10">
                    {randomMessage}
                </p>
            </div>
        );
    }

    return (
        <div className={`p-3 border-2 border-black rounded-md ${isLowStock ? 'bg-yellow-100' : 'bg-green-100'}`}>
            <p className={`text-xl font-bold font-sans ${isLowStock ? 'text-yellow-700' : 'text-green-700'}`}>
                Disponibles: {stock}
                {isLowStock && " ⚠️ ¡Últimas unidades!"}
            </p>
        </div>
    );
};

export default StockStatus;
