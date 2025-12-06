import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../store/userSlice';
import Button from '../common/Button';
import ErrorGenerico from '../common/ErrorGenerico';
import FormField from '../common/FormField';
import { toast } from 'react-toastify';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '../../utils/validationSchemas';

const MIN_PASSWORD_LENGTH = 6; // Updated to match schema

const NewPasswordForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.user);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting: isFormSubmitting }
    } = useForm({
        resolver: zodResolver(passwordSchema),
        mode: 'onBlur',
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    });

    const watchedNewPassword = useWatch({ control, name: 'newPassword' });
    const watchedConfirmPassword = useWatch({ control, name: 'confirmNewPassword' });

    const handleUpdatePassword = (data) => {
        setIsSubmitting(true);
        dispatch(updatePassword({
            oldPassword: data.currentPassword,
            password: data.newPassword
        }));
    };

    useEffect(() => {
        // Detecta cuando termina el loading
        if (isSubmitting && !isLoading) {
            if (!error) {
                // Actualización exitosa
                setSuccess(true);
                toast.success('Contraseña actualizada correctamente');
                setTimeout(() => {
                    navigate('/perfil');
                }, 2000);
            } else {
                // Error al actualizar
                toast.error(error || 'Error al actualizar contraseña');
            }
            setIsSubmitting(false);
        }
    }, [isSubmitting, isLoading, error, navigate]);

    const handleCancel = () => {
        navigate('/perfil');
    };

    return (
        <div className="bg-white border-4 border-black p-8 rounded-lg shadow-[12px_12px_0_0_#FBBF24]">
            {error && <ErrorGenerico message={error} />}

            {success && (
                <div className="mb-4 p-4 bg-green-100 border-2 border-green-500 rounded-md text-center">
                    <p className="text-green-700 font-bold">¡Contraseña actualizada exitosamente!</p>
                    <p className="text-sm text-green-600 mt-1">Redirigiendo al perfil...</p>
                </div>
            )}

            <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-6 max-w-lg mx-auto">
                <FormField
                    label="Contraseña Actual:"
                    type="password"
                    placeholder="Tu contraseña actual"
                    autoComplete="current-password"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.currentPassword?.message}
                    {...register('currentPassword')}
                />

                <FormField
                    label="Nueva Contraseña:"
                    type="password"
                    placeholder={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`}
                    autoComplete="new-password"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.newPassword?.message}
                    warningMessage={
                        watchedNewPassword &&
                            watchedNewPassword.length > 0 &&
                            watchedNewPassword.length < MIN_PASSWORD_LENGTH
                            ? `Faltan ${MIN_PASSWORD_LENGTH - watchedNewPassword.length} caracteres más`
                            : null
                    }
                    validationSuccess={
                        watchedNewPassword && !errors.newPassword && watchedNewPassword.length >= MIN_PASSWORD_LENGTH
                            ? 'Contraseña válida'
                            : null
                    }
                    {...register('newPassword')}
                />

                <FormField
                    label="Confirmar Nueva Contraseña:"
                    type="password"
                    placeholder="Repite la nueva contraseña"
                    autoComplete="new-password"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.confirmNewPassword?.message}
                    warningMessage={
                        watchedConfirmPassword &&
                            watchedNewPassword !== watchedConfirmPassword
                            ? 'Las contraseñas no coinciden'
                            : null
                    }
                    validationSuccess={
                        watchedConfirmPassword &&
                            !errors.confirmNewPassword &&
                            watchedNewPassword === watchedConfirmPassword &&
                            watchedNewPassword.length >= MIN_PASSWORD_LENGTH
                            ? 'Las contraseñas coinciden'
                            : null
                    }
                    {...register('confirmNewPassword')}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        type="submit"
                        variant="success"
                        disabled={isFormSubmitting || isLoading || !isValid}
                        className="flex-1"
                    >
                        {isLoading || isFormSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
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

export default NewPasswordForm;
