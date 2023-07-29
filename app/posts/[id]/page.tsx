'use client'

import PostComment from "@/components/Comment/PostComment";
import { useGetPostQuery } from "@/redux/api/postsApi";
import Like from "@/ui/Like";
import OurInput from "@/ui/OurInput";
import UserBage from "@/ui/UserBage";
import { useParams } from "next/navigation";
import { useState } from "react";
import {AnimatePresence, motion as m} from "framer-motion";

const page = () => {

  const [fullComments, setFullComments] = useState(false)

  const toggleFullComments = () => setFullComments(prev => !prev)

  const params = useParams()


  const {data, isLoading} = useGetPostQuery(`${params.id}`)

  if(data) {
    console.log(data.post, params.id)
  }
  if(isLoading) {
    return 'Zagruzka...'
  }

  console.log(data)

  const commentsCount = fullComments ? -1 : 2

  return (
    <div className={`bg-white rounded-[20px] flex flex-col p-5 ${fullComments ? '' : 'max-h-[94vh]'} relative`}>
      <div className="max-h-[480px] min-h-[300px] rounded-[15px] overflow-hidden flex items-center">
        <img className="object-fill object-center" src={data?.post.mediaUrl} alt="" />
      </div>
      <div className="flex my-4">
        <UserBage {...data?.post.user!}/>
        <div className="flex gap-2 items-center mr-5"><span>{data?.post.totalComments}</span><img src="/Comment.svg" alt="Comment" /></div>
        <Like count={data?.post.totalLikes}/>
      </div>
      <div className="h-[1px] bg-[#f0f0f0] mb-4"></div>
      {
        data?.post?.comments?.slice(0, commentsCount).map((comment, index) => {
          return <PostComment key={comment.id} user={comment.user} content={comment.content}/>
        })
      }
      <div className="h-[165px] bg-gradient-to-b from-transparent to-white absolute bottom-[76px] left-0 right-0 z-10 flex justify-center items-end pb-4"><button onClick={toggleFullComments} className="bg-white text-blueText font-semibold py-2 px-4 border border-blueText rounded-full">Show more</button></div>
      <OurInput placeholder="Write your comment..."/>
    </div>
  )
}

export default page