import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, outOf = 10 }) => {
  const totalStars = 5;
  const stars = (rating / outOf) * totalStars;

  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
      {Array(fullStars).fill(0).map((_, i) => <FaStar key={`full-${i}`} color="#FFD700" />)}
      {halfStar && <FaStarHalfAlt color="#FFD700" />}
      {Array(emptyStars).fill(0).map((_, i) => <FaRegStar key={`empty-${i}`} color="#FFD700" />)}
      <span style={{ marginLeft: "8px" }}>{rating}/10</span>
    </div>
  );
};

