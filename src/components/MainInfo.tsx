import React from 'react';
import { TMDB_IMAGE_BASE_URL } from '../constants';
import { Tooltip, Rating } from '@mui/material';
import './MainInfo.css';

type Props = {
  name: string;
  description: string;
  path: string;
  type: string;
  vote_avg?: number;
  vote_count?: number;
};

const MainInfo: React.FC<Props> = ({
  name,
  description,
  path,
  type,
  vote_avg,
  vote_count
}) => {
  return (
    <div className="MainInfo">
      <img src={`${TMDB_IMAGE_BASE_URL}${path}`} alt={`${name} photo`} />
      <div className="RightInfo">
        {type == 'person' ? (
          <>
            <p>{`NAME: ${name}`}</p>
            <p>{`BIOGRAPHY: ${description}`}</p>
          </>
        ) : (
          <>
            <p>{`TITLE: ${name}`}</p>
            <p>{`OVERVIEW: ${description}`}</p>
            <div className="Rating">
              {vote_avg && vote_count && (
                <>
                  <div className="StarRating">
                    <p>{`RATING: `}</p>
                    <Tooltip
                      placement="top"
                      title={`${(vote_avg / 2).toFixed(1)} / 5`}
                    >
                      <span>
                        <Rating
                          name="read-only"
                          value={vote_avg / 2}
                          precision={0.1}
                          readOnly
                        />
                      </span>
                    </Tooltip>
                  </div>
                  <p>{`${vote_count} votes`}</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default MainInfo;
