import './App.css';
import Header from './components/Header';
import Carousel from './components/Carousel';
import { CAROUSEL_CATEGORIES } from './components/constants';

function App() {
  return (
    <div className="App">
      <Header></Header>
      {Object.entries(CAROUSEL_CATEGORIES).map(([key, { title, type }]) => (
        <Carousel text={title} type={type} />
      ))}
    </div>
  );
}

export default App;
