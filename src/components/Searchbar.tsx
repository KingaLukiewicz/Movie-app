import { useState, useEffect } from 'react';
import { TMDB_TYPE, TMDB_ID_URL, API_TOKEN } from '../constants';
import axios from 'axios';
import './Searchbar.css';
import { FiSearch } from 'react-icons/fi';

type Result = {
  id: number;
  name: string;
  path: string;
  type: TMDB_TYPE;
};

const mapResults = (item: any): Result => ({
  id: item.id,
  name: item.name,
  path: item.poster_path || item.profile_path,
  type: item.media_type
});

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setResults] = useState<Result[]>([]);

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

  return (
    <div className="Searchbar">
      <FiSearch className="Icon" />
      <input
        type="search"
        placeholder="Search movies, TV shows or people..."
        aria-label="Search"
        value={query}
        onChange={handleChange}
      />
      <p>{query}</p>
      {searchResults.map((result) => (
        <p key={result.id}>{`${result.name} (${result.type})`}</p>
      ))}
    </div>
  );
};

export default Searchbar;
