import React from 'react';
import { TMDB_IMAGE_BASE_URL } from '../constants';
import { Tooltip, Rating } from '@mui/material';
import './MainInfo.css';
import { Details } from '../pages/MoviePage';

type Props = {
  details: Details;
  type: string;
};

const MainInfo: React.FC<Props> = ({ details, type }) => {
  return (
    <div className="MainInfo">
      <img
        src={`${TMDB_IMAGE_BASE_URL}${details.poster_path}`}
        alt={`${name} photo`}
      />
      <div className="RightInfo">
        <h3>{`${details.tagline}`}</h3>
        <p>{`TITLE: ${details.title}`}</p>
        <p>{`RELEASE DATE: ${details.release_date}`}</p>
        <p>{`RUNTIME: ${Math.floor(details.runtime / 60)}h ${details.runtime % 60}min`}</p>
        <p>{`GENRES: ${details.genres.map((g) => g.name).join(', ')}`}</p>
        <div className="Rating">
          {details.vote_average && details.vote_count && (
            <>
              <div className="StarRating">
                <p>{`RATING: `}</p>
                <Tooltip
                  placement="top"
                  title={`${(details.vote_average / 2).toFixed(1)} / 5`}
                >
                  <span>
                    <Rating
                      name="read-only"
                      value={details.vote_average / 2}
                      precision={0.1}
                      readOnly
                    />
                  </span>
                </Tooltip>
              </div>
              <p>{`${details.vote_count} votes`}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MainInfo;
