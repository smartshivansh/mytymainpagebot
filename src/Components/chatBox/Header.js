import classes from "./Header.module.css"

import bellIcon from "../../assets/bellicon.svg"
import mytyLogo from "../../assets/mytyIcon.svg"

export default function Header(props){

    return <div className={classes.header}>
        <img src={mytyLogo} className={classes.img} alt="myty logo" />
        <img src={bellIcon} className={classes.img} alt="notification" onClick={props.onBellClick} />

       
    </div>
}