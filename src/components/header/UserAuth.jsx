import { Link, useNavigate } from 'react-router-dom';
import UserIcon from '../../assets/icons/user-icon.svg?react';
import Button from '../generico/Button';
import { useUser } from '../../context/UserContext';

const UserAuth = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="hidden md:flex items-center gap-4 text-white font-bold">
      {user ? (
        <>
          <Link to="/perfil" className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <span className="hidden lg:inline">{user.name}</span>
            <UserIcon />
          </Link>
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="!w-auto !py-1 !px-3 !text-sm"
          >
            Salir
          </Button>
        </>
      ) : (
        <>
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded-md border-2 border-black hover:bg-blue-600 uppercase transition-colors">
            Login
          </Link>
          <Link to="/register" className="bg-yellow-400 text-black px-4 py-2 rounded-md border-2 border-black hover:bg-yellow-500 uppercase transition-colors">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default UserAuth;