import './Searchbar.css';
import { FiSearch } from 'react-icons/fi';

function Searchbar() {
    return (
        <div className="Searchbar">
            <FiSearch className="Icon" />
            <input type="text" placeholder="Search movies, TV shows or people..." />
        </div>
    );
}

export default Searchbar;