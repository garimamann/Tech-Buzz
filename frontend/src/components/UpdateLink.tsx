import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";

const UPDATE_LINK_MUTATION = gql`
  mutation UpdatePostMutation(
    $linkId: ID!
    $description: String!
    $url: String!
  ) {
    updatePost(linkId: $linkId, description: $description, url: $url) {
      id
      url
      description
    }
  }
`;

interface Link {
  id: string | number | null | undefined;
  createdAt: String;
  url: string;
  description: string;
}

interface LinkProp {
  history: Object;
  location: any;
  match: Object;
}

interface location {
  state: object;
}

const UpdateLink = (linkProp: LinkProp) => {
  const link: Link = linkProp.location.state.link;
  const [formState, setFormState] = useState({
    description: link.description,
    url: link.url,
  });
  console.log(link);

  const history = useHistory();
  const [cerateLink] = useMutation(UPDATE_LINK_MUTATION, {
    variables: {
      linkId: link.id,
      description: formState.description,
      url: formState.url,
    },
    onCompleted: () => {
      history.push("/");
    },
  });

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();
          try {
            await cerateLink();
          } catch (e) {
            console.log(e.message);
          }
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={e => {
              setFormState({
                ...formState,
                description: e.target.value,
              });
            }}
            type="text"
            placeholder={formState.description}
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={e => {
              setFormState({
                ...formState,
                url: e.target.value,
              });
            }}
            type="text"
            placeholder={formState.url}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateLink;
