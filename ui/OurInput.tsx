import React, { FC } from 'react'

interface IOurInput extends React.InputHTMLAttributes<HTMLInputElement> {
  submitIcon?: string;
}

const OurInput:FC<IOurInput> = (props) => {
  return (
    <div className='relative border border-border rounded-[15px] flex'>
      <input {...props} className='w-full p-5'/>
      {props.submitIcon && 
        <img className='absolute p-4 top-0 right-0 mr-5' src={props.submitIcon} alt={props.submitIcon}/>}
    </div>
  )
}

export default OurInput