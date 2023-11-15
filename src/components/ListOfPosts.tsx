import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostType } from "../types/post";

const Title = styled.h1`
font-weight: 200;
color: antiquewhite;
font-size: 50px;
`;

const List = styled.ul`
display: flex;
flex-direction: column;
align-items: flex-start;
margin-bottom: 100px;
`;

const ListItem = styled.li`
:hover {
  text-decoration: underline;
}
.list-item {
  color: #e5eaf5;
}
`;

const fetchPosts = async (): Promise<PostType[]> => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
      throw new Error(`Failed to fetch post (status ${res.status})`);
    }
    return res.json()
  } catch(e) {
    console.error(e)
    throw new Error ('something went wrong') 
  }
};
const PAGE_SIZE = 10;

export default function ListOfPosts() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  })

  const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
  const lastPageIndex = firstPageIndex + PAGE_SIZE
  const currentPostsData =  data?.slice(firstPageIndex, lastPageIndex)

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message
  
  return (
    <>
      <Title>Posts</Title>
      <List>
        {currentPostsData?.map((post) => (
          <ListItem key={post.id}>
            <Link className="list-item" to={`/post/${post.id}`}>
              {post.title}
            </Link>
          </ListItem>
        ))}
      </List>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PAGE_SIZE}
        onPageChange={(page) => {
          if (typeof page === "number") setCurrentPage(page);
        }}
      />
    </>
  );
}
