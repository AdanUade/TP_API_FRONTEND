import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, removeToken } from '../api/AuthApi';
import { getUserMe } from '../api/UserApi';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe usarse dentro de UserProvider');
    }
    return context;
};

/**
 * Proveedor del contexto de usuario
 * Gestiona el estado de autenticación global de la aplicación
 */
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Obtener información del usuario autenticado
     */
    const refreshUser = () => {
        if (isAuthenticated()) {
            getUserMe()
                .then(userData => {
                    setUser(userData);
                    console.log('✅ refreshUser: Usuario cargado exitosamente.', userData);
                })
                .catch(error => {
                    console.error('🔴 refreshUser: La llamada a getUserMe falló. Error:', error);
                    console.log('🔴 refreshUser: Eliminando token de autenticación debido a error en la obtención del usuario.');
                    removeToken();
                    setUser(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setUser(null);
            setIsLoading(false);
        }
    };

    /**
     * Cerrar sesión
     */
    const logout = () => {
        console.log('✅ logout: Cerrando sesión.');
        removeToken();
        setUser(null);
    };

    // Cargar usuario al montar el componente
    useEffect(() => {
        refreshUser();
    }, []);

    const value = {
        user,
        setUser,
        refreshUser,
        logout,
        isLoading
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
