import { FC, forwardRef } from 'react'
interface IOurInput extends React.InputHTMLAttributes<HTMLInputElement> {
  submitIcon?: string
}

const OurInput: FC<IOurInput> = forwardRef<HTMLInputElement, IOurInput>(
  ({ submitIcon, ...props }, ref) => {
    return (
      <div className={`w-full relative flex p-5 border border-border rounded-[15px]`}>
        <input ref={ref} {...props} />
        {submitIcon && (
          <button className="absolute right-[20px] bottom-[16px]" type="submit">
            <img src={submitIcon} alt={submitIcon} />
          </button>
        )}
      </div>
    )
  }
)

export default OurInput
