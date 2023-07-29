import { FC, useState } from 'react'

type TLike = {
  count: number | undefined;
}

const Like: FC<TLike> = ({ count }) => {

  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(prev => !prev)
  }

  return (
      <div className="flex gap-2 items-center">
        <span>{count}</span>
        {isLiked
          ? <img onClick={handleLike} src='/HeartFill.svg' alt="HeartFill" />
          : <img onClick={handleLike} src='/Heart.svg' alt="Heart" />
        }
      </div>
  )
}

export default Like