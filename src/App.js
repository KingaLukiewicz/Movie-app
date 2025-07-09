import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import QuickView from './components/QuickView.js';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <QuickView text='MOVIES' />
      <QuickView text='TV SHOWS' />
      <QuickView text='PEOPLE' />
    </div>
  );
}

export default App;
