import { FC } from 'react'
interface IOurInput extends React.InputHTMLAttributes<HTMLInputElement> {
  submitIcon?: string
}

const OurInput: FC<IOurInput> = ({ submitIcon, ...props }) => {
  return (
    <div className={`w-full relative flex p-5 border border-border rounded-[15px]`}>
      <input {...props} />
      {submitIcon && (
        <button className="absolute right-[20px]" type="submit">
          <img src={submitIcon} alt={submitIcon} />
        </button>
      )}
    </div>
  )
}

export default OurInput
