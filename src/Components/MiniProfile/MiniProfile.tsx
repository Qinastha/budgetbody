import React, { useCallback } from "react";
import "./MiniProfile.scss";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUser, setUserAvatar } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export const MiniProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { avatar, userName } = useAppSelector(getUser);
  const isProfilePicture = avatar !== "no avatar";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="miniProfileContainer">
      <div className="miniProfileContainer__upPart" onClick={handleButtonClick}>
        {isProfilePicture ? (
          <img src={avatar} alt="avatar" />
        ) : (
          <span className="material-symbols-outlined">account_circle</span>
        )}
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <div className="miniProfileContainer__lowPart">
        <p>{userName}</p>
        <span onClick={handleLogout} className="material-symbols-outlined">
          logout
        </span>
      </div>
    </div>
  );
};
