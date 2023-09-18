"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { memo } from "react";

import { PostResponse } from "@/@types/graphql";
import OurLike from "@/ui/OurLike";
import UserBage from "@/ui/UserBage";

// eslint-disable-next-line no-unused-vars
const Post = (props: PostResponse & { deletePost?: (postId: string) => void }) => {
  const pathname = usePathname();

  if (!props) return;

  return (
    <div className="h-auto grid-item">
      <Link href={`/posts/${props.id}`}>
        <div className="rounded-[15px] overflow-hidden mb-4">
          {props.mediaUrl ? (
            <img
              className="w-full object-cover max-h-[360px] min-h-[300px]"
              src={props.mediaUrl}
              alt="ava"
            />
          ) : (
            <div className="w-full h-[360px] bg-gray-300 object-cover"></div>
          )}
        </div>
      </Link>
      <div className="flex">
        <div className="mr-auto">
          <UserBage {...props.user} />
        </div>
        {pathname === "/profile" ? (
          <>
            <div className="flex items-center justify-center mr-7">
              <img src="/Edit.svg" alt="" />
            </div>
            <div
              onClick={() => props.deletePost(props.id)}
              className="flex items-center justify-center mr-7"
            >
              <img src="/Delete.svg" alt="" />
            </div>
          </>
        ) : null}

        <div className="flex gap-2 items-center mr-5">
          <span>{props.totalComments}</span>
          <img src="/Comment.svg" alt="Comment" />
        </div>
        <OurLike postId={props.id} />
      </div>
    </div>
  );
};

export default memo(Post);
