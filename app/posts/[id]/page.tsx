'use client'
import { useMutation, useQuery } from '@apollo/client'

import { useParams, useRouter } from 'next/navigation'

import { FormEventHandler, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import PostComment from '@/components/Comment/PostComment'
import OurLike from '@/ui/OurLike'
import OurInput from '@/ui/OurInput'
import UserBage from '@/ui/UserBage'

import { GET_POST } from '@/graphql/query/posts'
import { CREATE_COMMENT } from '@/graphql/mutation/createComment'
import { Comment, CommentResponse, MutationCreateCommentArgs } from '@/@types/graphql'
import {
  toggleShowAllComments,
  selectComment,
  clearReply,
} from '@/redux/slices/commentSlice'

import { AppDispatch } from '@/redux/store'
import PostPageSkeleton from '@/components/Skeletons/PostPageSkeleton'
import Image from 'next/image'

export interface TRecursionComment extends Partial<Comment> {
  children?: TRecursionComment[]
}

const PostPage = () => {
  const [newComment, setNewComment] = useState('')
  const { replyId, replyUser, showAllComments } = useSelector(selectComment)
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const navigate = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log(inputRef)
    return () => {
      dispatch(clearReply())
      dispatch(toggleShowAllComments(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data, loading } = useQuery(GET_POST, {
    variables: { id: params.id },
  })

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
  )

  let recursionComment: TRecursionComment[] = []

  if (data?.post.comments) {
    const recursion = (parentId: null | string): any => {
      return data?.post.comments
        .filter((c) => c.parentId === parentId)
        .map((c) => ({ ...c, children: recursion(c.id) }))
    }
    recursionComment = recursion(null)
  }

  const addNewComment: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    addComment({
      variables: {
        createCommentInput: {
          content: newComment,
          postId: params.id,
          parentId: replyId,
        },
      },
    })
    setNewComment('')
    dispatch(clearReply())
  }

  const handleReply = () => {
    console.log(inputRef.current)
  }

  if (loading) {
    return <PostPageSkeleton />
  }

  return (
    <div
      className={`bg-white rounded-[20px] flex flex-col p-5 ${
        showAllComments ? '' : 'h-[94vh]'
      } relative`}
    >
      <div className="max-h-[480px] min-h-[300px] rounded-[15px] overflow-hidden">
        <Image src={data?.post?.mediaUrl} height={480} width={900} alt="Post image" />
      </div>
      <div className="flex my-4">
        <UserBage {...data?.post.user!} />
        <div className="flex gap-2 items-center mr-5 ml-auto">
          <span>{data?.post.totalComments}</span>
          <img src="/Comment.svg" alt="Comment" />
        </div>
        <OurLike postId={params.id} />
      </div>
      <div className="h-[1px] bg-[#f0f0f0] mb-4"></div>
      <div
        className={`overflow-hidden ${
          showAllComments ? 'flex-shrink-0' : 'flex-shrink-1'
        } mb-auto`}
      >
        {recursionComment &&
          recursionComment.map((comment) => {
            return (
              <PostComment
                key={comment.id}
                user={comment.user}
                id={comment.id}
                content={comment.content}
                // eslint-disable-next-line
                children={comment.children}
                inputRef={inputRef}
              />
            )
          })}
      </div>
      {showAllComments ? (
        <div className="absolute bottom-[56px] left-0 right-0 z-10 flex justify-center items-end">
          <button
            onClick={() => dispatch(toggleShowAllComments(false))}
            className="text-blueText bg-white font-semibold py-2 px-4 underline"
          >
            Hide more
          </button>
        </div>
      ) : data?.post?.comments.length > 2 ? (
        <div className="h-[165px] bg-gradient-to-b from-transparent to-white absolute bottom-[75px] left-0 right-0 z-10 flex justify-center items-end pb-4">
          <button
            onClick={() => dispatch(toggleShowAllComments(true))}
            className="bg-white text-blueText font-semibold py-2 px-4 border border-blueText rounded-full"
          >
            Show more
          </button>
        </div>
      ) : null}
      <form className="relative h-min" onSubmit={(e) => addNewComment(e)}>
        <OurInput
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          submitIcon={'../Send.svg'}
          // ref={inputRef}
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
  )
}

export default PostPage
