import './MoviePage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { TMDB_TYPE, TMDB_ID_URL, API_TOKEN } from '../constants';
import Slider from 'react-slick';
import axios from 'axios';
import { REVIEW_SLIDER } from '../constants';
import ReviewBox from '../components/ReviewBox';

export type Review = {
  id: string;
  author: string;
  rating: number;
  content: string;
  avatar_path?: string;
};

const mapReview = (item: any): Review => ({
  id: item.id,
  author: item.author,
  rating: item.author_details.rating,
  content: item.content,
  avatar_path: item.author_details.avatar_path
});

function MoviePage() {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = `${TMDB_ID_URL}/movie/${movie_id}/reviews?language=en-US`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json'
          }
        });
        setReviews(response.data.results.map((i: any) => mapReview(i)));
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="MoviePage">
      <div className="Details">
        <h2>Details</h2>
      </div>
      <div className="Credits">
        <h2>Cast</h2>
        <Carousel
          text=""
          type={TMDB_TYPE.PERSON}
          endpoint={`${TMDB_ID_URL}/movie/${movie_id}/credits?language=en-US`}
        />
      </div>
      <div className="Reviews">
        <h2>Reviews</h2>
        <div className="ReviewSlider">
          <Slider {...REVIEW_SLIDER}>
            {reviews.map((review) => (
              <ReviewBox key={review.id} review={review} />
            ))}
          </Slider>
        </div>
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
