'use client'

import { useMutation, useQuery } from '@apollo/client'

import { useSelector } from 'react-redux'

import { useCallback, useEffect } from 'react'

import {
  MutationDeletePostArgs,
  PostDeleteResponse,
  QueryUserArgs,
  User,
} from '@/@types/graphql'
import Loader from '@/components/Loader/Loader'
import Post from '@/components/Post/Post'
import { DELETE_POST } from '@/graphql/mutation/deleteMyPost'
import { GET_USER } from '@/graphql/query/users'
import { selectAuth } from '@/redux/slices/authSlice'
import OurButton from '@/ui/OurButton'

import useUploadImage from '../../hooks/useUploadImage'
import UpdateProfile from '@/components/UpdateProfile/UpdateProfile'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const { user } = useSelector(selectAuth)
  const {
    handleAvatar,
    inputRef,
    pickFile,
    loading: postUploadLoading,
  } = useUploadImage('post')
  const navigate = useRouter()

  const { data, loading, refetch } = useQuery<{ user: User }, QueryUserArgs>(GET_USER, {
    variables: {
      username: user?.username,
    },
  })

  useEffect(() => {
    refetch()
  }, [postUploadLoading])

  console.log('🚀 ~ file: page.tsx:45 ~ Profile ~ data:', data?.user?.posts)

  if (loading) <Loader />

  const [deletePost] = useMutation<PostDeleteResponse, MutationDeletePostArgs>(
    DELETE_POST,
    {
      refetchQueries: [
        {
          query: GET_USER,
          variables: {
            username: user?.username,
          },
        },
      ],
    }
  )

  const deleteMyPost = useCallback((postId: string) => {
    deletePost({
      variables: {
        postId: postId,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="bg-white rounded-[20px] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-mainText">Profile</h3>
          <button className="bg-grad text-white py-2 px-3 flex items-center gap-2 rounded-[10px] cursor-pointer">
            <img src="./Arrow.svg" alt="Back" /> Back
          </button>
        </div>
        <UpdateProfile />
      </div>
      <div className="bg-white p-5 rounded-[20px] my-6">
        <div
          onClick={() => pickFile()}
          className="border-[2px] border-blueText rounded-[15px]"
        >
          <OurButton
            variant="secondary"
            name={postUploadLoading ? 'Loading...' : '+ Add new post'}
          />
        </div>
      </div>
      {data?.user?.posts.length ? (
        data?.user?.posts?.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-[20px] mb-6">
            <Post key={post.id} {...post} deletePost={deleteMyPost} />
          </div>
        ))
      ) : (
        <h3 className="opacity-10 text-3xl text-center m-auto max-w-[400px] mt-[20vh]">
          Этот пользователь еще не добавлял ниодного поста
        </h3>
      )}
      <input
        ref={inputRef}
        onChange={(e) => handleAvatar(e)}
        className="hidden"
        type="file"
      />
    </div>
  )
}

export default Profile
