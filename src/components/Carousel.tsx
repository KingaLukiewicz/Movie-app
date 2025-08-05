import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { SLIDER_SETTINGS, TMDB_IMAGE_BASE_URL, API_TOKEN } from './constants';
import './Carousel.css';
import CarouselItem from './CarouselItem';

type Item = {
  id: number;
  name: string;
  path: string;
};

type Person = {
  id: number;
  name: string;
  path: string;
};

type Props = {
  text: string;
  type: string;
};

const mapItem = (item: any): Item => ({
  id: item.id,
  name: item.title,
  path: item.poster_path
});

const mapPerson = (item: any): Person => ({
  id: item.id,
  name: item.name,
  path: item.profile_path
});

const Carousel: React.FC<Props> = ({ text, type }) => {
  const [popular, setPopular] = useState<Item[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json'
            }
          }
        );
        if (type == 'person') {
          const people = response.data.results.map(mapPerson);
          setPeople(people);
        } else {
          const movies = response.data.results.map(mapItem);
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
          {type === 'person'
            ? people.map((item) => (
                <CarouselItem id={item.id} name={item.name} path={item.path} />
              ))
            : popular.map((item) => (
                <CarouselItem id={item.id} name={item.name} path={item.path} />
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
