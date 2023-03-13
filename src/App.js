import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { userUpdate, chatUpdate } from "./store/UserSlice";

import Main from "./Components/chatBox/Main";
import BookLink from "./Components/Booklink/BookLink";
import LinkAvailability from "./Components/availability/LinkAvailability";
import BookLinkForm from "./Components/bookLinkForm/BookLinkForm";
import PaymentButton from "./Components/payment/Payment";
import OtpVerification from "./Components/OtpVerification/OtpVerification";
import Protected from "./Components/protected/Protected";
import Login from "./Components/login/login";
import Form100Words from "./Components/1rupeePlan/Form100Words";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";


function App() {

  const dispatch = useDispatch();

  const [chat, setChat] = useState(null);

  useEffect(()=>{
    const email = localStorage.getItem("userToken");

    if(email){
      fetch("http://localhost:8080/api/finduser",{
        method: "POST",
        body: JSON.stringify({email}),
        headers:{
          "content-type": "application/json"
        }
      }).then(res => res.json())
      .then(res => JSON.parse(res))
      .then(res => {
        if(res.sucess){
          dispatch(userUpdate({...res.users}))
          setChat(p => res.users.chat)
        }
        else{
          chatUpdate({chat: {type: "reply", content: "Hello! How are you"}})
        }
      })

      setChat(p => [{type: "reply", content: "Hello! How are you"}])
    }
  },[])

  


  
  return (
    <div>
    <Router>
      <Routes>

        <Route exact path="/" element={
           (<Protected><Main /></Protected>) 
        } />

        <Route exact path="/booklink" element={<BookLink />} /> 

        <Route exact path="/available" element={<LinkAvailability />} />

        <Route exact path="/booklinkform" element={<BookLinkForm />} />

        <Route exact path="/payment" element={<PaymentButton label={"365"} />} />

        <Route exact path="/otpverify" element={<OtpVerification />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/form100" element={<Form100Words />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;
