import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import MatchForm from "./MatchForm";
import { queryClient, createNewMatch } from "../../services/http";

const NewMatch = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      navigate("/matches");
    },
  });

  const handleSubmit = (formData) => {
    console.log(formData);
    mutate({ match: formData });
  };

  return (
    <Modal onClose={() => navigate("../")}>
      <MatchForm onSubmit={handleSubmit}>
        <>
          <Link to="../">Cancel</Link>
          <button type="submit">Create</button>
        </>
      </MatchForm>
    </Modal>
  );
};

export default NewMatch;
