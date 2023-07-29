import React from "react";

const hesh = ["#guitar", "#jazz", "#modern"];

const UserInfo = () => {
  return (
    <div className='user-bage flex flex-col items-center p-5'>
      <div className="h-[140px] w-[140px] overflow-hidden rounded-full mt-3 mb-6"><img src="/ava.png" alt="ava" />
      </div>
      <div className="border border-border rounded-[15px] p-3 flex flex-col items-center w-full">
        <h3 className="text-hero text-mainText py-1 font-semibold">Ihor Stepanov</h3>
        <div className="pb-3">
          {hesh.map(item => <span className="text-secondText">{item}</span>)}
        </div>
        <p className="pb-2 text-center">Something about yourself</p>
        <div className="pb-3"><span>Instagram</span><span>Telegram</span></div>

        <button className="bg-grad w-full py-2 rounded-[10px] text-white cursor-pointer">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserInfo;