import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { SLIDER_SETTINGS, TMDB_IMAGE_BASE_URL, API_TOKEN } from './constants';
import './Carousel.css';

type Item = {
  id: number;
  title: string;
  posterPath: string;
};

type Person = {
  id: number;
  name: string;
  profilePath: string;
};

type Props = {
  text: string;
  type: string;
};

const mapItem = (item: any): Item => ({
  id: item.id,
  title: item.title,
  posterPath: item.poster_path
});

const mapPerson = (item: any): Person => ({
  id: item.id,
  name: item.name,
  profilePath: item.profile_path
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
                <div key={item.id} className="CarouselItem">
                  <img
                    src={`${TMDB_IMAGE_BASE_URL}${item.profilePath}`}
                    alt={item.name}
                  />
                </div>
              ))
            : popular.map((item) => (
                <div key={item.id} className="CarouselItem">
                  <img
                    src={`${TMDB_IMAGE_BASE_URL}${item.posterPath}`}
                    alt={item.title}
                  />
                </div>
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
