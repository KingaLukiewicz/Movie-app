import React from 'react';
import { TMDB_IMAGE_BASE_URL } from '../constants';
import { Tooltip, Rating } from '@mui/material';
import './MainInfo.css';
import { Details } from '../pages/MoviePage';

type Props = {
  details: Details;
  onClick?: () => void;
};

const MainInfo: React.FC<Props> = ({ details, onClick }) => {
  return (
    <div className="MainInfo" onClick={onClick}>
      <img
        src={`${TMDB_IMAGE_BASE_URL}${details.path}`}
        alt={`${name} photo`}
      />
      <div className="RightInfo">
        {details.tagline ? (
          <h3>{`${details.tagline}`}</h3>
        ) : (
          <h3>{`${details.name}`}</h3>
        )}
        <p>{`OVERVIEW: ${details.overview}`}</p>
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
