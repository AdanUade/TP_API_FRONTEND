const HeroBanner = ({title = "¡Bienvenido al Zarp-Verse!", subtitle = "Tu tienda de equipamiento para héroes y villanos."}) => (
    <div className="bg-blue-500 text-white p-10 text-center border-y-8 border-black my-8 transform -skew-y-2">
        <h2 className="text-5xl font-bold uppercase" style={{ textShadow: '4px 4px 0 #000' }}>
            {title}
        </h2>
        <p className="text-2xl mt-4">
            {subtitle}
        </p>
    </div>
);

export default HeroBanner;