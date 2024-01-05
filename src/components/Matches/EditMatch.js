import React from "react";
import {
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
  Link,
  redirect,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../services/http";
import MatchForm from "./MatchForm";
import ErrorBlock from "../UI/ErrorBlock";
import { fetchMatch, updateMatch } from "../../services/http";
import Modal from "../UI/Modal";

const EditMatch = () => {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const params = useParams();
  const submit = useSubmit();

  const { data, isError, error } = useQuery({
    queryKey: ["matches", params.id],
    queryFn: ({ signal }) => fetchMatch({ signal, id: params.id }),
    staleTime: 10000,
  });

  function handleSubmit(formData) {
    // mutate({ id: params.id, match: formData })
    // navigate("../")
    console.log(formData);
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Error fetching match"
          message={error.info?.message || "There was some problem"}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <MatchForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <span>Sending data </span>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </MatchForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
};

export default EditMatch;

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["matches", params.id],
    queryFn: ({ signal }) => fetchMatch({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  console.log(formData);
  const updatedMatchData = Object.fromEntries(formData);
  console.log(updatedMatchData);
  await updateMatch({ id: params.id, match: updatedMatchData });
  await queryClient.invalidateQueries(["matches"]);
  return redirect("../");
}
