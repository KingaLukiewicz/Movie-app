import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  API_TOKEN,
  TMDB_IMAGE_BASE_URL,
  TMDB_ID_URL,
  TMDB_TYPE
} from '../constants';
import './CarouselItem.css';
import { Item } from './Carousel';
import { useNavigate } from 'react-router-dom';

type Props = {
  item: Item;
  type: TMDB_TYPE;
};

const CarouselItem: React.FC<Props> = ({ item, type }) => {
  const [overview, setOverview] = useState<string>('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${item.id}`);
  };

  useEffect(() => {
    if (type != TMDB_TYPE.PERSON) {
      const fetchOverview = async () => {
        try {
          const response = await axios.get(
            `${TMDB_ID_URL}${type}/${item.id}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                accept: 'application/json'
              }
            }
          );
          setOverview(response.data.overview || 'No overview available.');
        } catch (error) {
          console.error('Failed to fetch', error);
        }
      };
      fetchOverview();
    }
  }, []);

  return (
    <div
      className="Container"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="CarouselItem">
        <div className="Front">
          <img
            src={`${TMDB_IMAGE_BASE_URL}${item.path}`}
            alt={`${item.name} ${type === TMDB_TYPE.MOVIE ? 'movie poster' : type === TMDB_TYPE.TV ? 'TV show poster' : 'profile photo'}`}
          />
        </div>
        <div className="Back">
          {type == TMDB_TYPE.PERSON ? (
            <>
              <p className="Name">{item.name}</p>
              {item.character && <p>as {item.character}</p>}
            </>
          ) : (
            <p>{overview}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default CarouselItem;
