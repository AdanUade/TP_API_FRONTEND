import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/userSlice';
import Button from '../common/Button';
import ErrorForm from '../common/ErrorGenerico';
import FormField from '../common/FormField';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validationSchemas';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting: isFormSubmitting }
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur',
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data) => {
        const resultAction = await dispatch(registerUser({
            name: data.username,
            email: data.email,
            password: data.password,
            rol: 'USER'
        }));

        if (registerUser.fulfilled.match(resultAction)) {
            toast.success(`¡Bienvenido a bordo, ${resultAction.payload.name}! 🚀`);
            navigate('/', { replace: true });
        } else {
            toast.error(resultAction.payload || 'Error en el registro');
        }
    };

    return (
        <>
            {error && <ErrorForm message={error} />}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <FormField
                    label="Nombre de Héroe:"
                    type="text"
                    placeholder="Ej: Capitán Zarpado"
                    autoComplete="name"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.username?.message}
                    {...register('username')}
                />

                <FormField
                    label="Email:"
                    type="email"
                    placeholder="tu-email@heroe.com"
                    autoComplete="email"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.email?.message}
                    {...register('email')}
                />
                
                <FormField
                    label="Contraseña:"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    autoComplete="new-password"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.password?.message}
                    {...register('password')}
                />

                <FormField
                    label="Confirmar Contraseña:"
                    type="password"
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                    required
                    disabled={isFormSubmitting || isLoading}
                    validationError={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />
                
                <Button 
                    type="submit" 
                    variant="secondary"
                    disabled={isFormSubmitting || isLoading || !isValid}
                >
                    {isFormSubmitting || isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
            </form>
        </>
    );
};

export default RegisterForm;
