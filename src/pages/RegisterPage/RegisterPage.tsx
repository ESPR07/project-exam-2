import { useContext, useState } from "react";
import styles from "./RegisterPage.module.css";
import Button from "../../components/common/Button";
import { registerAuthEvents } from "../../API/Auth/registerAuthEvent";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginAuthEvents } from "../../API/Auth/loginAuthEvent";
import { AuthContext } from "../../App";

const API_BASE = process.env.API_BASE_URL;
const API_REGISTER_PATH = process.env.API_REGISTER;
const API_REGISTER_URL = `${API_BASE}${API_REGISTER_PATH}`

const API_LOGIN_PATH = process.env.API_LOGIN;
const API_LOGIN_URL = `${API_BASE}${API_LOGIN_PATH}`

type Inputs = {
  userName: string;
  email: string;
  password: string;
  avatarURL?: string | null;
  bannerURL?: string | null;
}

const userSchema = yup.object().shape({
  userName: yup.string().required('Name is required').matches(/^\S+$/, 'No spaces allowed'),
  email: yup.string().email('Invalid email format').required('Email is required').matches(/^[\w.%+-]+@stud\.noroff\.no$/, 'Email must be a @stud.noroff.no address'),
  password: yup.string().required('Password is required'),
  avatarURL: yup.string().url('Invalid URL format').notRequired(),
  bannerURL: yup.string().url('Invalid URL format').notRequired()
})

function RegisterPage() {
  const [isManager, setIsManager] = useState<boolean>(false);
  const {setIsLoggedIn} = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors }} = useForm<Inputs>({
    resolver: yupResolver<Inputs>(userSchema),
  });

  const {RegisterFetch} = registerAuthEvents();
  const {APIFetch} = loginAuthEvents();

  function handleYes() {
    setIsManager(true)
  }

  function handleNo() {
    setIsManager(false);
  }

  async function registerEvent(data: Inputs) {
    const registerDetails = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: data.userName,
        email: data.email,
        password: data.password,
        avatar: {
          url: data.avatarURL,
          alt: "Avatar Image"
        },
        banner: {
          url: data.bannerURL,
          alt: "Banner Image"
        },
        venueManager: isManager
      })
    }

    const loginDetails = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    }

    const response = await RegisterFetch(API_REGISTER_URL, registerDetails);
    if(response?.ok !== false) {
      const loginResponse = await APIFetch(API_LOGIN_URL, loginDetails);
      if(loginResponse?.ok === true) {
        setIsLoggedIn(true);
      } else {
        console.log("Login failed.");
      }
    } else {
      console.log("Register Failed");
    }
  }

  return(
    <main className={styles.pageContent}>
      <h1>Register Account</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit(registerEvent)}>
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
          <label htmlFor="name">Username</label>
          <input type="text" id="name" placeholder="Username" {...register("userName")}/>
          {errors.userName ? <p className={styles.errorText}>{errors.userName.message}</p> : ""}
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="@stud.noroff.no" {...register("email")}/>
          {errors.email ? <p className={styles.errorText}>{errors.email.message}</p> : ""}
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="********" {...register("password")}/>
          {errors.password ? <p className={styles.errorText}>{errors.password.message}</p> : ""}
        </div>
        <h2>Add a picture!</h2>
        <div className={styles.avatarBanner}>
          <label htmlFor="avatar">Avatar URL</label>
          <input type="text" id="avatar" {...register("avatarURL")}/>
          {errors.avatarURL ? <p className={styles.errorText}>{errors.avatarURL.message}</p> : ""}
          <label htmlFor="banner">Banner URL</label>
          <input type="text" id="banner" {...register("bannerURL")}/>
          {errors.bannerURL ? <p className={styles.errorText}>{errors.bannerURL.message}</p> : ""}
        </div>
        <Button text="Register" type="submit" event={() => {}}/>
      </form>
    </main>
  )
}

export default RegisterPage;