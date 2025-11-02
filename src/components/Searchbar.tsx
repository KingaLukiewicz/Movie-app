import { useState, useEffect } from 'react';
import { TMDB_TYPE, TMDB_ID_URL, API_TOKEN } from '../constants';
import axios from 'axios';
import './Searchbar.css';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Result } from '../types';

export const mapResults = (item: any): Result => ({
  id: item.id,
  name: item.name || item.title,
  path: item.poster_path || item.profile_path,
  type: item.media_type
});

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setResults] = useState<Result[]>([]);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      navigate(`/results/${query}`);
    }
  };

  const handleClick = (result: Result) => {
    navigate(`/${result.type}/${result.id}`);
  };

  return (
    <>
      <div className="Searchbar">
        <FiSearch className="Icon" />
        <input
          type="search"
          placeholder="Search movies, TV shows or people..."
          aria-label="Search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {query && (
        <div className="Results">
          {searchResults.map((result) => (
            <p
              key={result.id}
              onClick={() => handleClick(result)}
            >{`${result.name} (${result.type})`}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default Searchbar;
