import './TvPage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { TMDB_TYPE, TMDB_ID_URL, API_TOKEN } from '../constants';
import Slider from 'react-slick';
import axios from 'axios';
import { REVIEW_SLIDER } from '../constants';
import ReviewBox from '../components/ReviewBox';
import MainInfo from '../components/MainInfo';
import { Review, Details } from '../types';

const mapDetails = (item: any): Details => ({
  id: item.id,
  name: item.name,
  type: item.media_type,
  overview: item.overview,
  path: item.poster_path,
  vote_average: item.vote_average,
  vote_count: item.vote_count,
  first_air_date: item.first_air_date,
  seasons: item.number_of_seasons,
  episodes: item.number_of_episodes,
  genres: item.genres
});

const mapReview = (item: any): Review => ({
  id: item.id,
  author: item.author,
  rating: item.author_details.rating,
  content: item.content,
  avatar_path: item.author_details.avatar_path
});

function TvPage() {
  const { series_id } = useParams<{ series_id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = `${TMDB_ID_URL}/tv/${series_id}/reviews?language=en-US`;
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
  }, [series_id]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `${TMDB_ID_URL}/tv/${series_id}?language=en-US`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json'
          }
        });
        setDetails(mapDetails(response.data));
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchDetails();
  }, [series_id]);

  return (
    <div className="TvPage">
      {details && (
        <MainInfo details={details}>
          <MainInfo.Overview />
          <MainInfo.Rating />
        </MainInfo>
      )}

      <div className="Details">
        <h2>Details</h2>
        <div className="DetailsContainer">
          {details && (
            <>
              <p>{`TITLE: ${details.name}`}</p>
              <p>{`FIRST AIR DATE: ${details.first_air_date}`}</p>
              <p>{`NUMBER OF SEASONS: ${details.seasons}`}</p>
              <p>{`NUMBER OF EPISODES: ${details.episodes}`}</p>
              {details.genres && (
                <p>{`GENRES: ${details.genres.map((g) => g.name).join(', ')}`}</p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="Credits">
        <h2>Cast</h2>
        <Carousel
          text=""
          type={TMDB_TYPE.PERSON}
          endpoint={`${TMDB_ID_URL}/tv/${series_id}/credits?language=en-US`}
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
          endpoint={`${TMDB_ID_URL}/tv/${series_id}/recommendations?language=en-US&page=1`}
        />
      </div>
    </div>
  );
}

export default TvPage;
