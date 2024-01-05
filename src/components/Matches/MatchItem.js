import React from "react";
import { Link } from "react-router-dom";

const MatchItem = ({ match }) => {
  const formattedDate = new Date(match.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <article className="match-item">
      <img src={`http://localhost:4000/${match.image}`} alt={match.title} />
      <div className="match-item-content">
        <div>
          <h2>{match.title}</h2>
          <p className="match-item-date">{formattedDate}</p>
          <p className="match-item-location">{match.location}</p>
        </div>
        <p>
          <Link to={`/matches/${match.id}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
};

export default MatchItem;
