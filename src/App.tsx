import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movie_id" element={<MoviePage />} />
      </Routes>
    </>
  );
}

export default App;
