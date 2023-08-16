"use client";

import Masonry from "react-masonry-css";

import { useQuery } from "@apollo/client";

import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import Post from "@/components/Post/Post";
import { GET_POSTS } from "@/graphql/query/posts";
import {
  GetPostsQuery,
  GetPostsQueryVariables,
  Post as TPost,
  PostResponse,
} from "@/@types/graphql";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const { data, loading, refetch } = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >(GET_POSTS, {
    variables: {
      page: pageCount,
    },
  });

  useEffect(() => {
    if (data) setPosts((prev) => prev.concat(data.posts));
  }, [loading]);

  const addMorePosts = () => {
    setPageCount((prev) => prev + 1);
    refetch({ page: pageCount });

    console.log("🚀 ~ file: page.tsx:31 ~ addMorePosts ~ end");
  };

  if (!posts.length) return;

  console.log(data, posts);

  return (
    <div>
      <InfiniteScroll
        loader={<div>Loading...</div>}
        dataLength={posts.length}
        next={addMorePosts}
        hasMore={true}>
        <Masonry
          breakpointCols={{ default: 2 }} // Number of columns at different breakpoints
          className="masonry-grid"
          columnClassName="masonry-grid-column">
          {posts &&
            posts.map((item: PostResponse) => (
              <Post key={item.id} props={item} />
            ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
