import './Home.css';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { CAROUSEL_CATEGORIES } from '../constants';

function Home() {
  return (
    <div className="Home">
      <Header></Header>
      {Object.entries(CAROUSEL_CATEGORIES).map(([key, { title, type }]) => (
        <Carousel text={title} type={type} />
      ))}
    </div>
  );
}

export default Home;
