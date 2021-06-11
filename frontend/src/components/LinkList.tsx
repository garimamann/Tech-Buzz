import React,{useEffect} from "react";
import Link from "./Link";
import { useQuery, gql } from "@apollo/client";


export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

interface Link {
  id: string | number | null | undefined;
  createdAt: String;
  url: String;
  description: String;
}



const LinkList = () => {
  const { data } = useQuery(FEED_QUERY,{errorPolicy:"all"}); 

  return (
    <div>
      {data  && (
        <>
          {data.feed.links.map((link: Link,i:number) => (
            <Link key={link.id} link={link} index={i} isUser={false}/>
          ))}
        </>
      )}
      
    </div>
  );
};

export default LinkList;
