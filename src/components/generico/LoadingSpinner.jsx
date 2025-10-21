const LoadingSpinner = ({ title = "Cargando...", subtitle = "Preparando contenido épico" }) => (
    <div>
        <div className="text-center p-10">
            <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-4 border-black"></div>
            {title && <h2 className="text-3xl font-bold mt-6">{title}</h2>}
            {subtitle && <p className="text-xl mt-2 text-gray-600">{subtitle}</p>}
        </div>
    </div>
);

export default LoadingSpinner;
