import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import QuickView from './components/QuickView.js';
import Carousel from './components/Carousel';

function App() {

  return (
    <div className="App">
      <Header></Header>
      <Carousel text='MOVIES' type='movie' />
      <QuickView text='TV SHOWS' />
      <QuickView text='PEOPLE' />
    </div>
  );
}

export default App;
