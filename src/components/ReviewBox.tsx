import { Review } from '../types';
import Avatar from '@mui/material/Avatar';
import { Rating, Tooltip } from '@mui/material';
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
        <Tooltip
          placement="top"
          title={`${(review.rating / 2).toFixed(1)} / 5`}
        >
          <span>
            <Rating
              name="read-only"
              value={review.rating / 2}
              precision={0.5}
              readOnly
            />
          </span>
        </Tooltip>
      </div>
      <div className="Content">
        <p>{review.content}</p>
      </div>
    </div>
  );
};
export default ReviewBox;
