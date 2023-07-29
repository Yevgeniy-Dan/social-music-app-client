"use client";

import Masonry from "react-masonry-css";

import Post from "@/components/Post/Post";
import { useGetPostsQuery } from "@/redux/api/postsApi";


const Home = () => {
  const {data, isLoading} = useGetPostsQuery(1);
  if(!data) {
    return null;
  }
  console.log(data.posts);

  return (
    <div>
      <Masonry
        breakpointCols={{ default: 2 }} // Number of columns at different breakpoints
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {data && data.posts.map((item) => (
            <Post key={item.id} props={item}/>
        ))}
      </Masonry>
    </div>
  );
};

export default Home;
