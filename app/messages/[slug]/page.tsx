import ChatPreview from "@/components/ChatPreview/ChatPreview";
import OurInput from "@/ui/OurInput";

const fakeUserChat = [
  {
    avatar:
      "https://gravatar.com/avatar/ed554684073ff07a9aec6a952bfd93e0?s=400&d=robohash&r=x",
    name: "Ihor",
    lastMes: "Hello how are you?",
    id: 1,
  },
];

const myMessage = true;
const friendsMessage = false;

const ChatRoom = () => {
  return (
    <>
      <div className="flex flex-col h-[94vh]">
        <div className="flex justify-between items-center pt-9 mb-7">
          <h3 className="text-mainText text-2xl">Chat</h3>
          <button className="bg-grad text-white py-2 px-3">Back</button>
        </div>
        <ChatPreview key={fakeUserChat[0].id} user={fakeUserChat[0]} />
        <div className="mt-auto">
          <div className="flex mt-auto gap-4 mb-4">
            <div
              className={`w-14 h-14 shrink-0 rounded-full overflow-hidden ${
                myMessage ? "order-2" : ""
              }`}>
              <img
                className="h-full w-full object-cover"
                src="https://baronfilm.biz/uploads/posts/2019-07/1563321900-10101352.webp"
                alt=""
              />
            </div>
            <p
              className={`text-mainText bg-white inline-block py-2 px-3 self-start rounded-lg ${
                myMessage ? "ml-auto order-1" : ""
              }`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              dolor quo vel, in molestias inventore delectus nesciunt assumenda
              consequuntur recusandae nam, voluptatibus praesentium deserunt
              nostrum.
            </p>
          </div>
          <div className="flex mt-auto gap-4 mb-4">
            <div
              className={`w-14 h-14 rounded-full overflow-hidden ${
                friendsMessage ? "order-2" : ""
              }`}>
              <img
                className="h-full w-full object-cover"
                src="https://baronfilm.biz/uploads/posts/2019-07/1563321900-10101352.webp"
                alt=""
              />
            </div>
            <p
              className={`text-mainText bg-white inline-block py-2 px-3 self-start rounded-lg ${
                friendsMessage ? "ml-auto order-1" : ""
              }`}>
              Thing
            </p>
          </div>
        </div>
        <OurInput placeholder="Text something..." submitIcon="/Chat.svg" />
      </div>
    </>
  );
};

export default ChatRoom;
