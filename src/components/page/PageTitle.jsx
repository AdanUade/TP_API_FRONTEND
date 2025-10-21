const PageTitle = ({ title, subtitle }) => (
    <div className="bg-yellow-400 border-4 border-black p-6 mb-12 text-center shadow-[10px_10px_0_0_#1E90FF]">
        <h2 className="text-5xl font-extrabold uppercase" style={{ WebkitTextStroke: '2px black' }}>
            {title}
        </h2>
        {subtitle && <p className="text-xl mt-2">{subtitle}</p>}
    </div>
    );

export default PageTitle;