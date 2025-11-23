import { USER_ROLES } from '../constants/userRoles';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, refreshUser as refreshUserAction } from '../store/userSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector(state => state.user);

    const logout = () => dispatch(logoutUser());
    const refreshUser = () => dispatch(refreshUserAction());

    const isAuthenticated = !!user;

    const isUser = user?.rol === USER_ROLES.USER;
    const isSeller = user?.rol === USER_ROLES.SELLER;
    const isAdmin = user?.rol === USER_ROLES.ADMIN;

    const hasRole = (role) => {
        return user?.rol === role;
    };

    const hasAnyRole = (roles) => {
        if (!Array.isArray(roles) || !user) return false;
        return roles.includes(user.rol);
    };

    const hasAllRoles = (roles) => {
        if (!Array.isArray(roles) || !user) return false;
        return roles.every(role => user.rol === role);
    };

    const canEditProducts = () => {
        return isSeller || isAdmin;
    };

    const canDeleteProducts = () => {
        return isSeller || isAdmin;
    };

    const canCreateProducts = () => {
        return isSeller;
    };

    const canManageUsers = () => {
        return isAdmin;
    };

    const canCheckout = () => {
        return isUser;
    };

    return {
        user,
        isLoading,
        isAuthenticated,
        
        isUser,
        isSeller,
        isAdmin,
        
        hasRole,
        hasAnyRole,
        hasAllRoles,
        
        canEditProducts,
        canDeleteProducts,
        canCreateProducts,
        canManageUsers,
        canCheckout,
        
        logout,
        refreshUser,
    };
};
