import './Searchbar.css';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  return (
    <div className="Searchbar">
      <FiSearch className="Icon" />
      <input
        type="text"
        placeholder="Search movies, TV shows or people..."
        aria-label="Search"
      />
    </div>
  );
};

export default Searchbar;
