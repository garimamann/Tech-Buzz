import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";
import { FEED_QUERY } from "./LinkList";
import { USER_LINK_QUERY } from "./UserProfile";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

interface Link {
  id: string | number | null | undefined;
  createdAt: String;
  url: String;
  description: String;
}

interface FeedType {
  feed: Link[];
}

const CreateLink = (props: any) => {
  const [formState, setFormState] = useState({ description: "", url: "" });

  const history = useHistory();
  const [cerateLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    refetchQueries: [{ query: FEED_QUERY }, { query: USER_LINK_QUERY }],
    // update: (cache, { data }) => {
    //   const feedQuery = cache.readQuery<FeedType>({ query: FEED_QUERY });
    //   console.log(feedQuery);
    //   console.log(data);

    //   cache.writeQuery<FeedType>({
    //     query:FEED_QUERY,
    //     data:{
    //       feed.links:[...feedQuery!.feed.links,data!.post]
    //     }
    //   })
    // },
    onCompleted: () => {
      history.push("/");
    },
  });

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();
          await cerateLink();
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
            placeholder="A description for the link"
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
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export { CreateLink };
