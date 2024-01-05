import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMatches } from "../../services/http";
import MatchItem from "./MatchItem";
import ErrorBlock from "../UI/ErrorBlock";

const MatchesSection = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["matches", { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchMatches({ signal, ...queryKey[1] }),
  });
  let content;

  if (isPending) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "There was some problem"}
      />
    );
  }
  console.log(data);
  if (!data?.length) {
    content = <p>No matches found</p>;
  }
  if (data) {
    content = (
      <ul className="matches-list">
        {data.map((match) => (
          <li key={match.id}>
            <MatchItem match={match} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <section className="content-section" id="new-ev-section">
      <header>
        <h2>Recently added matches</h2>
      </header>
      {content}
    </section>
  );
};

export default MatchesSection;
