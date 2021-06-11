import React, { useEffect } from "react";
import User from "./User";
import { useQuery, gql } from "@apollo/client";

export const USER_LIST_QUERY = gql`
  {
    userList {
      id
      name
      email
      role
    }
  }
`;

interface UserType {
  id: string | number | null | undefined;
  name: String;
  email: String;
  role: String;
}

const LinkList = () => {
  const { data } = useQuery(USER_LIST_QUERY, { errorPolicy: "all" });
  console.log(data);

  return (
    <div>
      {data && (
        <>
          {data.userList.map((user: UserType, i: number) => (
            <User key={user.id} user={user} index={i} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
