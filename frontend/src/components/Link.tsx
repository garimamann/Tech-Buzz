import React from "react";
import { AUTH_TOKEN } from "../constants";
import delIcon from "../images/delete-icon.png";
import editIcon from "../images/edit-icons.png";
import { useMutation, gql } from "@apollo/client";
import { Link as L } from "react-router-dom";
import { FEED_QUERY } from "./LinkList";
import { USER_LINK_QUERY } from "./UserProfile";

const DELETE_POST_MUTATION = gql`
  mutation DeletePost($linkid: ID!) {
    deletePost(linkid: $linkid) {
      id
    }
  }
`;

interface linkType {
  id: string | number | null | undefined;
  createdAt: String;
  url: String;
  description: String;
}

interface LinkProp {
  link: linkType;
  key: string | number | null | undefined;
  index: number;
  isUser: boolean;
}

const Link = (LinkProp: LinkProp) => {
  const link: linkType = LinkProp.link;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  console.log(link.id);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      linkid: link.id,
    },
    refetchQueries: [{ query: FEED_QUERY }, { query: USER_LINK_QUERY }],
  });

  return (
    <div className="flex justify-between mb2">
      <div className="flex items-center">
        <span className="gray">{LinkProp.index + 1}</span>
        {authToken && (
          <div
            className="ml1 gray f11 pointer"

            // onClick={vote}
          >
            ▲
          </div>
        )}
        <div className="ml1">
          <div>
            {link.description} ({link.url})
          </div>
        </div>
      </div>
      {LinkProp.isUser && (
        <div>
          <img
            src={delIcon}
            alt="delete"
            onClick={async () => {
              try {
                await deletePost();
              } catch (e) {
                console.log(e.message);
              }
            }}
            className="pointer mr2"
          />
          <L
            to={{ pathname: `/update`, state: { link } }}
            className="ml1 no-underline black"
          >
            <img
              src={editIcon}
              alt="edit"
              onClick={() => {}}
              className="pointer "
            />
          </L>
        </div>
      )}
    </div>
  );
};

export default Link;
