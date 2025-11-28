import './Header.css';
import Searchbar from './Searchbar';
import { FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="Header">
      <div onClick={handleClick} className="Button">
        <FiHome />
      </div>
      <div className="Searchbar">
        <Searchbar />
      </div>
    </div>
  );
};

export default Header;
