import OurInput from "@/ui/OurInput";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center pt-9 mb-7">
        <h3 className="text-mainText text-2xl font-semibold">Search Result</h3>
        <button className="bg-grad text-white py-2 px-3 flex items-center gap-2 rounded-[10px] cursor-pointer">
          <img src="./Arrow.svg" alt="" /> Back
        </button>
      </div>
      <form action="">
        <OurInput placeholder="Search..." />
      </form>
    </div>
  );
};

export default page;
