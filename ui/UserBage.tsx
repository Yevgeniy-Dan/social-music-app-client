import { User } from "@/@types/types"
import { FC } from "react"

type TUserBageSmall = Pick<User, 'avatar' | 'username' | 'musicGenres' | 'id'>

const userBageSmall:FC<TUserBageSmall>= ({avatar, username, musicGenres, id}) => {
  return (
    <div className="flex mr-auto">
      <div className="w-14 h-14 overflow-hidden rounded-full mr-4"><img className="h-full object-cover" src={avatar ? avatar : ''} alt="" /></div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{username}</span>
        <span className="text-secondText">#guitar #jazz #modern</span>
      </div>
    </div>
  )
}

export default userBageSmall