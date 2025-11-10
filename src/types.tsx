import { TMDB_TYPE } from './constants';

export type Review = {
  id: string;
  author: string;
  rating: number;
  content: string;
  avatar_path?: string;
};

export type Genre = {
  id: string;
  name: string;
};

export type Details = {
  id: string;
  name: string;
  type: TMDB_TYPE;
  tagline?: string;
  overview?: string;
  path: string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  runtime?: number;
  genres?: Genre[];
  department?: string;
  known_for?: String[];
  first_air_date?: string;
  seasons?: number;
  episodes?: number;
};

export type Item = {
  id: number;
  name: string;
  path: string;
  character?: string;
};

export type Result = {
  id: number;
  name: string;
  path: string;
  type: TMDB_TYPE;
};
