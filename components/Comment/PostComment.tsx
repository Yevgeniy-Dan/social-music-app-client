import { Comment } from "@/@types/types"
import UserBage from "@/ui/UserBage"
import { FC } from "react"


type TPostComment = Pick<Comment, 'user' | 'content'>

const PostComment: FC<TPostComment> = ({ user, content }) => {
  return (
    <>
      <div>
        <div className="flex">
          <UserBage {...user} />
          <div className="flex gap-2 items-center"><span>121</span><img src="/Heart.svg" alt="Heart" /></div>
        </div>
        <p className="my-3 ml-2">{content}</p>
      </div>
    </>
  )
}

export default PostComment