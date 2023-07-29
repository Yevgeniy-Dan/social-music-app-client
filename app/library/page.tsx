"use client";

import { useRegUserMutation } from "@/redux/api/postsApi";
import { useEffect } from "react";



const Library = () => {
  const [regUser, result] = useRegUserMutation()
  useEffect(() => {
    regUser({username: "Ihp2222222", password: "jksoisoa"})
  }, [])
  console.log(result.data)
  return (
    <div>

    </div>
  );
};

export default Library;