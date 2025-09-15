import './Home.css';
import Carousel from '../components/Carousel';
import { CAROUSEL_CATEGORIES } from '../constants';

function Home() {
  return (
    <div className="Home">
      {Object.entries(CAROUSEL_CATEGORIES).map(([key, { title, type }]) => (
        <Carousel text={title} type={type} />
      ))}
    </div>
  );
}

export default Home;
