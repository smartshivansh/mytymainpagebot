import React, {useState} from "react";
import OTPInput from "otp-input-react";

import classes from "./OtpVerification.module.css";

export default function OtpVerification(){

    const [otp, setOtp] = useState("");

    function setOtpHandler(e){
        console.log(e.target.value)
    }

    return <div className={classes.container}>

        <form className={classes.form}>

            <p className={classes.heading}>OTP verification</p>

            <p className={classes.content}>Please enter the OTP we have sent on your registered mobile/email.</p>

            <div className={classes.otp}>
               <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" inputStyles={{width:"3rem", height:"3rem", fontSize:"1rem"}} inputClassName={classes.input} />
            </div>

            <a className={classes.resend}>Resend OTP</a>

        </form>

    </div>
}