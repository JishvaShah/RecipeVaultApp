import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./LikeButton.css";
import PropTypes from "prop-types";

const LikeButton = ({ isLiked, onToggleLike }) => {
  return (
    <button onClick={onToggleLike}>
      {isLiked ? <FaHeart style={{ color: "#f34242" }} /> : <FaRegHeart />}
    </button>
  );
};

LikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onToggleLike: PropTypes.func.isRequired,
};

export default LikeButton;
