import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Header from './components/Header';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movie_id" element={<MoviePage />} />
        <Route path="/results/:query" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
