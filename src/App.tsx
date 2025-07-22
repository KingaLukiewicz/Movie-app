// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './components/Header';
import Carousel from './components/Carousel';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Carousel text="MOVIES" type="movie" />
      <Carousel text="TV SHOWS" type="tv" />
      <Carousel text="PEOPLE" type="person" />
    </div>
  );
}

export default App;
