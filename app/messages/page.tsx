"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import ChatPreview from "@/components/ChatPreview/ChatPreview";

const fakeUserChat = [
  {
    avatar:
      "https://gravatar.com/avatar/ed554684073ff07a9aec6a952bfd93e0?s=400&d=robohash&r=x",
    name: "Ihor",
    lastMes: "Hello how are you?",
    id: 1,
  },
  {
    avatar:
      "https://gravatar.com/avatar/bfb9d2d8775b633f7e30225919f666bc?s=400&d=robohash&r=x",
    name: "Veronika",
    lastMes: "Hello how are you?",
    id: 2,
  },
  {
    avatar:
      "https://gravatar.com/avatar/80990873a38da3dbb188816b10f1f467?s=400&d=robohash&r=x",
    name: "Alex",
    lastMes: "Hello how are you?",
    id: 3,
  },
  {
    avatar:
      "https://gravatar.com/avatar/a3ea327392d7c8c0698b8b9a16d4b07f?s=400&d=robohash&r=x",
    name: "Ivan",
    lastMes: "Hello how are you?",
    id: 4,
  },
  {
    avatar:
      "https://gravatar.com/avatar/ca840afa67bdd7aee034abf3a230e908?s=400&d=robohash&r=x",
    name: "Evgen",
    lastMes: "Hello how are you?",
    id: 5,
  },
];

const Messages = () => {
  const [chats, setChats] = useState(fakeUserChat);
  const deleteChat = (id: number): void => {
    setChats((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <div className="flex justify-between items-center pt-9 mb-7">
        <h3 className="text-mainText text-2xl font-semibold">Your Chats</h3>
        <button className="bg-grad text-white py-2 px-3 flex items-center gap-2 rounded-[10px] cursor-pointer">
          <img src="./Arrow.svg" alt="" /> Back
        </button>
      </div>
      <AnimatePresence mode="popLayout">
        {chats &&
          chats.map((user) => {
            return <ChatPreview key={user.id} user={user} deleteChat={deleteChat} />;
          })}
      </AnimatePresence>
    </>
  );
};

export default Messages;
