import './MoviePage.css';
import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { TMDB_TYPE, TMDB_ID_URL } from '../constants';

function MoviePage() {
  const { movie_id } = useParams<{ movie_id: string }>();
  return (
    <div className="MoviePage">
      <div className="Details">
        <h2>Details</h2>
      </div>
      <div className="Actors">
        <h2>Actors</h2> {/*carousel*/}
      </div>
      <div className="Reviews">
        <h2>Reviews</h2>
      </div>
      <div className="Recomendations">
        <h2>Recomendations</h2>
        <Carousel
          text=""
          type={TMDB_TYPE.MOVIE}
          endpoint={`${TMDB_ID_URL}/movie/${movie_id}/recommendations?language=en-US&page=1`}
        />
      </div>
    </div>
  );
}

export default MoviePage;
