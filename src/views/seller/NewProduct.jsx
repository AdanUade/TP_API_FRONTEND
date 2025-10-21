
import { useState } from "react";
import PageTitle from "../../components/page/PageTitle";
import ProductForm from "../../components/form/ProductForm";

const NewProduct = () => {
    const [formSuccess, setFormSuccess] = useState(false);

    return (
        <>
            <PageTitle title="Nuevo Producto" subtitle="Crea un nuevo producto para vender" />
            <ProductForm onSuccess={() => setFormSuccess(true)} />
            
            {formSuccess && <div className="text-green-600 mt-4 text-center font-bold">¡El nuevo producto ha sido añadido a tu inventario!</div>}
        </>
    );
};

export default NewProduct;