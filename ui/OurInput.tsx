import React, { FC } from "react";

interface IOurInput extends React.InputHTMLAttributes<HTMLInputElement> {
  submitIcon?: string;
}

const OurInput: FC<IOurInput> = ({ submitIcon, ...props }) => {
  const disabledStyle = props.disabled ? "opacity-5" : "";

  return (
    <div
      className={`relative bg-white border border-border rounded-[15px] flex`}>
      <input {...props} className="w-full p-5 reply-username" />
      {submitIcon && (
        <button className="mr-4 flex items-center" type="submit">
          <img src={submitIcon} alt={submitIcon} />
        </button>
      )}
    </div>
  );
};

export default OurInput;
