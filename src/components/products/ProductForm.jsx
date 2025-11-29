import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../../constants/productCategories';
import FormField from '../common/FormField';
import Button from '../common/Button';
import ErrorGenerico from '../common/ErrorGenerico';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../store/productSlice';
import { getToken } from '../../utils/token';
import { toast } from 'react-toastify';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../utils/validationSchemas';

const ProductForm = ({ product, onSuccess }) => {
    const isEditMode = Boolean(product);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const imageInputRef = useRef(null);
    const { isLoading, error } = useSelector(state => state.products);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors, isValid, isSubmitting: isFormSubmitting }
    } = useForm({
        resolver: zodResolver(productSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',
            description: '',
            price: '',
            discount: 0,
            stock: '',
            category: '',
            status: 'AVAILABLE'
        }
    });

    // Custom logic to handle "onSale" UI state which isn't part of the schema directly but affects discount
    const [isOnSale, setIsOnSale] = useState(false);
    const watchedPrice = useWatch({ control, name: 'price' });
    const watchedDiscount = useWatch({ control, name: 'discount' });

    useEffect(() => {
        if (isEditMode && product) {
            const onSale = product.discount < 1;
            setIsOnSale(onSale);

            reset({
                name: product.name || '',
                description: product.description || '',
                price: product.price,
                discount: onSale ? Math.round((1 - product.discount) * 100) / 100 : 0, // Convert backend 0.8 (20% off) to 0.2
                stock: product.stock,
                category: product.category || '',
                status: product.status || 'AVAILABLE'
            });
        }
    }, [product, isEditMode, reset]);

    useEffect(() => {
        if (!isOnSale) {
            setValue('discount', 0);
        }
    }, [isOnSale, setValue]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0] || null);
    };

    const finalPrice = (() => {
        const price = parseFloat(watchedPrice);
        const discountVal = parseFloat(watchedDiscount);

        if (isNaN(price)) return null;
        if (!isOnSale || isNaN(discountVal)) return price;

        return price * (1 - (discountVal || 0));
    })();

    const onSubmit = async (data) => {
        setSuccess(false);
        const token = getToken();

        const discountValue = parseFloat(data.discount);
        const discountForBackend = isOnSale ? (1 - discountValue) : 1;

        const productRequest = {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            discount: discountForBackend,
            stock: parseInt(data.stock, 10),
            category: data.category
        };

        let resultAction;

        if (isEditMode) {
            resultAction = await dispatch(updateProduct({ productId: product.id, productRequest, token }));
        } else {
            resultAction = await dispatch(createProduct({ productRequest, image, token }));
        }

        if (createProduct.fulfilled.match(resultAction) || updateProduct.fulfilled.match(resultAction)) {
            setSuccess(true);
            toast.success(isEditMode ? 'Producto actualizado correctamente' : 'Producto creado exitosamente');
            if (onSuccess) onSuccess(resultAction.payload);

            if (!isEditMode) {
                reset();
                setImage(null);
                setIsOnSale(false);
                if (imageInputRef.current) {
                    imageInputRef.current.value = '';
                }
            }
        } else {
            toast.error('Error al guardar el producto');
        }
    };

    const successMessage = isEditMode ? "¡Producto actualizado!" : "¡Producto creado!";
    const buttonText = isEditMode ? "Actualizar producto" : "Crear producto";
    const buttonLoadingText = isEditMode ? "Actualizando..." : "Creando...";

    return (
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_#1E90FF]">
            {error && <ErrorGenerico message={typeof error === 'string' ? error : (error.message || 'Ocurrió un error')} />}
            {success && <div className="text-green-600 mb-4">{successMessage}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        label="Nombre"
                        type="text"
                        placeholder="Ej: Producto increíble"
                        required
                        disabled={isLoading || isFormSubmitting}
                        validationError={errors.name?.message}
                        {...register('name')}
                    />
                    <FormField
                        label="Precio"
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        required
                        disabled={isLoading || isFormSubmitting}
                        validationError={errors.price?.message}
                        {...register('price')}
                    />

                    <div className="flex items-center gap-3 md:col-span-2">
                        <input
                            type="checkbox"
                            id="onSale"
                            checked={isOnSale}
                            onChange={(e) => setIsOnSale(e.target.checked)}
                            className="h-6 w-6 accent-blue-500 border-black cursor-pointer"
                        />
                        <label htmlFor="onSale" className="font-bold text-lg select-none cursor-pointer">
                            ¿Producto en oferta?
                        </label>
                    </div>

                    {isOnSale && (
                        <div>
                            <FormField
                                label="Descuento (0.0 - 1.0)"
                                type="number"
                                placeholder="Ej: 0.2 para 20%"
                                step="0.01"
                                min="0"
                                max="1"
                                required
                                disabled={isLoading || isFormSubmitting}
                                validationError={errors.discount?.message}
                                {...register('discount')}
                            />
                            {finalPrice !== null && !isNaN(finalPrice) && (
                                <p className="text-sm text-gray-700 mt-2">Precio final aproximado: <strong>${finalPrice.toFixed(2)}</strong></p>
                            )}
                        </div>
                    )}

                    <FormField
                        label="Stock"
                        type="number"
                        placeholder="0"
                        required
                        disabled={isLoading || isFormSubmitting}
                        validationError={errors.stock?.message}
                        {...register('stock')}
                    />

                    <div className="md:col-span-2">
                        <label htmlFor="category" className="text-2xl font-bold block mb-2 uppercase">Categoría</label>
                        <select
                            id="category"
                            required
                            disabled={isLoading || isFormSubmitting}
                            className="w-full p-3 border-2 border-black rounded-md font-sans text-lg focus:outline-none focus:ring-2 ring-blue-500 transition-shadow bg-white"
                            {...register('category')}
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
                                ⚠️ {errors.category.message}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <FormField
                            label="Descripción"
                            type="textarea"
                            rows={4}
                            placeholder="Describe el producto..."
                            required
                            disabled={isLoading || isFormSubmitting}
                            validationError={errors.description?.message}
                            {...register('description')}
                        />
                    </div>

                    {!isEditMode && (
                        <div className="md:col-span-2">
                            <label className="text-2xl font-bold block mb-2 uppercase">Imagen</label>
                            <input ref={imageInputRef} name="image" type="file" accept="image/*" onChange={handleImageChange} disabled={isLoading || isFormSubmitting} />
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
                        disabled={isLoading || isFormSubmitting || !isValid}
                    >
                        {isLoading || isFormSubmitting ? buttonLoadingText : buttonText}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
