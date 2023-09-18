import { useMutation } from "@apollo/client";
import axios from "axios";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuth, updateProfile } from "@/redux/slices/authSlice";
import { UPDATE_PROFILE } from "@/graphql/mutation/updateUser";
import { CREATE_POST } from "@/graphql/mutation/createPost";

type TFile = "avatar" | "post"

const useUploadImage = (typeFile: TFile) => {
  const [uploadFile, setUploadFile] = useState<FormData | null>(null);
  const [urlFile, setUrlFile] = useState<string | null>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [addNewAvatar, { loading: avatarLoading }] = useMutation(UPDATE_PROFILE);
  const [createPost, { loading: postLoading }] = useMutation(CREATE_POST);

  const storageApi =
    typeFile === "avatar"
      ? "http://localhost:5050/api/user/avatar/create"
      : "http://localhost:5050/api/post/create";

  useEffect(() => {
    // if (user?.avatar) navigate.push('/')
    if (!uploadFile) return;
    const getMediaUrlAvatar = async () => {
      const res = await axios.post(storageApi, uploadFile, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "multipart/form-data;",
        },
      });

      const mediaUrl = res.data.mediaUrl;

      setUrlFile(mediaUrl);
      if (typeFile === "post") {
        createPost({
          variables: {
            createPostInput: {
              mediaUrl,
            },
          },
        });
      } else {
        addNewAvatar({
          variables: {
            updateUserInput: {
              id: user.id,
              avatar: mediaUrl,
            },
          },
          onCompleted: (e) => {
            dispatch(
              updateProfile({
                avatar: e.updateUser.avatar,
              })
            );
          },
        });
      }
    };

    getMediaUrlAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFile]);

  const handleAvatar: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const data = new FormData();
      data.append("media", e.target.files[0]);
      setUploadFile(data);
    }
  };

  const pickFile = () => {
    inputRef.current?.click();
  };

  return {
    inputRef,
    pickFile,
    urlFile,
    handleAvatar,
    loading: typeFile === "avatar" ? avatarLoading : postLoading,
  };
};

export default useUploadImage;
