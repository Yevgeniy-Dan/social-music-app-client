"use client";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { ReactNode, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = useSelector<RootState>(
    (state) => state.auth.access_token
  );
  const navigate = useRouter();

  useLayoutEffect(() => {
    if (!accessToken) navigate.push("/auth");
  }, [accessToken]);
  return <div>{children}</div>;
};

export default AuthProvider;
