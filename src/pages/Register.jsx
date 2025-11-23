import { Link } from 'react-router-dom';
import PageTitle from '../components/page/PageTitle';
import RegisterForm from '../components/auth/RegisterForm';

/**
 * Vista de registro de nuevos usuarios
 * Contiene el formulario de registro y enlace a login
 */
const Register = () => {
    return (
        <div>
            <PageTitle 
                title="Registro de Nuevos Héroes" 
                subtitle="Únete a la liga de Zarp-Verse" 
            />
            
            <div className="max-w-md mx-auto bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_#FBBF24]">
                <RegisterForm />

                <p className="text-center mt-6 font-sans">
                    ¿Ya tienes cuenta?{' '}
                    <Link 
                        to="/login" 
                        className="font-bold text-blue-600 hover:underline"
                    >
                        ¡Inicia sesión!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;