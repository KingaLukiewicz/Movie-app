import { TMDB_IMAGE_BASE_URL } from './constants';

type Props = {
  id: number;
  name: string;
  path: string;
};

const CarouselItem: React.FC<Props> = ({ id, name, path }) => {
  return (
    <div key={id} className="CarouselItem">
      <img src={`${TMDB_IMAGE_BASE_URL}${path}`} alt={name} />
    </div>
  );
};
export default CarouselItem;
