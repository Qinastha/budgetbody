import React, { useCallback } from "react";
import "./MiniProfile.scss";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUser, getUserAvatar, setUserAvatar } from "../../store/userSlice";

export const MiniProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { avatar, userName } = useAppSelector(getUser);

  const handleUploadMessage = async (fileURL: string) => {
    if (!fileURL) {
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/update-avatar`,
        { avatar: fileURL },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response?.data?.value) {
        dispatch(setUserAvatar(response.data.value.avatar));
      } else {
        console.error("Failed to update avatar");
      }
    } catch (err) {
      console.error("Failed to upload avatar", err);
    }
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        handleUploadMessage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  }, []);

  const handleButtonClick = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <div className="miniProfileContainer">
      <img src={avatar} alt="avatar" onClick={handleButtonClick} />
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleChange}
        accept="image/*"
      />
      <p>{userName}</p>
    </div>
  );
};
