import { useRouter } from "next/navigation";
import React from "react";

import OurButton from "@/ui/OurButton";

const NoAuthUserInfo = () => {
  const navigate = useRouter();

  return (
    <div className="m-auto">
      <h3 className="text-hero text-mainText py-1 font-semibold text-center mb-4">
        Login or create your account
      </h3>
      <OurButton onClick={() => navigate.push("/auth")} name="Login" variant="primary" />
      <OurButton
        onClick={() => navigate.push("/auth")}
        name="Create"
        variant="secondary"
      />
    </div>
  );
};

export default NoAuthUserInfo;
