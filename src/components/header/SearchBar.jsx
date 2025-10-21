import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/icons/search-icon.svg?react';
import Button from '../generico/Button';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
    };

    return (
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center bg-white border-2 border-black rounded-full overflow-hidden">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-1 text-black outline-none bg-transparent"
            />
            <Button 
                type="submit" 
                variant="secondary"
                className="!w-auto !p-2 !rounded-none border-l-2 border-black !border-b-0"
            >
                <SearchIcon />
            </Button>
        </form>
    );
};

export default SearchBar;