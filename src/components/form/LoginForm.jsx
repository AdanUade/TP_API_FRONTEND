import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authenticate, saveToken } from '../../api';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../store/userSlice';
import { useAsync, useForm } from '../../hooks';
import { isValidEmail, isNotEmpty } from '../../utils';
import { Button, ErrorGenerico as ErrorForm } from '../generico';
import FormField from './FormField';

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, error, execute } = useAsync();
    
    const from = location.state?.from || '/';

    const validationRules = useMemo(() => ({
        email: (value) => isValidEmail(value),
        password: (value) => isNotEmpty(value)
    }), []);

    const handleLogin = async (formValues) => {
        await execute(async () => {
            const response = await authenticate(formValues);
            saveToken(response.access_token);
            await dispatch(refreshUser());
            navigate(from, { replace: true });
        });
    };

    const {values,errors,isSubmitting,handleChange,handleBlur,handleSubmit} = useForm(
        {email: '', password: ''},
        handleLogin,
        validationRules
    );

    const isFormValid = useMemo(() => {
        return validationRules.email(values.email) && validationRules.password(values.password);
    }, [values, validationRules]);

    return (
        <>
            {error && <ErrorForm message={error} />}
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                    validationSuccess={
                        values.email && !errors.email 
                            ? 'Email válido' 
                            : null
                    }
                />

                <FormField
                    label="Contraseña:"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tu contraseña secreta"
                    autoComplete="current-password"
                    required
                    disabled={isSubmitting || isLoading}
                    validationError={errors.password}
                />
                
                <Button 
                    type="submit" 
                    variant="primary"
                    disabled={isSubmitting || isLoading || !isFormValid}
                >
                    {isLoading || isSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>
        </>
    );
};

export default LoginForm;