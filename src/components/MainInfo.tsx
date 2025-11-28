import React, { PropsWithChildren, createContext, useContext } from 'react';
import { TMDB_IMAGE_BASE_URL } from '../constants';
import { Tooltip, Rating } from '@mui/material';
import './MainInfo.css';
import { Details } from '../types';

type MainInfoContext = {
  details: Details;
};

const MainInfoContext = createContext<MainInfoContext | undefined>(undefined);

function useMainInfoContext() {
  const context = useContext(MainInfoContext);
  if (!context) {
    throw new Error('use MainInfoContext must be within MainInfo');
  }
  return context;
}

type Props = PropsWithChildren & {
  details: Details;
  onClick?: () => void;
};

type MainInfoComponent = React.FC<Props> & {
  Overview: React.FC;
  Rating: React.FC;
  Department: React.FC;
  KnownFor: React.FC;
};

const MainInfo: MainInfoComponent = ({ children, details, onClick }) => {
  return (
    <MainInfoContext.Provider value={{ details }}>
      <div className="MainInfo" onClick={onClick}>
        <img
          src={`${TMDB_IMAGE_BASE_URL}${details.path}`}
          alt={`${details.name} photo`}
        />
        <div className="RightInfo">
          {details.tagline ? (
            <h3>{`${details.tagline}`}</h3>
          ) : (
            <h3>{`${details.name}`}</h3>
          )}
          {children}
        </div>
      </div>
    </MainInfoContext.Provider>
  );
};

MainInfo.Overview = function MainInfoName() {
  const { details } = useMainInfoContext();
  return <p>{`OVERVIEW: ${details.overview}`}</p>;
};

MainInfo.Rating = function MainInfoRating() {
  const { details } = useMainInfoContext();
  return (
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
  );
};

MainInfo.Department = function MainInfoDepartment() {
  const { details } = useMainInfoContext();
  return <p>{`KNOWN FOR DEPARTMENT: ${details.department}`}</p>;
};

MainInfo.KnownFor = function MainInfoKnownFor() {
  const { details } = useMainInfoContext();
  return (
    <>
      {details.known_for && (
        <p>{`KNOWN FOR: ${details.known_for.map((i) => i).join(', ')}`}</p>
      )}
    </>
  );
};

export default MainInfo;
