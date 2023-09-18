"use client";

import Masonry from "react-masonry-css";

import { useQuery } from "@apollo/client";

import { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { useDispatch, useSelector } from "react-redux";

import Post from "@/components/Post/Post";
import { GET_POSTS } from "@/graphql/query/posts";
import { GetPostsQuery, GetPostsQueryVariables, PostResponse } from "@/@types/graphql";
import { addPosts, postsComment } from "@/redux/slices/postsSlice";
import { AppDispatch } from "@/redux/store";

const Home = () => {
  const [pageCount, setPageCount] = useState(1);
  const { posts } = useSelector(postsComment);
  const dispatch = useDispatch<AppDispatch>();

  const { refetch } = useQuery<GetPostsQuery, GetPostsQueryVariables>(GET_POSTS, {
    variables: {
      page: pageCount,
    },
    onCompleted: (e) => {
      dispatch(addPosts(e.posts));
    },
  });

  const addMorePosts = () => {
    setPageCount((prev) => prev + 1);
    refetch({ page: pageCount });
  };

  if (!posts.length) return;

  return (
    <div>
      <InfiniteScroll
        loader={<div>Loading...</div>}
        dataLength={posts.length}
        next={addMorePosts}
        hasMore={true}
      >
        <Masonry
          breakpointCols={{ default: 2 }} // Number of columns at different breakpoints
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {posts &&
            posts.map((item: PostResponse) => (
              <div key={item.id} className="rounded-[20px] p-5 bg-white mb-6">
                <Post {...item} />
              </div>
            ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
