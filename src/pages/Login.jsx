import { Link } from 'react-router-dom';
import PageTitle from '../components/page/PageTitle';
import LoginForm from '../components/auth/LoginForm';

/**
 * Vista de inicio de sesión
 * Contiene el formulario de login y enlace a registro
 */
const Login = () => {
    return (
        <div>
            <PageTitle 
                title="Acceso de Héroes" 
                subtitle="Identifícate para continuar tu misión" 
            />
            
            <div className="max-w-md mx-auto bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_#1E90FF]">
                <LoginForm />

                <p className="text-center mt-6 font-sans">
                    ¿No tienes cuenta?{' '}
                    <Link 
                        to="/register" 
                        className="font-bold text-blue-600 hover:underline"
                    >
                        ¡Regístrate!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;