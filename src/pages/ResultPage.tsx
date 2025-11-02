import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TMDB_ID_URL, API_TOKEN } from '../constants';
import { Details } from '../types';
import MainInfo from '../components/MainInfo';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';

const mapResults = (item: any): Details => ({
  id: item.id,
  name: item.name || item.title,
  type: item.media_type,
  overview: item.overview,
  path: item.poster_path || item.profile_path,
  vote_average: item.vote_average,
  vote_count: item.vote_count
});

function ResultPage() {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<Details[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      try {
        const url = `${TMDB_ID_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json'
          }
        });
        setResults(response.data.results.map((i: any) => mapResults(i)));
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchResults();
  }, [query]);

  const handleClick = (result: Details) => {
    navigate(`/${result.type}/${result.id}`);
  };

  return (
    <div className="ResultPage">
      {results.map((result) =>
        result.type === 'person' ? (
          <MainInfo
            onClick={() => handleClick(result)}
            details={result}
          ></MainInfo>
        ) : (
          <MainInfo onClick={() => handleClick(result)} details={result}>
            <MainInfo.Overview />
            <MainInfo.Rating />
          </MainInfo>
        )
      )}
    </div>
  );
}

export default ResultPage;
