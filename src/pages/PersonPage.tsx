import './PersonPage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { TMDB_TYPE, TMDB_ID_URL, API_TOKEN } from '../constants';
import axios from 'axios';
import MainInfo from '../components/MainInfo';
import { Details } from '../types';

const mapDetails = (item: any): Details => ({
  id: item.id,
  name: item.name,
  type: item.media_type,
  overview: item.biography,
  path: item.profile_path,
  department: item.known_for_department,
  birthday: item.birthday,
  deathday: item.deathday,
  place_of_birth: item.place_of_birth
});

function PersonPage() {
  const { person_id } = useParams<{ person_id: string }>();
  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `${TMDB_ID_URL}/person/${person_id}?language=en-US`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json'
          }
        });
        setDetails(mapDetails(response.data));
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchDetails();
  }, [person_id]);

  return (
    <div className="PersonPage">
      {details && (
        <MainInfo details={details}>
          <MainInfo.Overview />
        </MainInfo>
      )}

      <div className="Details">
        <h2>Details</h2>
        <div className="DetailsContainer">
          {details && (
            <>
              <p>{`NAME: ${details.name}`}</p>
              <p>{`KNOWN FOR DEPARTMENT: ${details.department}`}</p>
              <p>{`PLACE OF BIRTH: ${details.place_of_birth}`}</p>
              <p>{`BIRTHDAY: ${details.birthday}`}</p>
              {details.deathday && <p>{`DEATHDAY: ${details.deathday}`}</p>}
            </>
          )}
        </div>
      </div>
      <div className="Credits">
        <h2>Movies</h2>
        <Carousel
          text=""
          type={TMDB_TYPE.MOVIE}
          endpoint={`${TMDB_ID_URL}/person/${person_id}/movie_credits?language=en-US`}
        />
        <h2>TV shows</h2>
        <Carousel
          text=""
          type={TMDB_TYPE.TV}
          endpoint={`${TMDB_ID_URL}/person/${person_id}/tv_credits?language=en-US`}
        />
      </div>
    </div>
  );
}

export default PersonPage;
