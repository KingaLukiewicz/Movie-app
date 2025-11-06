import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import {
  SLIDER_SETTINGS,
  API_TOKEN,
  TMDB_ID_URL,
  TMDB_TYPE
} from '../constants';
import './Carousel.css';
import CarouselItem from './CarouselItem';

export type Item = {
  id: number;
  name: string;
  path: string;
  character?: string;
};

type Props = {
  text: string;
  type: TMDB_TYPE;
  endpoint?: string;
};

const FIELD_MAP: Record<
  TMDB_TYPE,
  { name: string; path: string; character?: string }
> = {
  [TMDB_TYPE.MOVIE]: { name: 'title', path: 'poster_path' },
  [TMDB_TYPE.TV]: { name: 'name', path: 'poster_path' },
  [TMDB_TYPE.PERSON]: {
    name: 'name',
    path: 'profile_path'
  }
};

const mapItem = (type: TMDB_TYPE, item: any): Item => ({
  id: item.id,
  name: item[FIELD_MAP[type].name],
  path: item[FIELD_MAP[type].path],
  character: item.character
});

const Carousel: React.FC<Props> = ({ text, type, endpoint }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const url =
          endpoint ?? `${TMDB_ID_URL}trending/${type}/day?language=en-US`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json'
          }
        });
        if (response.data.cast) {
          setItems(response.data.cast.map((i: any) => mapItem(type, i)));
        } else {
          setItems(response.data.results.map((i: any) => mapItem(type, i)));
        }
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchItems();
  }, [type, endpoint]);

  return (
    <div className="Carousel">
      <div className="Card">{text}</div>
      <div className="Slider">
        {items ? (
          <Slider {...SLIDER_SETTINGS}>
            {items.map((item) => (
              <CarouselItem key={item.id} item={item} type={type} />
            ))}
          </Slider>
        ) : (
          <p>No elements found.</p>
        )}
      </div>
    </div>
  );
};

export default Carousel;
