import React, { useState } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deleteMatch, fetchMatch } from "../../services/http";
import { queryClient } from "../../services/http";
import Modal from "../UI/Modal";
import ErrorBlock from "../UI/ErrorBlock";

const MatchDetails = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["matches", params.id],
    queryFn: ({ signal }) => fetchMatch({ signal, id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeletion,
    error: errorDeletion,
  } = useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matches"],
        refetchType: "none",
      });
      navigate("/matches");
    },
  });

  const handleDelete = () => {
    mutate({ id });
  };

  let content;

  const handleStartDelete = () => setConfirmDelete(true);
  const handleCancelDelete = () => setConfirmDelete(false);

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="match-details-content">
          <img src={`http://localhost:4000/${data.image}`} alt={data.title} />
          <div id="match-details-info">
            <div>
              <p id="match-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="match-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {confirmDelete && (
        <Modal onClose={handleCancelDelete}>
          <h3>Are you sure</h3>
          <p>
            Do you really want to delete this match.This action cannot be
            undone!
          </p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deletion im progress, please wait!</p>}
            {!isPendingDeletion && (
              <>
                <button className="button" onClick={handleDelete}>
                  Delete
                </button>
                <button className="button-text" onClick={handleCancelDelete}>
                  Cancel
                </button>
              </>
            )}
          </div>
          {isErrorDeletion && (
            <ErrorBlock
              title="Failed to delete"
              message={error.info?.message || "There was some problem"}
            />
          )}
        </Modal>
      )}

      <Outlet />
      <article id="match-details">{content}</article>
    </>
  );
};

export default MatchDetails;
