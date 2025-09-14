export const API_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const TMDB_ID_URL = 'https://api.themoviedb.org/3/';

export const SLIDER_SETTINGS = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    }
  ]
};

export const REVIEW_SLIDER = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

export enum TMDB_TYPE {
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person'
}

export const CAROUSEL_CATEGORIES = {
  MOVIES: { title: 'MOVIES', type: TMDB_TYPE.MOVIE },
  TV_SHOWS: { title: 'TV SHOWS', type: TMDB_TYPE.TV },
  PEOPLE: { title: 'PEOPLE', type: TMDB_TYPE.PERSON }
};
