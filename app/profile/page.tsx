"use client";

import { useMutation, useQuery } from "@apollo/client";
import { FieldValues, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { useCallback, useState } from "react";

import {
  MutationDeletePostArgs,
  PostDeleteResponse,
  QueryUserArgs,
  User,
} from "@/@types/graphql";
import Loader from "@/components/Loader/Loader";
import Post from "@/components/Post/Post";
import { DELETE_POST } from "@/graphql/mutation/deleteMyPost";
import { GET_USER } from "@/graphql/query/users";
import { selectAuth, updateProfile } from "@/redux/slices/authSlice";
import OurButton from "@/ui/OurButton";
import { UPDATE_PROFILE } from "@/graphql/mutation/updateUser";

import { inputRegister } from "@/components/Auth/inputRegister";

import useUploadImage from "../hooks/useUploadImage";

const Profile = () => {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [repeatPassword, setRepeatPassword] = useState("");
  const {
    handleAvatar,
    inputRef,
    pickFile,
    loading: postUploadLoading,
  } = useUploadImage("post");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { data, loading } = useQuery<{ user: User }, QueryUserArgs>(GET_USER, {
    variables: {
      username: user?.username,
    },
  });

  const [update] = useMutation(UPDATE_PROFILE, {
    onCompleted: (e) => {
      dispatch(updateProfile(e.updateUser));
      reset();
    },
  });

  if (loading) <Loader />;

  const [deletePost] = useMutation<PostDeleteResponse, MutationDeletePostArgs>(
    DELETE_POST,
    {
      refetchQueries: [
        {
          query: GET_USER,
          variables: {
            username: user?.username,
          },
        },
      ],
      variables: {
        postId: "1",
      },
    }
  );

  const deleteMyPost = useCallback((postId: string) => {
    deletePost({
      variables: {
        postId: postId,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMyProfile = (e: FieldValues) => {
    // eslint-disable-next-line no-unused-vars
    const { repeatPassword, ...data } = e;

    for (let i in data) {
      if (!data[i]) {
        delete data[i];
      } else {
        data[i] = data[i].trim();
      }
    }

    update({
      variables: {
        updateUserInput: {
          id: user.id,
          ...data,
        },
      },
    });
  };

  return (
    <div>
      <div className="bg-white rounded-[15px] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-mainText">Profile</h3>
          <button className="bg-grad text-white py-2 px-3 flex items-center gap-2 rounded-[10px] cursor-pointer">
            <img src="./Arrow.svg" alt="" /> Back
          </button>
        </div>
        <form onSubmit={handleSubmit(updateMyProfile)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <input
                {...register("username", {
                  minLength: {
                    value: 2,
                    message: "Минимально 2 знака",
                  },
                  maxLength: {
                    value: 20,
                    message: "Максимально 20 знаков",
                  },
                })}
                className={`w-full p-5 border ${
                  errors.username ? "border-red-500" : "border-border"
                } rounded-[15px]`}
                type="text"
                placeholder="Username"
              />
              {errors.username ? (
                <div className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
                  Не правильный пароль
                </div>
              ) : null}
            </div>
            <div className="relative">
              <input
                {...register("email", {
                  pattern:
                    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                })}
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
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative">
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
            <div className="relative">
              <input
                {...register("repeatPassword", {
                  pattern: new RegExp(repeatPassword, "g"),
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
          </div>
          <OurButton type="submit" name="Change" variant="primary" />
        </form>
      </div>
      <div className="bg-white p-5 rounded-[20px] my-6">
        <div
          onClick={() => pickFile()}
          className="border-[2px] border-blueText rounded-[15px]"
        >
          <OurButton
            variant="secondary"
            name={postUploadLoading ? "Loading..." : "+ Add new post"}
          />
        </div>
      </div>
      {data?.user?.posts?.map((post) => (
        <div key={post.id} className="bg-white p-5 rounded-[20px] mb-6">
          <Post key={post.id} {...post} deletePost={deleteMyPost} />
        </div>
      ))}
      <input
        ref={inputRef}
        onChange={(e) => handleAvatar(e)}
        className="hidden"
        type="file"
      />
    </div>
  );
};

export default Profile;
