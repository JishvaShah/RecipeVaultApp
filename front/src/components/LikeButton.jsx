import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./LikeButton.css";

const LikeButton = ({ isLiked, onToggleLike }) => {
  return (
    <button onClick={onToggleLike} >
      {isLiked ? <FaHeart style={{ color:"#f34242"}} /> : <FaRegHeart />}
    </button>
  );
  
};

export default LikeButton;