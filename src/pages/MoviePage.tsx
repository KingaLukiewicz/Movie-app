import './MoviePage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { TMDB_TYPE, TMDB_ID_URL, API_TOKEN } from '../constants';
import Slider from 'react-slick';
import axios from 'axios';
import { REVIEW_SLIDER } from '../constants';
import ReviewBox from '../components/ReviewBox';
import MainInfo from '../components/MainInfo';

export type Review = {
  id: string;
  author: string;
  rating: number;
  content: string;
  avatar_path?: string;
};

type Genre = {
  id: string;
  name: string;
};

export type Details = {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
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
  const [details, setDetails] = useState<Details | null>(null);

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
  }, [movie_id]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `${TMDB_ID_URL}/movie/${movie_id}?language=en-US`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json'
          }
        });
        setDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchDetails();
  }, [movie_id]);

  return (
    <div className="MoviePage">
      {details && <MainInfo details={details} type={TMDB_TYPE.MOVIE} />}

      <div className="Details">
        <h2>Details</h2>
        <div className="DetailsContainer">
          {details && (
            <>
              <p>{`TITLE: ${details.title}`}</p>
              <p>{`RELEASE DATE: ${details.release_date}`}</p>
              <p>{`RUNTIME: ${Math.floor(details.runtime / 60)}h ${details.runtime % 60}min`}</p>
              <p>{`GENRES: ${details.genres.map((g) => g.name).join(', ')}`}</p>
            </>
          )}
        </div>
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
          {reviews ? (
            <Slider {...REVIEW_SLIDER}>
              {reviews.map((review) => (
                <ReviewBox key={review.id} review={review} />
              ))}
            </Slider>
          ) : (
            <p>No reviews found.</p>
          )}
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
