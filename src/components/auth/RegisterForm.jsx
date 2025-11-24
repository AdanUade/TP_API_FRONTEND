import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/userSlice';
import { useForm } from '../../hooks/useForm';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import Button from '../common/Button';
import ErrorForm from '../common/ErrorGenerico';
import FormField from '../common/FormField';
import { toast } from 'react-toastify';

const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 3;

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.user);

    const validationRules = useMemo(() => ({
        name: (value) => value.trim().length >= MIN_NAME_LENGTH,
        email: (value) => isValidEmail(value),
        password: (value) => isValidPassword(value, MIN_PASSWORD_LENGTH),
        confirmPassword: (value, allValues) => value === allValues.password,
    }), []);

    const handleRegister = async (formValues) => {
        const resultAction = await dispatch(registerUser({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
            rol: 'USER'
        }));

        if (registerUser.fulfilled.match(resultAction)) {
            toast.success(`¡Bienvenido a bordo, ${resultAction.payload.name}! 🚀`);
            navigate('/', { replace: true });
        } else {
            toast.error(resultAction.payload || 'Error en el registro');
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
        { name: '', email: '', password: '', confirmPassword: '' },
        handleRegister,
        validationRules
    );

    const isFormValid = useMemo(() => {
        return validationRules.name(values.name) &&
               validationRules.email(values.email) &&
               validationRules.password(values.password) &&
               validationRules.confirmPassword(values.confirmPassword, values);
    }, [values, validationRules]);


    return (
        <>
            {error && <ErrorForm message={error} />}
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <FormField
                    label="Nombre de Héroe:"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ej: Capitán Zarpado"
                    autoComplete="name"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.name}
                />

                <FormField
                    label="Email:"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="tu-email@heroe.com"
                    autoComplete="email"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.email}
                />
                
                <FormField
                    label="Contraseña:"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`}
                    autoComplete="new-password"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.password}
                />

                <FormField
                    label="Confirmar Contraseña:"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.confirmPassword}
                />
                
                <Button 
                    type="submit" 
                    variant="secondary"
                    disabled={isSubmitting || isLoading || !isFormValid}
                >
                    {isSubmitting || isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
            </form>
        </>
    );
};

export default RegisterForm;