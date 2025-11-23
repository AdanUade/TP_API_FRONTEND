import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { ROUTES } from '../../constants/routes';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  allowedRoles = [],
  deniedRoles = [],
  redirectTo,
}) => {
  const { user, isAuthenticated, hasRole, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Caso 1: Ruta requiere autenticación pero el usuario no está autenticado
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo || ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Caso 2: Usuario autenticado intenta acceder a ruta de solo invitados (login, register)
  if (!requireAuth && deniedRoles.length > 0 && isAuthenticated) {
    const userHasDeniedRole = deniedRoles.some(role => hasRole(role));
    if (userHasDeniedRole) {
      return <Navigate to={redirectTo || ROUTES.HOME} replace />;
    }
  }

  // Caso 3: Verificar roles permitidos
  if (allowedRoles.length > 0 && isAuthenticated) {
    const hasPermission = allowedRoles.some(role => hasRole(role));
    
    if (!hasPermission) {
      // Redirigir según el rol del usuario
      const defaultRedirect = user?.rol === 'ADMIN' 
        ? ROUTES.ADMIN.DASHBOARD 
        : user?.rol === 'SELLER'
        ? ROUTES.SELLER.DASHBOARD
        : ROUTES.HOME;
      
      return <Navigate to={redirectTo || defaultRedirect} replace />;
    }
  }

  // Usuario autorizado, renderizar children
  return children;
};

// Solo para administradores
export const AdminRoute = ({ children, ...props }) => (
  <ProtectedRoute allowedRoles={['ADMIN']} {...props}>
    {children}
  </ProtectedRoute>
);

// Solo para vendedores (incluye admins que también pueden vender)
export const SellerRoute = ({ children, ...props }) => (
  <ProtectedRoute allowedRoles={['SELLER', 'ADMIN']} {...props}>
    {children}
  </ProtectedRoute>
);

// Para cualquier usuario autenticado
export const AuthenticatedRoute = ({ children, ...props }) => (
  <ProtectedRoute requireAuth={true} {...props}>
    {children}
  </ProtectedRoute>
);

// Solo para invitados (no autenticados o usuarios básicos)
export const GuestRoute = ({ children, ...props }) => (
  <ProtectedRoute 
    requireAuth={false} 
    deniedRoles={['ADMIN', 'SELLER', 'USER']}
    {...props}
  >
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;
