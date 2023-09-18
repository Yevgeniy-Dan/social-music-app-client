import { Like, MutationCreateLikeArgs, MutationRemoveLikeArgs } from '@/@types/graphql'
import { CREATE_LIKE } from '@/graphql/mutation/createLike'
import { REMOVE_LIKE } from '@/graphql/mutation/removeLike'
import { GET_POST_ISLIKE } from '@/graphql/query/posts'
import { useMutation, useQuery } from '@apollo/client'
import { FC } from 'react'

type TLike = {
  postId: string
}

const OurLike: FC<TLike> = ({ postId }) => {
  const { data, loading: likeLoading } = useQuery(GET_POST_ISLIKE, {
    variables: {
      id: postId,
    },
  })

  if (likeLoading) {
    ;<div>Gruzim</div>
  }

  const [addLike] = useMutation<Like, MutationCreateLikeArgs>(CREATE_LIKE, {
    refetchQueries: [
      {
        query: GET_POST_ISLIKE,
        variables: {
          id: postId,
        },
      },
    ],
    awaitRefetchQueries: true,
    variables: {
      postId: postId,
    },
  })

  const [removeLike] = useMutation<Like, MutationRemoveLikeArgs>(REMOVE_LIKE, {
    refetchQueries: [
      {
        query: GET_POST_ISLIKE,
        variables: {
          id: postId,
        },
      },
    ],
    awaitRefetchQueries: true,
    variables: {
      postId: postId,
    },
  })

  return (
    <div className="flex gap-2 items-center">
      <span>{data?.post.totalLikes}</span>
      {data?.post.isLiked ? (
        <img
          onClick={() => {
            removeLike()
          }}
          src="/HeartFill.svg"
          alt="HeartFill"
        />
      ) : (
        <img
          onClick={() => {
            addLike()
          }}
          src="/Heart.svg"
          alt="Heart"
        />
      )}
    </div>
  )
}

export default OurLike
