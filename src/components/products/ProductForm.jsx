import { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { isNotEmpty } from '../../utils/validators';
import { PRODUCT_CATEGORIES } from '../../constants/productCategories';
import FormField from '../common/FormField';
import Button from '../common/Button';
import ErrorGenerico from '../common/ErrorGenerico';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../store/productSlice';
import { getToken } from '../../api/AuthApi';

const ProductForm = ({ product, onSuccess }) => {
    const isEditMode = Boolean(product);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const imageInputRef = useRef(null);
    const { isLoading, error } = useSelector(state => state.products);
    const [success, setSuccess] = useState(false);

    const validationRules = useMemo(() => ({
        name: (value) => isNotEmpty(value),
        description: (value) => isNotEmpty(value),
        price: (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
        stock: (value) => !isNaN(parseInt(value, 10)) && parseInt(value, 10) >= 0,
        category: (value) => isNotEmpty(value),
        discount: (value, allValues) => {
            if (!allValues.onSale) return true; // Not required if not on sale
            return !isNaN(parseFloat(value)) && parseFloat(value) > 0 && parseFloat(value) <= 100;
        },
    }), []);

    const handleProductSubmit = async (formValues) => {
        setSuccess(false);
        const token = getToken();
        
        const pct = formValues.onSale ? parseFloat(formValues.discount) : 0;
        const discountForBackend = (100 - Math.max(0, Math.min(100, pct))) / 100;

        const productRequest = {
            name: formValues.name,
            description: formValues.description,
            price: parseFloat(formValues.price),
            discount: discountForBackend,
            stock: parseInt(formValues.stock, 10),
            category: formValues.category
        };

        let resultAction;

        if (isEditMode) {
             resultAction = await dispatch(updateProduct({ productId: product.id, productRequest, token }));
        } else {
             resultAction = await dispatch(createProduct({ productRequest, image, token }));
        }

        if (createProduct.fulfilled.match(resultAction) || updateProduct.fulfilled.match(resultAction)) {
            setSuccess(true);
            if (onSuccess) onSuccess(resultAction.payload);

            if (!isEditMode) {
                reset();
                setImage(null);
                if (imageInputRef.current) {
                    imageInputRef.current.value = '';
                }
            }
        }
    };
    
    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        setFormValues
    } = useForm(
        {
            name: '',
            description: '',
            price: '',
            discount: '0',
            stock: '',
            category: '',
            onSale: false
        },
        handleProductSubmit,
        validationRules
    );

    useEffect(() => {
        if (isEditMode && product) {
            const onSale = product.discount < 1;
            setFormValues({
                name: product.name || '',
                description: product.description || '',
                price: product.price != null ? String(product.price) : '',
                discount: onSale ? String(Math.round((100 - (product.discount * 100)) * 10) / 10) : '0',
                stock: product.stock != null ? String(product.stock) : '',
                category: product.category || '',
                onSale: onSale
            });
        }
    }, [product, isEditMode, setFormValues]);

    useEffect(() => {
        if (!values.onSale && values.discount !== '0') {
            setFormValues({ discount: '0' });
        }
    }, [values.onSale, values.discount, setFormValues]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0] || null);
    };

    const isFormValid = useMemo(() => {
        return validationRules.name(values.name) &&
               validationRules.description(values.description) &&
               validationRules.price(values.price) &&
               validationRules.stock(values.stock) &&
               validationRules.category(values.category) &&
               validationRules.discount(values.discount, values);
    }, [values, validationRules]);

    const finalPrice = useMemo(() => {
        const price = parseFloat(values.price);
        const pct = values.onSale ? parseFloat(values.discount) : 0;
        if (isNaN(price) || isNaN(pct)) return null;
        const multiplier = (100 - Math.max(0, Math.min(100, pct))) / 100;
        return Math.round((price * multiplier) * 100) / 100;
    }, [values.price, values.discount, values.onSale]);

    const successMessage = isEditMode ? "¡Producto actualizado!" : "¡Producto creado!";
    const buttonText = isEditMode ? "Actualizar producto" : "Crear producto";
    const buttonLoadingText = isEditMode ? "Actualizando..." : "Creando...";

    return (
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_#1E90FF]">
            {error && <ErrorGenerico message={typeof error === 'string' ? error : (error.message || 'Ocurrió un error')} />}
            {success && <div className="text-green-600 mb-4">{successMessage}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid gap-6 md:grid-cols-2">
                    <FormField label="Nombre" type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Ej: Producto increíble" required disabled={isLoading || isSubmitting} validationError={errors.name} />
                    <FormField label="Precio" type="number" name="price" value={values.price} onChange={handleChange} onBlur={handleBlur} placeholder="0.00" required disabled={isLoading || isSubmitting} validationError={errors.price} />
                    
                    <div className="flex items-center gap-3 md:col-span-2">
                        <input
                            type="checkbox"
                            id="onSale"
                            name="onSale"
                            checked={values.onSale}
                            onChange={handleChange}
                            className="h-6 w-6 accent-blue-500 border-black cursor-pointer"
                        />
                        <label htmlFor="onSale" className="font-bold text-lg select-none cursor-pointer">
                            ¿Producto en oferta?
                        </label>
                    </div>

                    {values.onSale && (
                        <div>
                            <FormField label="Descuento (%)" type="number" name="discount" value={values.discount} onChange={handleChange} onBlur={handleBlur} placeholder="Ej: 20" step="0.1" min="0.1" max="100" required disabled={isLoading || isSubmitting} validationError={errors.discount} />
                            {finalPrice !== null && (
                                <p className="text-sm text-gray-700 mt-2">Precio final aproximado: <strong>${finalPrice}</strong></p>
                            )}
                        </div>
                    )}

                    <FormField label="Stock" type="number" name="stock" value={values.stock} onChange={handleChange} onBlur={handleBlur} placeholder="0" required disabled={isLoading || isSubmitting} validationError={errors.stock} />
                    
                    <div className="md:col-span-2">
                        <label htmlFor="category" className="text-2xl font-bold block mb-2 uppercase">Categoría</label>
                        <select
                            id="category"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            disabled={isLoading || isSubmitting}
                            className="w-full p-3 border-2 border-black rounded-md font-sans text-lg focus:outline-none focus:ring-2 ring-blue-500 transition-shadow bg-white"
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {Object.values(PRODUCT_CATEGORIES).map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-sm text-red-600 mt-1">
                                ⚠️ Debes seleccionar una categoría
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <FormField label="Descripción" type="textarea" name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} rows={4} placeholder="Describe el producto..." required disabled={isLoading || isSubmitting} validationError={errors.description} />
                    </div>

                    {!isEditMode && (
                        <div className="md:col-span-2">
                            <label className="text-2xl font-bold block mb-2 uppercase">Imagen</label>
                            <input ref={imageInputRef} name="image" type="file" accept="image/*" onChange={handleImageChange} disabled={isLoading || isSubmitting} />
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button 
                        type="button"
                        variant="secondary" 
                        onClick={() => navigate(-1)}
                        className="flex-1 order-2 sm:order-1"
                    >
                        ← Volver Atrás
                    </Button>
                    <Button 
                        type="submit" 
                        variant="primary"
                        className="w-full flex-1 order-1 sm:order-2" 
                        disabled={isLoading || isSubmitting || !isFormValid}
                    >
                        {isLoading || isSubmitting ? buttonLoadingText : buttonText}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
