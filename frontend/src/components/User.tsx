import React from "react";
import { AUTH_TOKEN } from "../constants";
import delIcon from "../images/delete-icon.png";
import editIcon from "../images/edit-icons.png";
import { useMutation, gql } from "@apollo/client";
import { Link as L } from "react-router-dom";

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      id
    }
  }
`;

interface User {
  id: string | number | null | undefined;
  name: String;
  email: String;
  role: String;
}

interface UserProp {
  user: User;
  key: string | number | null | undefined;
  index: number;
}

const User = (UserProp: UserProp) => {
  const user: User = UserProp.user;
  const [deletePost] = useMutation(DELETE_USER_MUTATION, {
    variables: {
      userId: user.id,
    },
  });

  return (
    <div className="flex justify-between mb2">
      <div className="flex items-center">
        {" "}
        <span className="gray">{UserProp.index + 1}</span>
        <div className="ml1">
          <div>
            {user.id}|{user.name}|{user.email}
          </div>
        </div>
      </div>

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
        {/* <L  to={{ pathname:`/update`, state:{user}}}      

            className="ml1 no-underline black">
          <img
            src={editIcon}
            alt="edit"
            onClick={() => {}}
            className="pointer "
          />
          </L> */}
      </div>
    </div>
  );
};

export default User;
