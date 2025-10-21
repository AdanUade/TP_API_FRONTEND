import Button from '../generico/Button';
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const CardUser = () => {
    const { user } = useUser();
    const { isUser } = useAuth();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/perfil/edit');
    };

    const handleChangePassword = () => {
        navigate('/perfil/change-password');
    };  

    const handleViewOrders = () => {
        navigate('/perfil/orders');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_#FBBF24]">
            <div className="text-center">
                <h3 className="text-4xl font-bold mb-2">¡Hola, {user.name}!</h3>
                <p className="text-xl mt-4 text-gray-700 font-sans"><strong>Email:</strong> {user.email}</p>
                {user.rol && (
                    <p className="text-lg mt-2 text-gray-600 font-sans">
                        <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-bold">
                            {user.rol}
                        </span>
                    </p>
                )}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="primary" onClick={handleEditProfile}>Editar Informacion</Button>
                    <Button variant="danger" onClick={handleChangePassword}>Cambiar Contraseña</Button>
                    {isUser && <Button variant="secondary" onClick={handleViewOrders}>Mis Pedidos</Button>}
                </div>
            </div>
        </div>
    );
};

export default CardUser;
