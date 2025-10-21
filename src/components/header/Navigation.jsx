import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ navItems }) => {
    const location = useLocation();
    return (
        <nav className="hidden md:flex items-center space-x-8 text-xl text-white font-bold">
            {navItems.map(item => (
                <Link key={item.path} to={item.path} className={`cursor-pointer hover:text-yellow-400 transition-colors uppercase text-shadow ${location.pathname === item.path ? 'text-yellow-400' : ''}`}>
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default Navigation;