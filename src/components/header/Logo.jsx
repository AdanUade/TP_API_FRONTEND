import { Link } from 'react-router-dom';
import { DATA_ORG } from '../../constants/dataOrg';

const Logo = () => {
    return (
        <Link to="/" className="text-4xl text-white font-bold text-shadow-Title cursor-pointer transition-colors hover:bg-gradient-to-b hover:from-sky-400 hover:via-white hover:to-sky-400 hover:text-transparent hover:bg-clip-text">
            {DATA_ORG.name}
        </Link>
    );
};

export default Logo;