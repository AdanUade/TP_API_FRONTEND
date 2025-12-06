import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import { Button, ErrorGenerico as ErrorForm } from '../common';
import FormField from '../common/FormField';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validationSchemas';
import { useEffect, useState } from 'react';

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, error, user } = useSelector(state => state.user);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const from = location.state?.from || '/';

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting: isFormSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        setIsSubmitting(true);
        dispatch(loginUser(data));
    };

    useEffect(() => {
        // Detecta cuando termina el loading
        if (isSubmitting && !isLoading) {
            if (user && !error) {
                // Login exitoso
                toast.success(`¡Bienvenido de nuevo, ${user.name}! 👋`);
                navigate(from, { replace: true });
            } else if (error) {
                // Login fallido
                toast.error(error || 'Error al iniciar sesión');
            }
            setIsSubmitting(false);
        }
    }, [isSubmitting, isLoading, user, error, navigate, from]);

    return (
        <>
            {error && <ErrorForm message={error} />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <FormField
                    label="Email:"
                    type="email"
                    placeholder="tu-email@ejemplo.com"
                    autoComplete="email"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.email?.message}
                    {...register('email')}
                />

                <FormField
                    label="Contraseña:"
                    type="password"
                    placeholder="Tu contraseña secreta"
                    autoComplete="current-password"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.password?.message}
                    {...register('password')}
                />

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isFormSubmitting || isLoading || !isValid}
                >
                    {isLoading || isFormSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>
        </>
    );
};

export default LoginForm;
