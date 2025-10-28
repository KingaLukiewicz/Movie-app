import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Result, mapResults } from '../components/Searchbar';
import axios from 'axios';
import { TMDB_TYPE, TMDB_ID_URL, API_TOKEN } from '../constants';
import { Details } from './MoviePage';
import MainInfo from '../components/MainInfo';
import './ResultPage.css';

function ResultPage() {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<Details[]>([]);

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
        setResults(response.data.results);
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="ResultPage">
      {results.map((result) => (
        <MainInfo details={result} type={result.media_type} />
      ))}
    </div>
  );
}

export default ResultPage;
