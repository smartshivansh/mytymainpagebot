import { useState } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../../store/UserSlice";

import classes from "./login.module.css";

import menu from "../../assets/menu.svg"
import backbtn from "../../assets/backbtn.svg"

import Footer from "../footer/Footer";

import { useNavigate } from "react-router";

export default function Login(){

    const dispatch = useDispatch();

    const [slideDisplay, setSlideDisplay] = useState("none");
    const [slideTransform, setSlideTransform] = useState("translateX(80%)")
    const [slideTransition, setSlideTransition] = useState("all 0.5s")
    const [slideOpacity, setSlideOpacity] = useState(0);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [accept, setAccept] = useState("");

    const navigate = useNavigate()

    const openNotification = () => {   
        setSlideDisplay(p => "block");
        setTimeout(()=>{
            setSlideTransform(p => "translateX(0%)")
            setSlideTransition(p => p)
            setSlideOpacity(p => 1)
        }, 100)
    }

    const closeNotification = () => {
        setSlideTransform(p => "translateX(80%)")
        setSlideTransition(p => p)
        setSlideOpacity(p => 0)
        setTimeout(()=>{
            setSlideDisplay(p => "none");
        }, 1000)
    }

    const formSubmitHandler = (e) => {

        e.preventDefault()

        if(mobile.length !== 10 || isNaN(mobile)){
          setMobileError(p => "Please enter a valid mobile No");
          return;
        }

        fetch("http://localhost:8080/api/login", {
          method: "POST",
          body: JSON.stringify({mobile}),
          headers:{
            "content-type": "application/json"
          }
        }).then(res => res.json())
        .then(res => JSON.parse(res))
        .then(res => {
          if(res.sucess){
            localStorage.setItem("userToken", res.users.email)
            dispatch(userUpdate(res.users.name, res.users.email, res.users.chat, res.users.prompt, res.users.mobile))
            navigate("/mobileotpverify");
          }
          else{
            if(res.msg=="USER ALREADY EXIST"){
              setMobileError("Mobile No already registered")
            }
            else{
              alert("Some error occured Please try again later")
            }
          }
        })
        // loadRazorpayScript();
    }

    return <div className={classes.container} onSubmit={formSubmitHandler}>

              <header className={classes.header}>
                 <img src={menu} alt="menu" className={classes.img} onClick={openNotification} />
              </header>

              <h1 className={classes.heading}>Log In</h1>

              <form className={classes.form}>

                <p className={classes.fromHeading}>Enter ypuy mobile Number to continue </p>

                <input required type="tel" className={classes.input} placeholder="Phone number" value={mobile} onChange={(e)=>{setMobile(p=>e.target.value)}}  />
                <p style={{display: `${mobileError == "" ? "none" : "block"}`}} className={classes.error}>{mobileError}</p>

                <button type="submit" className={classes.button}>Log In</button>

              </form>

                {/* menu slide */}

              <div className={classes.menuslide} style={{opacity: slideOpacity ,transform: slideTransform, display: slideDisplay, transition: slideTransition}}>
               <header className={classes.menuheader}>
                 <img src={backbtn} alt="menu" id={classes.backbtn} className={classes.img} onClick={closeNotification} />
                 <img src={menu} alt="menu" className={classes.img} />
               </header>

               <div>
                 <h1 className={classes.menuheading}>Contact Us</h1>
                 <ul>
                     <li><a href="tel:9323722268" className={classes.link}>9329722268</a></li>
                     <li><a href="mailto:care@myty.in" className={classes.link}>care@myty.in</a></li>
                 </ul>
               </div>
             </div>

             <Footer />
          </div>
}