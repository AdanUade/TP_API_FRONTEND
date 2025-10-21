import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserMe } from '../../api/UserApi';
import { useAsync } from '../../hooks/useAsync';
import { useForm } from '../../hooks/useForm';
import { isValidPassword } from '../../utils/validators';
import Button from '../generico/Button';
import ErrorGenerico from '../generico/ErrorGenerico';
import FormField from '../form/FormField';

const MIN_PASSWORD_LENGTH = 8;

const NewPasswordForm = () => {
    const navigate = useNavigate();
    const { isLoading, error, execute } = useAsync();
    const [success, setSuccess] = useState(false);

    const validationRules = useMemo(() => ({
        newPassword: (value) => isValidPassword(value, MIN_PASSWORD_LENGTH),
        confirmPassword: (value, allValues) => value === allValues.newPassword
    }), []);

    const handleUpdatePassword = async (formValues) => {
        await execute(async () => {
            await updateUserMe({ password: formValues.newPassword });
            setSuccess(true);
            
            setTimeout(() => {
                navigate('/perfil');
            }, 2000);
        });
    };

    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(
        { newPassword: '', confirmPassword: '' },
        handleUpdatePassword,
        validationRules
    );

    const isFormValid = useMemo(() => {
        return validationRules.newPassword(values.newPassword) &&
               validationRules.confirmPassword(values.confirmPassword, values);
    }, [values, validationRules]);

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

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                <FormField
                    label="Nueva Contraseña:"
                    type="password"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`}
                    autoComplete="new-password"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.newPassword}
                    warningMessage={
                        values.newPassword && 
                        values.newPassword.length > 0 && 
                        values.newPassword.length < MIN_PASSWORD_LENGTH 
                            ? `Faltan ${MIN_PASSWORD_LENGTH - values.newPassword.length} caracteres más`
                            : null
                    }
                    validationSuccess={
                        values.newPassword && !errors.newPassword && values.newPassword.length >= MIN_PASSWORD_LENGTH
                            ? 'Contraseña válida' 
                            : null
                    }
                />

                <FormField
                    label="Confirmar Nueva Contraseña:"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Repite la nueva contraseña"
                    autoComplete="new-password"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.confirmPassword}
                    warningMessage={
                        values.confirmPassword && 
                        values.newPassword !== values.confirmPassword 
                            ? 'Las contraseñas no coinciden'
                            : null
                    }
                    validationSuccess={
                        values.confirmPassword &&
                        !errors.confirmPassword &&
                        values.newPassword === values.confirmPassword &&
                        values.newPassword.length >= MIN_PASSWORD_LENGTH
                            ? 'Las contraseñas coinciden' 
                            : null
                    }
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                        type="submit" 
                        variant="success"
                        disabled={isSubmitting || isLoading || !isFormValid}
                        className="flex-1"
                    >
                        {isLoading || isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
                    </Button>
                    
                    <Button 
                        type="button"
                        onClick={handleCancel}
                        variant="danger"
                        disabled={isSubmitting || isLoading}
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