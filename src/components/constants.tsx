export const API_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

export const TMDB_IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w500`;
export const TMDB_ID_URL = 'https://api.themoviedb.org/3/';

export const SLIDER_SETTINGS = {
  dots: true,
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

export const CAROUSEL_CATEGORIES = {
  MOVIES: { title: 'MOVIES', type: 'movie' },
  TV_SHOWS: { title: 'TV SHOWS', type: 'tv' },
  PEOPLE: { title: 'PEOPLE', type: 'person' }
};
