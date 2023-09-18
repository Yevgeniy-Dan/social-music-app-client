import { User, UserResponse } from '@/@types/graphql'
import Link from 'next/link'
import { FC } from 'react'

type TUserBageSmall = Partial<User> | Partial<UserResponse>

const userBageSmall: FC<TUserBageSmall> = ({
  avatar,
  username,
  // musicGenres,
  id,
}) => {
  return (
    <div className="flex items-center mr-auto">
      <Link href={`user/${username}`}>
          {avatar ? (
            <div className="flex items-center justify-center overflow-hidden rounded-full w-14 h-14">
              <img className="object-cover h-full" src={avatar} alt="" />
            </div>
          ) : (
            <div className="px-4 text-3xl text-blueText">
              {username ? username[0].toUpperCase() : null}
            </div>
          )}
      </Link>
      <div className="flex flex-col gap-1 ml-4">
        <span className="font-semibold">{username}</span>
        <span className="text-secondText">#guitar #jazz #modern</span>
      </div>
    </div>
  )
}

export default userBageSmall
