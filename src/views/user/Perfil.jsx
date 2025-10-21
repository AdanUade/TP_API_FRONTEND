import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import PageTitle from "../../components/page/PageTitle";
import CardUser from "../../components/user/CardUser";

const Perfil = () => {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login', { replace: true });
        }
    }, [user, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400 border-t-transparent"></div>
                    <p className="mt-4 text-xl font-bold">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <>  
            <PageTitle title="Mi Perfil" subtitle="Gestiona tu información personal y pedidos" />
            <CardUser />
        </>
    );
};

export default Perfil;