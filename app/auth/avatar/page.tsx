'use client'

import { useRouter } from 'next/navigation'

import OurButton from '@/ui/OurButton'
import useUploadImage from '@/hooks/useUploadImage'

const AvatarPage = () => {
  const { handleAvatar, inputRef, pickFile, urlFile } = useUploadImage('avatar')

  const navigate = useRouter()

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold text-center">CHOOSE YOUR AVATAR</h3>
      <input
        ref={inputRef}
        onChange={(e) => handleAvatar(e)}
        className="hidden"
        type="file"
      />
      <div className="flex items-center justify-between my-8">
        <div
          className="overflow-hidden rounded-full bg-white text-[100px] border-[5px] w-[200px] h-[200px] border-blueText text-blueText text-opacity-50 flex items-center justify-center"
          onClick={() => pickFile()}
        >
          {urlFile ? (
            <img className="object-cover min-h-full min-w-full " src={urlFile} alt="" />
          ) : (
            '+'
          )}
        </div>
      </div>
      <OurButton
        onClick={() => {
          navigate.push('/')
        }}
        name="NEXT"
        variant="primary"
      />
      <OurButton name="LATER" variant="secondary" />
    </div>
  )
}

export default AvatarPage
