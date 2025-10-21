import PageTitle from "../../components/page/PageTitle";
import HeroBanner from "../../components/page/HeroBanner";
import ProductGrid from "../../components/products/ProductGrid";

const SellerHome = ({isLoading, latestProducts}) => {

    return (
        <> 
            <HeroBanner title="Inicio del Vendedor" subtitle="Gestiona tu tienda y productos aquí" />
            <PageTitle 
                title="Últimas unidades agregadas" 
                subtitle="Gestiona tu inventario de productos"
            />
            <ProductGrid 
                products={latestProducts || []} 
                isLoading={isLoading}
            />
        </>
    );
};

export default SellerHome;