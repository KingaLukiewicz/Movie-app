import { Review } from '../pages/MoviePage';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import './ReviewBox.css';

type Props = {
  review: Review;
};

const ReviewBox: React.FC<Props> = ({ review }) => {
  return (
    <div className="ReviewBox">
      <div className="Author">
        <Avatar alt={review.author} src={review.avatar_path} />
        <p>{review.author}</p>
        <Rating
          name="read-only"
          value={review.rating / 2}
          precision={0.5}
          readOnly
        />
      </div>
      <div className="Content">
        <p>{review.content}</p>
      </div>
    </div>
  );
};
export default ReviewBox;
