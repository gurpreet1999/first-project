import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthError, userLogin, userRegister } from '../../redux/slice/authSlice';
import "./LoginSignUp.css"
import  toast  from 'react-hot-toast';

const LoginSignUp = () => {

  



  
  const {isAuthentiated,error,loading}=useSelector((state)=>state.user)

  const dispatch=useDispatch()

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
  
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
})
const {name,email,password}=user
const [avatar,setAvatar]=useState("")
const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      setAvatar(e.target.files[0]);

      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(reader)
          setAvatarPreview(reader.result);
         console.log(avatar)
          
        
      };
    }
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


const switchTabs=(e,tab)=>{

if(tab==="login"){
    switcherTab.current.classList.add("shiftToNeutral")
    switcherTab.current.classList.remove("shiftToRight")
    registerTab.current.classList.remove("shiftToNeutralForm")
   loginTab.current.classList.remove("shiftToLeft")
}
if(tab==="register"){
    switcherTab.current.classList.add("shiftToRight")
    switcherTab.current.classList.remove("shiftToNeutral")
    registerTab.current.classList.add("shiftToNeutralForm")
   loginTab.current.classList.add("shiftToLeft")
}
}
const navigate=useNavigate()
const location=useLocation()
const redirect = location.search ? location.search.split("=")[1] :"/profile";
const data = location.state?.data || null;

const loginSubmit=(e)=>{
  e.preventDefault()

  console.log(loginPassword)

  console.log(loginEmail)
  dispatch(userLogin({loginEmail, loginPassword}))
  

}

const registerSubmit = (e) => {
    e.preventDefault();

    if(!name,!email,!password,!avatar){
      toast.error('please fill out all the field')
      return
    }
    if(name.length<4){
      toast.error('name should be 4 character long')
      return
    }
if(password.length<4){
  toast.error('password is too short ,atleast it must be 6 char long')
  return
}
   
    const myForm = new FormData();



    console.log(avatar)
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("file", avatar);
   
    dispatch(userRegister(myForm))
   


    
  };

  useEffect(() => {
   

    if (isAuthentiated) {

        console.log("helllo")
        navigate(`/profile`)
        return
     }
if(error){

  toast.error(error)
 dispatch(removeAuthError())
}


  }, [isAuthentiated,error]);
  useEffect(()=>{
    console.log(data)
    if(data){
      toast.error('login first to continue')
    }
      },[data]) 
  return (
    <>
    <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  < MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" disabled={loading}   />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  < MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" disabled={loading}   />
              </form>
            </div>
          </div>
    
    
    
    
    </>
  )
}

export default LoginSignUp