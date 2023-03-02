import { useState } from "react";

import classes from "./BookLinkForm.module.css";

import menu from "../../assets/menu.svg"
import backbtn from "../../assets/backbtn.svg"

import PaymentButton from "../payment/Payment";

import { loadRazorpayScript } from "../payment/Payment";
    

export default function BookLinkForm(){

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

    const [paymentDisplay, setPaymentDisplay] = useState("none")

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

        if(!accept){
          alert("please accept terms and condition");
          return;
        }

        if(mobile.length !== 10 || isNaN(mobile)){
          setMobileError(p => "Please enter a valid mobile No");
          return;
        }

        setPaymentDisplay(p=> "block")

        // loadRazorpayScript();
    }

    const paymentSucessHandler = () => {
      console.log("payment sucessfull")
    }

    return <div className={classes.container} onSubmit={formSubmitHandler}>

              <header className={classes.header}>
                 <img src={menu} alt="menu" className={classes.img} onClick={openNotification} />
              </header>

              <h1 className={classes.heading}>SignUp</h1>

              <form className={classes.form}>

                <p className={classes.fromHeading}>Your are just one step away from reserving your link </p>

                <input required type="text" className={classes.input} placeholder="Name" value={name} onChange={(e)=>{setName(p=>e.target.value)}} />
                <p style={{display: `${nameError == "" ? "none" : "block"}`}}  className={classes.error}>{nameError}</p>

                <input required type="email" className={classes.input} placeholder="E-mail" value={email} onChange={(e)=>{setEmail(p=>e.target.value)}}  />
                <p style={{display: `${emailError == "" ? "none" : "block"}`}} className={classes.error}>{emailError}</p>

                <input required type="tel" className={classes.input} placeholder="Phone number" value={mobile} onChange={(e)=>{setMobile(p=>e.target.value)}}  />
                <p style={{display: `${mobileError == "" ? "none" : "block"}`}} className={classes.error}>{mobileError}</p>
                
                <p className={classes.radio} >
                <input type='checkbox' style={{marginRight: "0.5rem", width: "1rem", height: "1rem"}} onChange={(e)=>{setAccept(p=>e.target.checked)}} />
                By creating an account you are agreeing to our <a target="_blank" href="https://myty.in/terms-conditions" className={classes.links}>Terms and Conditions</a> and <a target="_blank" href="https://myty.in/privacy-policy" className={classes.links}>Privacy Policy</a>
                </p>

                <button type="submit" className={classes.button}>Book Link</button>

                 
              </form>

              <div style={{display: paymentDisplay, margin: "auto"}}>
                <PaymentButton label="Pay Now 365" callback={paymentSucessHandler} />
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
          </div>
}