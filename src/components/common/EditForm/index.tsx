import { useState } from "react";
import styles from "./EditForm.module.css";
import Button from "../Button";
import { updateUserEvent } from "../../../API/Auth/updateUserEvent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

type EditInfo = {
  isOpen: boolean,
  changeOpen: React.Dispatch<React.SetStateAction<boolean>>,
  avatar: string | undefined,
  banner: string | undefined,
  bio: string | undefined,
  venueManager: boolean | undefined,
  removed: boolean,
  setIsRemoved: React.Dispatch<React.SetStateAction<boolean>>
}

type Inputs = {
  avatar?: string | null;
  banner?: string | null;
  bio?: string | null;
}

const userSchema = yup.object().shape({
  avatar: yup.string().url('Invalid URL format').notRequired(),
  banner: yup.string().url('Invalid URL format').notRequired(),
  bio: yup.string()
})

const API_BASE = process.env.API_BASE_URL;
const API_PROFILES_PATH = process.env.API_ALL_PROFILES;


function EditForm({isOpen, changeOpen, removed, setIsRemoved, avatar, banner, bio, venueManager}: EditInfo) {
  const [isManager, setIsManager] = useState<boolean>(venueManager as boolean);

  const API_UPDATE_PROFILE = `${API_BASE}${API_PROFILES_PATH}/${name}`

  const {updateUserFetch} = updateUserEvent();
  const { register, handleSubmit, formState: { errors }} = useForm<Inputs>({
    resolver: yupResolver<Inputs>(userSchema),
  });

  function handleYes() {
    setIsManager(true)
  }

  function handleNo() {
    setIsManager(false);
  }

  function closeEdit() {
    changeOpen(false);
    setTimeout(() => {
      setIsRemoved(true)
    }, 600);
  }

  async function onSubmit(data: any) {
    const profileDetails = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": process.env.API_KEY,
      },
      body: JSON.stringify({
        bio: data.bio,
        avatar: {
          url: data.avatar,
          alt: "Profile Image"
        },
        banner: {
          url: data.banner,
          alt: "Banner Image"
        },
        venueManager: isManager
      })
    }

    const updateUser = await updateUserFetch(API_UPDATE_PROFILE, profileDetails);
    if(updateUser?.ok === true) {
      alert("Profile has been updated!");
      localStorage.removeItem("avatar");
      localStorage.removeItem("banner");
      localStorage.removeItem("isManager");

      localStorage.setItem("avatar", data.avatar);
      localStorage.setItem("banner", data.banner);
      localStorage.setItem("isManager", String(isManager));

      window.location.reload();
    }
  }

  return (
    <form className={`${styles.editForm} ${isOpen? styles.open : styles.closed} ${removed? styles.removed : ""}`} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="avatar">New Avatar URL:</label>
      <input type="text" id="avatar" defaultValue={avatar} {...register("avatar")}/>
      {errors.avatar ? <p className={styles.errorText}>{errors.avatar?.message}</p> : ""}
      <label htmlFor="banner">New Banner URL:</label>
      <input type="text" id="banner" defaultValue={banner} {...register("banner")}/>
      {errors.banner ? <p className={styles.errorText}>{errors.banner.message}</p> : ""}
      <label htmlFor="bio">New Bio:</label>
      <textarea id="bio" rows={3} defaultValue={bio} {...register("bio")}></textarea>
      <p>Manager?</p>
      <div className={styles.tickBoxContainer}>
        <p>Yes</p>
        <input type="checkbox" id="yes" name="Yes" checked={isManager === true} onChange={handleYes}/>
        <label htmlFor="yes"></label>
        <p>No</p>
        <input type="checkbox" id="no" name="No" checked={isManager === false} onChange={handleNo}/>
        <label htmlFor="no"></label>
      </div>
      <Button text="Update Profile" type="submit" event={() => {}}/>
      <Button text="X" type="button" event={closeEdit}/>
    </form>
  )
}

export default EditForm;