import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserAuth from './UserAuth';
import CartHeader from './CartHeader';
import { NAV_ITEMS } from '../../constants/userRoles';
import { useAuth } from '../../hooks';

const Header = () => {
    const { isSeller, isAdmin } = useAuth();
    
    // Determinar nav items según rol
    let navItems = NAV_ITEMS.USER; // default
    
    if (isAdmin) {
        navItems = NAV_ITEMS.ADMIN;
    } else if (isSeller) {
        navItems = NAV_ITEMS.SELLER;
    }

    // Solo usuarios regulares pueden ver el carrito
    const showCart = !isSeller && !isAdmin;

    return (
        <header className="bg-red-600 border-b-8 border-black sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Logo />
                <Navigation navItems={navItems} />
                <div className="flex items-center space-x-4">
                    <SearchBar />
                    {showCart && <CartHeader />}
                    <UserAuth />
                </div>
            </div>
        </header>
    );
};

export default Header;