import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import './Carousel.css';

type Item = {
  id: number;
  title: string;
  poster_path: string;
};

type Person = {
  id: number;
  name: string;
  profile_path: string;
};

type Props = {
  text: string;
  type: string;
};

const Carousel: React.FC<Props> = ({ text, type }) => {
  const API_TOKEN = process.env.REACT_APP_TMDB_TOKEN;
  const [popular, setPopular] = useState<Item[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

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
          setPeople(response.data.results);
        } else {
          setPopular(response.data.results);
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
        <Slider {...settings}>
          {type === 'person'
            ? people.map((item) => (
                <div key={item.id} className="CarouselItem">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    alt={item.name}
                  />
                </div>
              ))
            : popular.map((item) => (
                <div key={item.id} className="CarouselItem">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
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
