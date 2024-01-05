import React from "react";
import { Outlet } from "react-router-dom";
import IntroSection from "./IntroSection";
import MatchesSection from "./MatchesSection";

const Matches = () => {
  return (
    <>
      <Outlet />
      Matches listing
      <main>
        <IntroSection />
        <MatchesSection />
      </main>
    </>
  );
};

export default Matches;
