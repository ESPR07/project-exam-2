import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Button from "../../components/common/Button";
import { registerAuthEvents } from "../../API/Auth/registerAuthEvent";
import { redirect } from "react-router-dom";

const API_BASE = process.env.API_BASE_URL;
const API_REGISTER_PATH = process.env.API_REGISTER;
const API_REGISTER_URL = `${API_BASE}${API_REGISTER_PATH}`

function RegisterPage() {
  const [isManager, setIsManager] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatarURL, setAvatarURL] = useState<string>("");
  const [bannerURL, setBannerURL] = useState<string>("");

  const {RegisterFetch} = registerAuthEvents();

  function handleYes() {
    setIsManager(true)
  }

  function handleNo() {
    setIsManager(false);
  }

  async function registerEvent() {
    const registerDetails = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        avatar: {
          url: avatarURL,
          alt: "Avatar Image"
        },
        banner: {
          url: bannerURL,
          alt: "Banner Image"
        },
        venueManager: isManager
      })
    }
    const response = await RegisterFetch(API_REGISTER_URL, registerDetails);
    if(response?.ok !== false) {
      alert(`Welcome to Holidaze ${name}`);
      redirect("/");
    }
  }

  return(
    <main className={styles.pageContent}>
      <h1>Register Account</h1>
      <form className={styles.registerForm} onSubmit={(e) => {
        e.preventDefault();
        registerEvent();
      }}>
        <h2>Are you a manager?</h2>
        <div className={styles.tickBoxContainer}>
          <p>Yes</p>
          <input type="checkbox" id="yes" name="Yes" checked={isManager === true} onChange={handleYes}/>
          <label htmlFor="yes"></label>
          <p>No</p>
          <input type="checkbox" id="no" name="No" checked={isManager === false} onChange={handleNo}/>
          <label htmlFor="no"></label>
        </div>
        <h2>Who are you?</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} placeholder="Name Namesson" onChange={(e) => {setName(e.target.value)}} required/>
          <label htmlFor="email">Email</label>
          <input type="email" id="name" value={email} placeholder="@stud.noroff.no" onChange={(e) => {setEmail(e.target.value)}} required/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="********" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
        </div>
        <h2>Add a picture!</h2>
        <div className={styles.avatarBanner}>
          <label htmlFor="avatar">Avatar URL</label>
          <input type="text" id="avatar" value={avatarURL} placeholder="www.imagelocation.com/image.jpg" onChange={(e) => {setAvatarURL(e.target.value)}}/>
          <label htmlFor="banner">Banner URL</label>
          <input type="text" id="banner" value={bannerURL} placeholder="www.imagelocation.com/image.jpg" onChange={(e) => {setBannerURL(e.target.value)}}/>
        </div>
        <Button text="Register" type="submit" event={() => {}}/>
      </form>
    </main>
  )
}

export default RegisterPage;