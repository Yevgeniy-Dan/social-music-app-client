"use client";
import { AnimatePresence, motion as m } from "framer-motion";



const ChatPreview = ({ user, deleteChat }) => {
  
  return (
    <AnimatePresence mode='popLayout'>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 * user.id} }}
        exit={{ opacity: 0, y: 20 }}
        layout
        className="relative flex items-center py-4 pl-5 pr-6 bg-white rounded-[20px] mb-6">
        <div className="w-14 h-14 rounded-full overflow-hidden"><img className="h-full object-cover" src={user.avatar} alt="" /></div>
        <div className="ml-4">
          <span className="text-[16px] text-mainText">{user.name}</span>
          <p className="text-secondText mt-1">{user.lastMes}</p>
        </div>
        
        <span className="ml-auto mr-8 text-secondText">3:15 pm</span>
        <img src="./MoreSquare.svg" alt="MoreSquare" onClick={() => deleteChat(user.id)} />
      </m.div>
    </AnimatePresence>
  );
};

export default ChatPreview