import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import { Button, ErrorGenerico as ErrorForm } from '../common';
import FormField from '../common/FormField';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validationSchemas';

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.user);
    
    const from = location.state?.from || '/';

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting: isFormSubmitting }
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        const resultAction = await dispatch(loginUser(data));
        if (loginUser.fulfilled.match(resultAction)) {
            toast.success(`¡Bienvenido de nuevo, ${resultAction.payload.name}! 👋`);
            navigate(from, { replace: true });
        } else {
            toast.error(resultAction.payload || 'Error al iniciar sesión');
        }
    };

    return (
        <>
            {error && <ErrorForm message={error} />}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <FormField
                    label="Usuario:"
                    type="text"
                    placeholder="tu-usuario"
                    autoComplete="username"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.username?.message}
                    {...register('username')}
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
