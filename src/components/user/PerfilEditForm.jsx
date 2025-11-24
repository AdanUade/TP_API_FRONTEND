import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/userSlice';
import { useForm } from '../../hooks/useForm';
import { isValidEmail } from '../../utils/validators';
import FormField from '../common/FormField';
import Button from '../common/Button';
import ErrorGenerico from '../common/ErrorGenerico';
import { toast } from 'react-toastify';

const MIN_NAME_LENGTH = 3;

const PerfilEditForm = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const validationRules = useMemo(() => ({
        name: (value) => value.trim().length >= MIN_NAME_LENGTH,
        email: (value) => isValidEmail(value)
    }), []);

    const handleUpdateProfile = async (formValues) => {
        const updatedData = {};
        if (formValues.name !== user?.name) updatedData.name = formValues.name;
        if (formValues.email !== user?.email) updatedData.email = formValues.email;

        if (Object.keys(updatedData).length === 0) {
            // TODO: Handle 'no changes' closer to UI or ignore
            return;
        }

        const resultAction = await dispatch(updateProfile(updatedData));
        if (updateProfile.fulfilled.match(resultAction)) {
            setSuccess(true);
            toast.success('Perfil actualizado exitosamente');
            setTimeout(() => {
                navigate('/perfil');
            }, 2000);
        } else {
            toast.error(resultAction.payload || 'Error al actualizar perfil');
        }
    };

    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm(
        { name: user?.name || '', email: user?.email || '' },
        handleUpdateProfile,
        validationRules
    );

    const isFormValid = useMemo(() => {
        return validationRules.name(values.name) && validationRules.email(values.email);
    }, [values, validationRules]);

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

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                <FormField
                    label="Nombre:"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tu nombre completo"
                    autoComplete="name"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.name}
                    warningMessage={
                        values.name.length > 0 && 
                        values.name.length < MIN_NAME_LENGTH
                            ? `Faltan ${MIN_NAME_LENGTH - values.name.length} caracteres más`
                            : null
                    }
                    validationSuccess={
                        values.name.length >= MIN_NAME_LENGTH
                            ? 'Nombre válido'
                            : null
                    }
                />

                <FormField
                    label="Email:"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="tu@email.com"
                    autoComplete="email"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.email}
                    validationSuccess={
                        isValidEmail(values.email)
                            ? 'Email válido'
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
                        {isLoading || isSubmitting ? 'Actualizando...' : 'Guardar Cambios'}
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

export default PerfilEditForm;
