import Main from "./Components/chatBox/Main";
import BookLink from "./Components/Booklink/BookLink";
import LinkAvailability from "./Components/availability/LinkAvailability";
import BookLinkForm from "./Components/bookLinkForm/BookLinkForm";
import PaymentButton from "./Components/payment/Payment";
import OtpVerification from "./Components/OtpVerification/OtpVerification";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";


function App() {



  
  return (
    <div>
    <Router>
      <Routes>

        <Route exact path="/" element={<Main />} />

        <Route exact path="/booklink" element={<BookLink />} /> 

        <Route exact path="/available" element={<LinkAvailability />} />

        <Route exact path="/booklinkform" element={<BookLinkForm />} />

        <Route exact path="/payment" element={<PaymentButton label={"365"} />} />

        <Route exact path="/otpverify" element={<OtpVerification />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;
