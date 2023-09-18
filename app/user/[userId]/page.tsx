"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import React from "react";

import { QueryUserArgs, User } from "@/@types/graphql";
import Post from "@/components/Post/Post";
import { GET_USER } from "@/graphql/query/users";

const UserPage = () => {
  const params = useParams();
  const { data } = useQuery<{ user: User }, QueryUserArgs>(GET_USER, {
    variables: {
      username: params.userId.replaceAll("%20", " "),
    },
  });

  return (
    <div>
      <div className="flex bg-white rounded-[20px] p-8">
        <div className="min-w-[140px] h-[140px] overflow-hidden rounded-full mr-6">
          <img
            className="h-full w-full object-cover"
            src={data?.user?.avatar}
            alt="userAvatar"
          />
        </div>
        <div className="border border-border rounded-[15px] px-5 py-4">
          <h3>{data?.user?.username}</h3>
          <span>#guitar #jazz #modern</span>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis sed, nostrum
            tempore ullam recusandae illum numquam repudiandae in est soluta vero aliquid.
            Accusamus, qui a?
          </p>
          <span>Instagram</span>
        </div>
      </div>
      <div className=" mt-6">
        {data?.user?.posts?.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-[20px] mb-6">
            <Post {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
