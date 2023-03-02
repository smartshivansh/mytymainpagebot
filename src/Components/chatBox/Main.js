import Header from "./Header";
import classes from "./Main.module.css"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {setNotificationVisited} from "../../store/NotificationSlice"

import sendBtn from "../../assets/sendBtn.svg"
import backBtn from "../../assets/backbtn.svg"
import mytyIcon from "../../assets/mytyIcon.svg"

import SendBubble from "../msgBubbles/SendBubble";
import ReplyBubble from "../msgBubbles/ReplyBubble";
import NotificationBubble from "../msgBubbles/NotificationBubble";


import { socket } from "../Socket/Socket";

export default function Main(){

    const user = {
        prompt: ""
    }
    const dispatch = useDispatch()
    
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState([]);

    const [notfDisplay, setNotfDisplay] = useState("none");
    const [notfTransform, setNotfTransform] = useState("translateX(80%)")
    const [notfTransition, setNotfTransition] = useState("all 0.5s")
    const [notfOpacity, setNotfOpacity] = useState(0);

    const notifications = useSelector(s => s.notification.Notifications)

    const fromSubmitHandler = (e) =>{

        e.preventDefault();

        user.prompt = user.prompt + "Human:" + value + " " + "AI:"
        socket.emit("msgTextReq", {IPv4: "dummy", msg: value,  text: "Human:" + value + " " + "AI:"});

        setMessages(p => [...p, {type: "text", content: value}])
        setValue("");

        socket.on('msgTextRes', function(data) {
            user.prompt += user.prompt + data.response;
            setMessages(p => [...p, {type: "reply", content: data.response}])
            socket.off()
        });

        setInterval(()=>{
            socket.on();
        },1000)
    }

    const openNotification = () => {   
        setNotfDisplay(p => "block");
        setTimeout(()=>{
            setNotfTransform(p => "translateX(0%)")
            setNotfTransition(p => p)
            setNotfOpacity(p => 1)
        }, 100)
    }

    const closeNotification = () => {
        setNotfTransform(p => "translateX(80%)")
        setNotfTransition(p => p)
        setNotfOpacity(p => 0)
        dispatch(setNotificationVisited())
        setTimeout(()=>{
            setNotfDisplay(p => "none");
        }, 1000)
    }


    const inputChangeHandler = (e) => {
        setValue(p => e.target.value)
    }

    return <div className={classes.container}>
        <Header onBellClick={openNotification} />
        <div className={classes.main}>
            {messages.map(ele => {
                if(ele.type === "text"){
                    return <SendBubble>{ele.content}</SendBubble>
                }
                else if(ele.type === "reply"){
                    return <ReplyBubble>{ele.content}</ReplyBubble>
                }
            })}
        </div>
        <form className={classes.form} onSubmit={fromSubmitHandler}>
           <input type='text' className={classes.input} value={value} placeholder="Type text here" onChange={inputChangeHandler} />
           <button className={classes.sendBtn}><img src={sendBtn} alt="send" /></button>
        </form>

         {/* notification bar */}

         {/* //style={{opacity: notfOpacity ,transform: notfTransform, display: notfDisplay, transition: notfTransition}} */}

         <div className={classes.notification} style={{opacity: notfOpacity ,transform: notfTransform, display: notfDisplay, transition: notfTransition}} >

            <header className={classes.notificationHeader} >
                <img src={backBtn} className={classes.img} alt="back" onClick={closeNotification} style={{transform: "rotate(180deg"}} />
                <img src={mytyIcon} className={classes.img} alt="myty" />
            </header>

            <main className={classes.notificationMain}>
                {notifications.map(ele => {
                    return <NotificationBubble visited={ele.visited} title={ele.title} date={ele.date} content={ele.content} />
                })}
            </main>
            
         </div>
    </div>
}