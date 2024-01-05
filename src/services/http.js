import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
const baseUrl = "http://localhost:4000";

export async function fetchMatches({ signal, searchQuery, max }) {
  let url = `${baseUrl}/matches`;
  if (searchQuery && max) {
    url += `?search=${encodeURIComponent(searchQuery)}&max=${max}`;
  } else if (searchQuery) {
    url += "?search=" + searchQuery;
  } else if (max) {
    url += "?max=" + max;
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the matches");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { matches } = await response.json();

  return matches;
}

export async function createNewMatch(matchData) {
  const response = await fetch(`${baseUrl}/matches`, {
    method: "POST",
    body: JSON.stringify(matchData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the match");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { match } = await response.json();

  return match;
}

export async function fetchImages({ signal }) {
  const response = await fetch(`${baseUrl}/matches/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();
  return images;
}

export async function fetchMatch({ id, signal }) {
  console.log("id", id);
  const response = await fetch(`${baseUrl}/matches/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the match");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { match } = await response.json();

  return match;
}

export async function deleteMatch({ id }) {
  console.log(id);
  const response = await fetch(`${baseUrl}/matches/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the match");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateMatch({ id, match }) {
  const response = await fetch(`${baseUrl}/matches/${id}`, {
    method: "PUT",
    body: JSON.stringify({ match }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating the match");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
