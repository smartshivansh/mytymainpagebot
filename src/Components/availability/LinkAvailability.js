import { useState } from "react";

import { useNavigate } from "react-router";

import classes from "./LinkAvailability.module.css"

import Footer from "../footer/Footer"

import menu from "../../assets/menu.svg"
import backbtn from "../../assets/backbtn.svg"
import xicon from "../../assets/xicon.svg"

export default function LinkAvailability(){

    const navigate = useNavigate()

    const [slideDisplay, setSlideDisplay] = useState("none");
    const [slideTransform, setSlideTransform] = useState("translateX(80%)")
    const [slideTransition, setSlideTransition] = useState("all 0.5s")
    const [slideOpacity, setSlideOpacity] = useState(0);

    const [error, setError] = useState("");
    const [errorColor, setErrorColor] = useState("")

    const [bookLinkDisplay, setBookLinkDisplay] = useState("none");

    const [popupDisplay, setPopupDisplay] = useState("flex");
    const [cpopupDisplay, setcPopupDisplay] = useState("none");

    const [username, setUsername] = useState("");

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

        e.preventDefault();

        if(username.length < 8){
            setErrorColor(p => "red");
            setError(p => "please write more than 8 characters")
            return;
        }

        setBookLinkDisplay(p => "block")
        setErrorColor(p => "#10BA01");
        setError(p => "Available");
    }

    function onclickHandler(){
        setcPopupDisplay(p => "flex")
    }

    const usernameHandler = (e) => {
        setUsername(p => e.target.value)
    }



    return <div className={classes.container}>

             <header className={classes.header}>
                 <img src={menu} alt="menu" className={classes.img} onClick={openNotification} />
             </header>

             <div className={classes.subContainer}>
             <h1 className={classes.heading}>Search the availability of your link</h1>

             <p className={classes.content}>Search and buy available domain names</p>
             <p className={classes.condition}>Minimum 8 character, Only lowercase alphanumeric hyphens and underscores are allowed.</p>

             <form className={classes.form} onSubmit={formSubmitHandler}>
                <input type='text' className={classes.input} placeholder="Search here" value={username} onChange={usernameHandler} />
                <button className={classes.button}>Search</button>
             </form>

             <p className={classes.condition} style={{marginTop: "3rem"}}>
             Link will get approved, subjected to KYC verification
             </p>

             <p className={classes.error} style={{color: errorColor}}>{error}</p>

             <button style={{display: bookLinkDisplay}} className={classes.booklink} onClick={onclickHandler}>Apply Now</button>
             </div>

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


             {/* popup */}

             <div className={classes.popup} style={{display: popupDisplay}}>

                <div className={classes.pop}>
                    <p>Make sure the link you are searching should have KYC.</p>
                    <p>Only KYC approved links are available</p>

                    <img className={classes.xicon} alt="close" src={xicon} onClick={()=> setPopupDisplay("none")} />
                </div>
             </div>

             {/* Completepopup */}

             <div className={classes.popup} style={{display: cpopupDisplay}}>

                <div className={classes.pop}>
                    <p>We’ve got your request.</p>
                    <p>We will contact you later.</p>
                    <p>After confirming that the link can be given. </p>

                    <img className={classes.xicon} alt="close" src={xicon} onClick={()=> navigate("/")} />
                </div>
             </div>

             <div className={classes.footer}><Footer /></div>

           </div>
}