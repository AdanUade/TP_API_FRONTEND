import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/userSlice';
import FormField from '../common/FormField';
import Button from '../common/Button';
import ErrorGenerico from '../common/ErrorGenerico';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Simplified schema for this form since it only updates name/email
const editProfileSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Email inválido').min(1, 'El email es requerido'),
});

const PerfilEditForm = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateResult, setUpdateResult] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting: isFormSubmitting }
    } = useForm({
        resolver: zodResolver(editProfileSchema),
        mode: 'onBlur',
        defaultValues: {
            name: user?.name || '',
            email: user?.email || ''
        }
    });

    const handleUpdateProfile = (data) => {
        const updatedData = {};
        if (data.name !== user?.name) updatedData.name = data.name;
        if (data.email !== user?.email) updatedData.email = data.email;

        if (Object.keys(updatedData).length === 0) {
            toast.info('No se detectaron cambios');
            return;
        }

        setIsSubmitting(true);
        const resultAction = dispatch(updateProfile(updatedData));
        setUpdateResult(resultAction);
    };

    useEffect(() => {
        // Detecta cuando termina el update
        if (isSubmitting && updateResult) {
            Promise.resolve(updateResult).then((result) => {
                if (updateProfile.fulfilled.match(result)) {
                    // Actualización exitosa
                    setSuccess(true);
                    toast.success('Perfil actualizado exitosamente');
                    setTimeout(() => {
                        navigate('/perfil');
                    }, 2000);
                } else {
                    // Error al actualizar
                    toast.error(result.payload || 'Error al actualizar perfil');
                }
                setIsSubmitting(false);
                setUpdateResult(null);
            });
        }
    }, [isSubmitting, updateResult, navigate]);

    const handleCancel = () => {
        navigate('/perfil');
    };

    return (
        <div className="bg-white border-4 border-black p-8 rounded-lg shadow-[12px_12px_0_0_#FBBF24]">
            {error && <ErrorGenerico message={error.message || error} />}

            {success && (
                <div className="mb-4 p-4 bg-green-100 border-2 border-green-500 rounded-md text-center">
                    <p className="text-green-700 font-bold">¡Perfil actualizado exitosamente!</p>
                    <p className="text-sm text-green-600 mt-1">Redirigiendo al perfil...</p>
                </div>
            )}

            <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6 max-w-lg mx-auto">
                <FormField
                    label="Nombre:"
                    type="text"
                    placeholder="Tu nombre completo"
                    autoComplete="name"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.name?.message}
                    {...register('name')}
                />

                <FormField
                    label="Email:"
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.email?.message}
                    {...register('email')}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        type="submit"
                        variant="success"
                        disabled={isFormSubmitting || isLoading || !isValid}
                        className="flex-1"
                    >
                        {isLoading || isFormSubmitting ? 'Actualizando...' : 'Guardar Cambios'}
                    </Button>

                    <Button
                        type="button"
                        onClick={handleCancel}
                        variant="danger"
                        disabled={isFormSubmitting || isLoading}
                        className="flex-1"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PerfilEditForm;
