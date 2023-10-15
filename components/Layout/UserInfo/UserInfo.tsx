import { useSelector } from 'react-redux'

import { selectAuth } from '@/redux/slices/authSlice'
import useUploadImage from '@/hooks/useUploadImage'

import NoAuthUserInfo from './NotAuthUserInfo'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const hesh = ['#guitar', '#jazz', '#modern']

const UserInfo = () => {
  const { user } = useSelector(selectAuth)
  const { handleAvatar, inputRef, pickFile } = useUploadImage('avatar')
  const navigate = useRouter()

  return (
    <div className="user-bage flex flex-col items-center p-5 lg:hidden bg-bage-image">
      {user ? (
        <>
          <div className="relative mt-3 mb-6 overflow-hidden">
            <div className="h-[140px] w-[140px] overflow-hidden rounded-full">
              <Image
                src={user?.avatar}
                alt="ava"
                width={140}
                height={140}
                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
              />
            </div>
            <div
              onClick={() => pickFile()}
              className="flex items-center justify-center absolute rounded-full w-10 h-10 text-2xl text-white bg-blueText right-0 bottom-0 cursor-pointer"
            >
              +
            </div>
            <input
              ref={inputRef}
              onChange={(e) => handleAvatar(e)}
              className="hidden"
              type="file"
            />
          </div>
          <div className="border border-border rounded-[15px] p-3 flex flex-col items-center w-full bg-white">
            <h3 className="text-hero text-mainText py-1 font-semibold">
              {user?.username}
            </h3>
            <div className="pb-3">
              {hesh.map((item, index) => (
                <span key={index} className="text-secondText">
                  {item}
                </span>
              ))}
            </div>
            <p className="pb-2 text-center">Something about yourself</p>
            <div className="pb-3 cursor-pointer text-blueText">
              <span>
                <a target="_blank" href="https://www.instagram.com/maywascold/">
                  Instagram
                </a>
              </span>
              <span className="px-1 text-mainText">|</span>
              <span>
                <a target="_blank" href="https://t.me/maywascold">
                  Telegram
                </a>
              </span>
            </div>

            <button
              onClick={() => navigate.push('/profile')}
              className="bg-grad w-full py-2 rounded-[10px] text-white cursor-pointer"
            >
              My Profile
            </button>
          </div>
          {/* <img
            className="absolute inset-0 w-full h-full top-[-55px]"
            src="/SmallCircle.svg"
          /> */}
        </>
      ) : (
        <NoAuthUserInfo />
      )}
    </div>
  )
}

export default UserInfo
