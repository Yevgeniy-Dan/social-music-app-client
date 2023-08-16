"use client";

import { motion as m } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import axios from "axios";

import { setCredentials } from "@/redux/slices/authSlice";
import { SET_LOG_IN, SET_SIGN_UP } from "@/graphql/mutation/auth";
import {
  LogInMutation,
  LogInMutationVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from "@/@types/graphql";

const Auth = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [auth, setAuth] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [UrlFile, setUrlFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [signup, { loading: isLoad, error: isErr }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SET_SIGN_UP);
  const [login, { data, loading, error }] = useMutation<
    LogInMutation,
    LogInMutationVariables
  >(SET_LOG_IN);

  useEffect(() => {
    // const sendAvatar = async () => {
    //   const res = await axios.post(
    //     "https://social-music-upload-server-port.up.railway.app/api/post/create",
    //     {
    //       media: uploadFile,
    //     }
    //   );
    //   return res;
    // };
    // const data = sendAvatar();
    // setUrlFile(data);
  }, [uploadFile]);

  if (!loading) {
    if (data) {
      dispatch(
        setCredentials({
          user: data?.login.user,
          access_token: data?.login.accessToken,
        })
      );
    }
  }

  if (errors) {
    console.log(errors);
  }

  const changeAuth: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setAuth((prev) => !prev);
  };

  const handleAvatar: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setUploadFile(e.target.files[0]);
    }
  };

  const submitForm = async (e: FieldValues) => {
    const { username, email, password, avatar } = e;
    console.log(username, email, password, avatar);
    if (!auth) {
      await login({
        variables: {
          loginUserInput: {
            email,
            password,
          },
        },
      });
      dispatch(
        setCredentials({
          user: data?.login.user || null,
          access_token: data?.login.accessToken || null,
        })
      );
      navigate.push("/");
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
    }
    setAuth((prev) => !prev);
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
        className="w-[500px] rounded-[30px] flex flex-col bg-white px-6 py-8">
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
              {...register("username", { minLength: 2, maxLength: 20 })}
              className="w-full p-5 border border-border rounded-[15px]"
              type="text"
              placeholder="Name"
            />
          )}
          {errors.username ? (
            <div className="w-full text-red-500">Не правильный Login</div>
          ) : null}
          <input
            {...register("email", {
              pattern:
                /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
            })}
            className="w-full p-5 mt-5 border border-border rounded-[15px]"
            placeholder="E-mail"
          />
          {errors.email ? (
            <div className="w-full text-red-500">Не правильный имейл</div>
          ) : null}
          <input
            {...register("password", {
              // pattern: /((?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/,
              minLength: 8,
              maxLength: 32,
            })}
            className="w-full p-5 mt-5 border border-border rounded-[15px]"
            type="password"
            placeholder="Password"
          />
          {errors.password ? (
            <div className="w-full text-red-500">
              {errors?.password?.message as string}
            </div>
          ) : null}
          <input
            {...register("avatar", {
              // required: true,
            })}
            ref={inputRef}
            onChange={(e) => handleAvatar(e)}
            className="hidden"
            type="file"
          />
          {auth && (
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mt-4">
              <button
                className="rounded-full border py-2 px-9 border-blueText text-blueText"
                onClick={(e) => pickFile()}>
                Choose Avatar image
              </button>
              <span>{uploadFile?.name}</span>
            </m.div>
          )}
          <button
            type="submit"
            className="text-white text-base font-bold w-full py-4 mt-5 bg-grad rounded-[15px]">
            {auth ? "REGISTER" : "SIGN IN"}
          </button>
          <button
            onClick={(e) => changeAuth(e)}
            className="text-base font-bold uppercase w-full pt-4 text-blueText underline">
            {auth ? "SIGN IN" : "REGISTER"}
          </button>
        </form>
      </m.div>
    </>
  );
};

export default Auth;
