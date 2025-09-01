import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import {
  SLIDER_SETTINGS,
  API_TOKEN,
  TMDB_ID_URL,
  TMDB_TYPE
} from './constants';
import './Carousel.css';
import CarouselItem from './CarouselItem';

type Item = {
  id: number;
  name: string;
  path: string;
};

type Props = {
  text: string;
  type: TMDB_TYPE;
};

const mapMovie = (item: any): Item => ({
  id: item.id,
  name: item.title,
  path: item.poster_path
});

const mapTV = (item: any): Item => ({
  id: item.id,
  name: item.name,
  path: item.poster_path
});

const mapPerson = (item: any): Item => ({
  id: item.id,
  name: item.name,
  path: item.profile_path
});

const Carousel: React.FC<Props> = ({ text, type }) => {
  const [popular, setPopular] = useState<Item[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get(
          `${TMDB_ID_URL}trending/${type}/day?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json'
            }
          }
        );
        if (type == 'person') {
          const people = response.data.results.map(mapPerson);
          setPopular(people);
        } else if (type == 'tv') {
          const tvShows = response.data.results.map(mapTV);
          setPopular(tvShows);
        } else {
          const movies = response.data.results.map(mapMovie);
          setPopular(movies);
        }
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="Carousel">
      <div className="Card">{text}</div>
      <div className="Slider">
        <Slider {...SLIDER_SETTINGS}>
          {popular.map((item) => (
            <CarouselItem
              id={item.id}
              name={item.name}
              path={item.path}
              type={type}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
