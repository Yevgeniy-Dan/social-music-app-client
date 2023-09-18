"use client";
import { useMutation, useQuery } from "@apollo/client";

import { useParams, useRouter } from "next/navigation";

import { FormEventHandler, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import PostComment from "@/components/Comment/PostComment";
import OurLike from "@/ui/OurLike";
import OurInput from "@/ui/OurInput";
import UserBage from "@/ui/UserBage";

import { GET_POST } from "@/graphql/query/posts";
import { CREATE_COMMENT } from "@/graphql/mutation/createComment";
import { Comment, CommentResponse, MutationCreateCommentArgs } from "@/@types/graphql";
import {
  toggleShowAllComments,
  selectComment,
  clearReply,
} from "@/redux/slices/commentSlice";

import { AppDispatch } from "@/redux/store";

export interface TRecursionComment extends Partial<Comment> {
  children?: TRecursionComment[]
}

const PostPage = () => {
  const [newComment, setNewComment] = useState("");
  const { replyId, replyUser, showAllComments } = useSelector(selectComment);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const navigate = useRouter();

  useEffect(() => {
    return () => {
      dispatch(clearReply());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading } = useQuery(GET_POST, {
    variables: { id: params.id },
  });

  const [addComment] = useMutation<CommentResponse, MutationCreateCommentArgs>(
    CREATE_COMMENT,
    {
      refetchQueries: [
        {
          query: GET_POST,
          variables: { id: params.id },
        },
      ],
    }
  );

  let com1: TRecursionComment[] = [];

  if (data?.post.comments) {
    const recursion = (parentId: null | string): any => {
      return data?.post.comments
        .filter((c) => c.parentId === parentId)
        .map((c) => ({ ...c, children: recursion(c.id) }));
    };
    com1 = recursion(null);
  }

  const addNewComment: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addComment({
      variables: {
        createCommentInput: {
          content: newComment,
          postId: params.id,
          parentId: replyId,
        },
      },
    });
    setNewComment("");
    dispatch(clearReply());
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[20px] flex flex-col p-5 min-h-[94vh]">
        <div className="min-h-[480px] bg-gray-100 rounded-[15px]"></div>
        <div className="my-4 flex items-center">
          <div className="w-14 h-14 rounded-full bg-gray-100"></div>
          <div className="flex-col ml-4 ">
            <div className="w-[100px] h-4 bg-gray-100 mb-2 rounded-[8px]"></div>
            <div className="w-[50px] h-4 bg-gray-100 rounded-[8px]"></div>
          </div>
          <div className="w-10 h-10 bg-gray-100 ml-auto rounded-[8px]"></div>
          <div className="w-10 h-10 bg-gray-100 ml-4 rounded-[8px]"></div>
        </div>
        <div className="h-[1px] bg-[#f0f0f0]"></div>
        <div className="my-4 flex items-center">
          <div className="w-14 h-14 rounded-full bg-gray-100"></div>
          <div className="flex-col ml-4 ">
            <div className="w-[100px] h-4 bg-gray-100 mb-2 rounded-[8px]"></div>
            <div className="w-[50px] h-4 bg-gray-100 rounded-[8px]"></div>
          </div>
          <div className="w-10 h-10 bg-gray-100 ml-auto rounded-[8px]"></div>
          <div className="w-10 h-10 bg-gray-100 ml-4 rounded-[8px]"></div>
        </div>
        <div className="h-12 bg-gray-100 rounded-[8px]"></div>
        <div className="my-4 flex items-center">
          <div className="w-14 h-14 rounded-full bg-gray-100"></div>
          <div className="flex-col ml-4 ">
            <div className="w-[100px] h-4 bg-gray-100 mb-2 rounded-[8px]"></div>
            <div className="w-[50px] h-4 bg-gray-100 rounded-[8px]"></div>
          </div>
          <div className="w-10 h-10 bg-gray-100 ml-auto rounded-[8px]"></div>
          <div className="w-10 h-10 bg-gray-100 ml-4 rounded-[8px]"></div>
        </div>
        <div className="h-12 bg-gray-100 rounded-[8px]"></div>
      </div>
    );
  }

  const commentsCount = showAllComments ? data?.post.comments.length : 2;

  return (
    <div
      className={`bg-white rounded-[20px] flex flex-col p-5 ${
        showAllComments ? "" : "max-h-[94vh]"
      } relative`}
    >
      <div className="max-h-[480px] min-h-[300px] rounded-[15px] overflow-hidden flex items-center">
        <img
          className="w-full h-full object-fill object-center"
          src={data?.post.mediaUrl}
          alt=""
        />
      </div>
      <div className="flex my-4">
        <UserBage {...data?.post.user!} />
        <div className="flex gap-2 items-center mr-5">
          <span>{data?.post.totalComments}</span>
          <img src="/Comment.svg" alt="Comment" />
        </div>
        <OurLike postId={params.id} />
      </div>
      <div className="h-[1px] bg-[#f0f0f0] mb-4"></div>
      <div className="overflow-hidden">
        {com1 &&
          com1.slice(0, commentsCount).map((comment) => {
            return (
              <PostComment
                key={comment.id}
                user={comment.user}
                id={comment.id}
                content={comment.content}
                // eslint-disable-next-line
                children={comment.children}
              />
            );
          })}
      </div>
      {showAllComments ? (
        <div className="absolute bottom-[56px] left-0 right-0 z-10 flex justify-center items-end">
          <button
            onClick={() => dispatch(toggleShowAllComments())}
            className="text-blueText bg-white font-semibold py-2 px-4 underline"
          >
            Hide more
          </button>
        </div>
      ) : data?.post?.comments.length > 2 ? (
        <div className="h-[165px] bg-gradient-to-b from-transparent to-white absolute bottom-[75px] left-0 right-0 z-10 flex justify-center items-end pb-4">
          <button
            onClick={() => dispatch(toggleShowAllComments())}
            className="bg-white text-blueText font-semibold py-2 px-4 border border-blueText rounded-full"
          >
            Show more
          </button>
        </div>
      ) : null}
      <form className="relative" onSubmit={(e) => addNewComment(e)}>
        <OurInput
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          submitIcon={"../Send.svg"}
        />
        {replyUser && (
          <span className="absolute inline-block bottom-[-10px] px-2 bg-white left-5 text-blueText">
            {`@${replyUser}, `}
            <span
              onClick={() => dispatch(clearReply())}
              className="px-2 border border-blueText rounded-full"
            >
              x
            </span>
          </span>
        )}
      </form>
      <button
        onClick={() => navigate.back()}
        className="bg-grad text-white py-2 px-3 absolute right-10 top-10 rounded-[10px]"
      >
        Back
      </button>
    </div>
  );
};

export default PostPage;
