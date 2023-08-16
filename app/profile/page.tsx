import Post from "@/components/Post/Post";
import OurInput from "@/ui/OurInput";

const Profile = () => {
  return (
    <div>
      <div className="bg-white rounded-[15px] p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-mainText text-2xl font-semibold">Profile</h3>
          <button className="bg-grad text-white py-2 px-3 flex items-center gap-2 rounded-[10px] cursor-pointer">
            <img src="./Arrow.svg" alt="" /> Back
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <OurInput placeholder="Username" />
          <OurInput placeholder="E-mail" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <OurInput placeholder="Password" />
          <OurInput placeholder="Repeat password" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-[20px] mt-6">
        <form action="">
          <OurInput placeholder="+ Add new post..." />
        </form>
      </div>
    </div>
  );
};

export default Profile;
