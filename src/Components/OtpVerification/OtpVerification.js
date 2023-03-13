import React, {useState} from "react";
import OTPInput from "otp-input-react";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import classes from "./OtpVerification.module.css";

import xicon from "../../assets/xicon.svg"

export default function OtpVerification(){

    const [otp, setOtp] = useState("");
    const [popDisplay, setPopDisplay] = useState("none")

    const email = localStorage.getItem("userToken")

    const navigate = useNavigate();

    function closePopHandler(){
        navigate("/");
    }

    function bookLinkHandler(){
        navigate("/available");
    }

    function formSubmitHadler(e){
        e.preventDefault();

        try {

            fetch("http://localhost:8080/api/otpverify", {
                method: "POST",
                body: JSON.stringify({email, otp}),
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => res.json())
            .then(res => JSON.parse(res))
            .then(res => {
                if(res.sucess){
                    setPopDisplay(p => "flex")
                }
            })
            
        } catch (error) {
            console.log(error)
        }
        
    }

    return <div className={classes.container}>

        <form className={classes.form} onSubmit={formSubmitHadler}>

            <p className={classes.heading}>OTP verification</p>

            <p className={classes.content}>Please enter the OTP we have sent on your registered mobile/email.</p>

            <div className={classes.otp}>
               <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" inputStyles={{width:"3rem", height:"3rem", fontSize:"1rem"}} inputClassName={classes.input} />
               
            </div>

            <button type="submit" className={classes.book} style={{marginTop: "2rem"}}>Submit OTP</button>

            <button className={classes.resend}>Resend OTP</button>

        </form>

        <div className={classes.popup} style={{display: popDisplay}}>

            <div className={classes.pop}>
                <div style={{textAlign: "center"}}>
                   <p>Sign Up completed.</p>
                   <p>Do you want to book your myty link.</p>
                </div>

                <div className={classes.buttoncont}>
                    <button className={classes.maybe} onClick={closePopHandler}>May be later</button>
                    <button className={classes.book} onClick={bookLinkHandler}>Book now</button>
                </div>

                <img src={xicon} alt="close" className={classes.xicon} onClick={closePopHandler} />
            </div>

        </div>

    </div>
}