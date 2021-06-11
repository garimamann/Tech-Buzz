import React from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "./Link";

export const USER_LINK_QUERY = gql`
  {
    userFeed {
      id
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
  votes: any;
  postedBy: any;
}

const UserProfile = () => {
  const { data } = useQuery(USER_LINK_QUERY);
  console.log(data);

  return (
    <div>
      {data && (
        <>
          {data.userFeed.map((link: Link, i: number) => (
            <Link key={link.id} link={link} index={i} isUser={true} />
          ))}
        </>
      )}
    </div>
  );
};

export default UserProfile;
