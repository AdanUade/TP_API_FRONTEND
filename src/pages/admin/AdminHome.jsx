import PageTitle from "../../components/page/PageTitle";
import HeroBanner from "../../components/page/HeroBanner";
import ProductGrid from "../../components/products/ProductGrid";
const AdminHome = ({isLoading, latestProducts}) => {
    return (
        <>
            <HeroBanner title="Inicio del Administrador" subtitle="Bienvenido a tu panel de administrador" />
            <PageTitle 
                title="Ultimos productos agregados" 
                subtitle="Gestiona los productos de la plataforma"
            />
            <ProductGrid 
                products={latestProducts || []} 
                isLoading={isLoading}
            />
        </>
    );
};

export default AdminHome;
