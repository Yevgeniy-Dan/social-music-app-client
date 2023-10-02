import { User, UserResponse } from '@/@types/graphql'
import Image from 'next/image'
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
    <div className="flex items-center">
      <Link href={`user/${username}`}>
        {avatar ? (
          <div className="flex items-center justify-center overflow-hidden rounded-full w-14 h-14">
            <Image
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
              src={avatar}
              width={100}
              height={100}
              alt="User Bage Avatar"
            />
          </div>
        ) : (
          <div className="px-4 text-3xl text-blueText">
            {username ? username[0].toUpperCase() : null}
          </div>
        )}
      </Link>
      <div className="flex flex-col gap-1 ml-4 overflow-hidden text-ellipsis">
        <Link href={`user/${username}`}>
          <span className="font-semibold">{username}</span>
        </Link>
        <span className="text-secondText">#guitar #jazz #modern</span>
      </div>
    </div>
  )
}

export default userBageSmall
