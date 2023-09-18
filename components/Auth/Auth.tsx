"use client";

import { motion as m } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import { MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import { setCredentials } from "@/redux/slices/authSlice";
import { SET_LOG_IN, SET_SIGN_UP } from "@/graphql/mutation/auth";
import {
  LogInMutation,
  LogInMutationVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from "@/@types/graphql";
import OurError from "@/ui/OurError";

import { inputRegister } from "./inputRegister";

const Auth = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [auth, setAuth] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [signup] = useMutation<SignUpMutation, SignUpMutationVariables>(SET_SIGN_UP);
  const [login, { error }] = useMutation<LogInMutation, LogInMutationVariables>(
    SET_LOG_IN
  );

  const changeAuth: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setAuth((prev) => !prev);
  };

  const submitForm = async (e: FieldValues) => {
    const { username, email, password } = e;
    if (!auth) {
      await login({
        variables: {
          loginUserInput: {
            email,
            password,
          },
        },
        onCompleted: (e) => {
          dispatch(
            setCredentials({
              user: e.login.user || null,
              access_token: e.login.accessToken || null,
            })
          );
          e.login.user.avatar ? navigate.push("/") : navigate.push("/auth/avatar");
        },
      });
    } else {
      await signup({
        variables: {
          signupUserInput: {
            username,
            email,
            password,
          },
        },
      });
      setAuth(false);
    }
  };

  return (
    <>
      {error && <OurError error={error} />}
      <m.div
        layout="position"
        transition={{ delay: 0.5 }}
        exit={{ opacity: 0, x: 20 }}
        className="w-[500px] rounded-[30px] flex flex-col bg-white px-6 py-8"
      >
        <h3 className="mb-4 text-2xl font-bold text-center">
          {auth ? "REGISTER" : "SIGN IN"}
        </h3>
        <form onSubmit={handleSubmit(submitForm)}>
          {auth && (
            <div className="relative">
              <m.input
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.2 }}
                {...register("username", inputRegister.username)}
                className={`w-full p-5 border ${
                  errors.username ? "border-red-500" : "border-border"
                } rounded-[15px]`}
                type="text"
                placeholder="Name"
              />
              {errors.username ? (
                <span className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
                  {errors.username.message as string}
                </span>
              ) : null}
            </div>
          )}
          <div className="relative mt-5">
            <input
              {...register("email", inputRegister.email)}
              className={`w-full p-5 border ${
                errors.email ? "border-red-500" : "border-border"
              } rounded-[15px]`}
              placeholder="E-mail"
            />
            {errors.email ? (
              <div className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
                Не правильный имейл
              </div>
            ) : null}
          </div>
          <div className="relative mt-5">
            <input
              {...register("password", inputRegister.password)}
              className={`w-full p-5 border ${
                errors.password ? "border-red-500" : "border-border"
              } rounded-[15px]`}
              onChange={(e) => setRepeatPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            {errors.password ? (
              <div className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
                Не правильный пароль
              </div>
            ) : null}
          </div>
          {auth && (
            <div className="relative mt-5">
              <input
                {...register("repeatPassword", {
                  pattern: new RegExp(repeatPassword, "g"),
                  required: true,
                })}
                className={`w-full p-5 border ${
                  errors.repeatPassword ? "border-red-500" : "border-border"
                } rounded-[15px]`}
                type="password"
                placeholder="Repeat password"
              />
              {errors.repeatPassword ? (
                <div className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
                  Не правильный пароль
                </div>
              ) : null}
            </div>
          )}
          <button
            type="submit"
            className="text-white text-base font-bold w-full py-4 mt-5 bg-grad rounded-[15px]"
          >
            {auth ? "REGISTER" : "SIGN IN"}
          </button>
          <button
            onClick={(e) => changeAuth(e)}
            className="w-full pt-4 text-base font-bold underline uppercase text-blueText"
          >
            {auth ? "SIGN IN" : "REGISTER"}
          </button>
        </form>
      </m.div>
    </>
  );
};

export default Auth;
