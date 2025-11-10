import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import TvPage from './pages/TvPage';
import Header from './components/Header';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movie_id" element={<MoviePage />} />
        <Route path="/tv/:series_id" element={<TvPage />} />
        {/* <Route path="/person/:person_id" element={<PersonPage />} /> */}
        <Route path="/results/:query" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
