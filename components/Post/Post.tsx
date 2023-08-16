"use client";

import Link from "next/link";

import { PostResponse } from "@/@types/graphql";
import OurLike from "@/ui/OurLike";

const Post = ({ props }: { props: PostResponse }) => {
  const genre: string[] = props.user.musicGenres
    ? JSON.parse(props.user.musicGenres)
    : "";

  return (
    <div className="rounded-[20px] p-5 bg-white h-auto grid-item">
      <Link href={`/posts/${props.id}`}>
        <div className="rounded-[15px] overflow-hidden mb-4">
          <img
            className="w-full object-cover max-h-[360px]"
            src={props.mediaUrl}
            alt="ava"
          />
        </div>
      </Link>
      <div className="flex">
        <div className="w-11 h-11 overflow-hidden rounded-full mr-4">
          <img
            className="h-full object-cover"
            src={props?.user?.avatar!}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1 mr-auto">
          <span>{props?.user?.username}</span>
          <span className="text-secondText text-xs">
            {genre &&
              genre.map((item, index) => (
                <span key={index} className="mr-1">
                  {item}
                </span>
              ))}
          </span>
        </div>
        <div className="flex gap-2 items-center mr-5">
          <span>{props.totalComments}</span>
          <img src="./Comment.svg" alt="Comment" />
        </div>
        <OurLike postId={props.id} />
      </div>
    </div>
  );
};

export default Post;
