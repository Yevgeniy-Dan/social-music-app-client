import { useSelector } from "react-redux";

import { selectAuth } from "@/redux/slices/authSlice";
import useUploadImage from "@/app/hooks/useUploadImage";

import NoAuthUserInfo from "./NotAuthUserInfo";

const hesh = ["#guitar", "#jazz", "#modern"];

const UserInfo = () => {
  const { user } = useSelector(selectAuth);
  const { handleAvatar, inputRef, pickFile } = useUploadImage("avatar");

  return (
    <div className="user-bage flex flex-col items-center p-5">
      {user ? (
        <>
          <div className="relative mt-3 mb-6">
            <div className="h-[140px] w-[140px] overflow-hidden rounded-full">
              <img className="h-full object-cover" src={user?.avatar} alt="ava" />
            </div>
            <div
              onClick={() => pickFile()}
              className="flex items-center justify-center absolute rounded-full w-10 h-10 text-2xl text-white bg-blueText right-0 bottom-0"
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
          <div className="border border-border rounded-[15px] p-3 flex flex-col items-center w-full">
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
            <div className="pb-3">
              <span>Instagram</span>
              <span>Telegram</span>
            </div>

            <button className="bg-grad w-full py-2 rounded-[10px] text-white cursor-pointer">
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <NoAuthUserInfo />
      )}
    </div>
  );
};

export default UserInfo;
