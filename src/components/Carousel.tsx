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

export type Item = {
  id: number;
  name: string;
  path: string;
};

type Props = {
  text: string;
  type: TMDB_TYPE;
};

const FIELD_MAP: Record<TMDB_TYPE, { name: string; path: string }> = {
  [TMDB_TYPE.MOVIE]: { name: 'title', path: 'poster_path' },
  [TMDB_TYPE.TV]: { name: 'name', path: 'poster_path' },
  [TMDB_TYPE.PERSON]: { name: 'name', path: 'profile_path' }
};

const mapItem = (type: TMDB_TYPE, item: any): Item => ({
  id: item.id,
  name: item[FIELD_MAP[type].name],
  path: item[FIELD_MAP[type].path]
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
        setPopular(response.data.results.map((i: any) => mapItem(type, i)));
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
            <CarouselItem key={item.id} item={item} type={type} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
