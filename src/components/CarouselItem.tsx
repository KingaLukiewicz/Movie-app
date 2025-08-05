import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_TOKEN, TMDB_IMAGE_BASE_URL } from './constants';
import './CarouselItem.css';
import Button from '@mui/material/Button';

type Props = {
  id: number;
  name: string;
  path: string;
  type: string;
};

const CarouselItem: React.FC<Props> = ({ id, name, path, type }) => {
  const [overview, setOverview] = useState<string>('');

  useEffect(() => {
    if (type != 'person') {
      const fetchOverview = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
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
    <div className="Container">
      <div className="CarouselItem">
        <div className="Front">
          <img src={`${TMDB_IMAGE_BASE_URL}${path}`} alt={name} />
        </div>
        <div className="Back">
          {type == 'person' ? <p>{name}</p> : <p>{overview}</p>}
        </div>
      </div>
    </div>
  );
};
export default CarouselItem;
