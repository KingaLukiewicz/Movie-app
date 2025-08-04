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

export const TMDB_IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w500`;

export const API_TOKEN = process.env.REACT_APP_TMDB_TOKEN;
