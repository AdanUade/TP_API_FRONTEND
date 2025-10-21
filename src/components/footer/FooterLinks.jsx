import { Link } from 'react-router-dom';

const footerNavItems = [
    { path: '/contactos', label: 'Contacto' },
    { path: '/terminos', label: 'Términos y Cond.' },
    { path: '/privacidad', label: 'Privacidad' },
    ];

const FooterLinks = () => (
    <div className="flex justify-center space-x-4 sm:space-x-6 font-bold order-1 sm:order-2">
    {footerNavItems.map(item => (
        <Link
        key={item.path}
        to={item.path}
        className="cursor-pointer hover:text-yellow-400 transition-colors text-sm sm:text-base"
        >
        {item.label}
        </Link>
    ))}
    </div>
);

export default FooterLinks;