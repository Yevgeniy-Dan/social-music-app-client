"use client";

import { motion as m } from "framer-motion";
import { useForm } from "react-hook-form";

import {
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRegUserMutation } from "@/redux/api/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const Auth = () => {
  const { handleSubmit, register } = useForm();
  const [auth, setAuth] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [regUser, { data, isSuccess }] = useRegUserMutation();
  const dispatch = useDispatch();
  const token = useSelector((state) => console.log(state));
  const navigate = useRouter()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data?.login?.access_token));
      console.log(data);
      navigate.push('auth/genres')
    }
  }, [isSuccess]);

  const changeAuth: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setAuth((prev) => !prev);
  };

  const submitForm = async (e) => {
    const { username, password } = e;
    await regUser(e);
    console.log({ username, password }, data);
  };

  const pickFile = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <m.div
        layout="position"
        transition={{ delay: 0.5 }}
        exit={{ opacity: 0, x: 20 }}
        className="max-w-[500px] rounded-[30px] flex flex-col bg-white px-6 py-8"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">
          {auth ? "REGISTER" : "SIGN IN"}
        </h3>
        <form onSubmit={handleSubmit(submitForm)}>
          {auth && (
            <m.input
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              className="w-full p-5 mb-5 border border-border rounded-[15px]"
              type="text"
              placeholder="Name"
            />
          )}
          <input
            {...register("username")}
            className="w-full p-5 mb-5 border border-border rounded-[15px]"
            placeholder="E-mail"
          />
          <input
            {...register("password")}
            className="w-full p-5 mb-5 border border-border rounded-[15px]"
            type="password"
            placeholder="Password"
          />
          <input ref={inputRef} className="hidden" type="file" name="" id="" />
          {auth && (
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <button
                className="rounded-full border py-2 px-9 border-blueText text-blueText"
                onClick={(e) => pickFile()}
              >
                Choose Avatar image
              </button>
              <span>Image will be 2Mb</span>
            </m.div>
          )}
          <button
            type="submit"
            className="text-white text-base font-bold w-full py-4 bg-grad rounded-[15px]"
          >
            {auth ? "REGISTER" : "SIGN IN"}
          </button>
          <button
            onClick={(e) => changeAuth(e)}
            className="text-base font-bold uppercase w-full pt-4 text-blueText underline"
          >
            {auth ? "SIGN IN" : "REGISTER"}
          </button>
        </form>
      </m.div>
    </>
  );
};

export default Auth;
