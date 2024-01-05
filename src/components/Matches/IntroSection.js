import React from "react";
import { Link } from "react-router-dom";

const IntroSection = () => {
  return (
    <div>
      <p>
        <Link to="/matches/new">Create a new match</Link>
      </p>
    </div>
  );
};

export default IntroSection;
