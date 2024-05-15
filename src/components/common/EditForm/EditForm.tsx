import { ChangeEvent, useState } from "react";
import styles from "./EditForm.module.css";
import Button from "../Button";
import { updateUserEvent } from "../../../API/Auth/updateUserEvent";

type EditInfo = {
  isOpen: boolean,
  avatar: string | undefined,
  banner: string | undefined,
  bio: string | undefined,
  venueManager: boolean | undefined
}

const name = localStorage.getItem("name");

const API_BASE = process.env.API_BASE_URL;
const API_PROFILES_PATH = process.env.API_ALL_PROFILES;
const API_UPDATE_PROFILE = `${API_BASE}${API_PROFILES_PATH}/${name}`

function EditForm({isOpen, avatar, banner, bio, venueManager}: EditInfo) {

  const [isManager, setIsManager] = useState<boolean>(venueManager as boolean);
  const [avatarURL, setAvatarURL] = useState<string>(avatar as string);
  const [bannerURL, setBannerURL] = useState<string>(banner as string);
  const [isBio, setIsBio] = useState(bio);

  const {updateUserFetch} = updateUserEvent();

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    setAvatarURL(e.target.value);
  }

  function handleBannerChange(e: ChangeEvent<HTMLInputElement>) {
    setBannerURL(e.target.value);
  }

  function handleBioChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setIsBio(e.target.value);
  }

  function handleYes() {
    setIsManager(true)
  }

  function handleNo() {
    setIsManager(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const profileDetails = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": process.env.API_KEY,
      },
      body: JSON.stringify({
        bio: isBio,
        avatar: {
          url: avatarURL,
          alt: "Profile Image"
        },
        banner: {
          url: bannerURL,
          alt: "Banner Image"
        },
        venueManager: isManager
      })
    }

    const updateUser = await updateUserFetch(API_UPDATE_PROFILE, profileDetails);
    if(updateUser?.ok === true) {
      alert("Profile has been updated!");
      window.location.reload();
    } else {
      alert("Something went wrong, please try again!");
    }
  }

  return (
    <form className={`${styles.editForm} ${isOpen? styles.open : styles.closed}`} onSubmit={onSubmit}>
      <label htmlFor="avatar">New Avatar URL:</label>
      <input type="text" id="avatar" value={avatarURL} onChange={handleAvatarChange}/>
      <label htmlFor="banner">New Banner URL:</label>
      <input type="text" id="banner" value={bannerURL} onChange={handleBannerChange}/>
      <label htmlFor="bio">New Bio:</label>
      <textarea id="bio" rows={3} value={bio} onChange={handleBioChange}></textarea>
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
    </form>
  )
}

export default EditForm;