import React, { FC } from 'react'

interface IOurButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary'
  name: string
}

const OurButton: FC<IOurButton> = ({ variant, name, ...props }) => {
  const cssPrimary =
    'text-white text-base uppercase font-bold w-full py-4 bg-grad rounded-[15px]'
  const cssSecondary =
    'text-base font-bold uppercase w-full py-4 text-blueText underline'

  return (
    <button
      {...props}
      className={variant === 'secondary' ? cssSecondary : cssPrimary}
    >
      {name}
    </button>
  )
}

export default OurButton
