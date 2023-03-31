import { useState } from "react";
import {  useNavigate,Link } from "react-router-dom";
import Navbar from "../Homepage/Navbar/Navbar";
import "./signup.css";
import useValidation from "./Formvalidation/Formvalidation"
import { resmessage } from "../../store/store";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [error, seterror] = useState(false);
  // ======================//
  // validating signup form data
  // ======================//
  let {
    inputisvalid: emailisvalid,
    inputvalueentered: emailentered,
    inputblur: emailblur,
    inputvalue: signupemail,
    formsubmit: emailinputtouched,
    // reset: emailinputreset,
    classname: emailclassname,
  } = useValidation((value) => value.includes("@"));
  const {
    inputisvalid: firstnameisvalid,
    inputvalueentered: firstnameentered,
    inputblur: firstnameblur,
    inputvalue: firstname,
    formsubmit: firstnametouched,
    // reset: firstnaereset,
    classname: firstnameclassname,
  } = useValidation((value) => value.trim() !== "");
  const {
    inputisvalid: passwordisvalid,
    inputvalueentered: passwordentered,
    inputblur: passwordblur,
    inputvalue: signuppassword,
    formsubmit: passwordtouched,
    // reset: passwordreset,
    classname: passwordclassname,
  } = useValidation((value) => value.length > 8);
  const {
    inputisvalid: lastnameisvalid,
    inputvalueentered: lastnameentered,
    inputblur: lastnameblur,
    inputvalue: lastname,
    formsubmit: lastnametouched,
    // reset: lastnamereset,
    classname: lastnameclassname,
  } = useValidation((value) => value.trim() !== "");
  const {
    inputisvalid: confirmpasswordisvalid,
    inputvalueentered: confirmpasswordentered,
    inputblur: confirmpasswordblur,
    formsubmit: confirmpasswordtouched,
    // inputvalue: confirmpassword,
    // reset: confirmpasswordreset,
    classname: confirmpasswordclassname,
  } = useValidation(
    (value) => value.trim() === signuppassword && value.trim() !== ""
  );
  const formisvalid =
    confirmpasswordisvalid &&
    lastnameisvalid &&
    passwordisvalid &&
    firstnameisvalid &&
    passwordisvalid &&
    firstnameisvalid &&
    emailisvalid;

  const touched = () => {
    emailinputtouched();
    passwordtouched();
    firstnametouched();
    lastnametouched();
    confirmpasswordtouched();
  };
  
  // ======================//
  // singup form submission
  // ======================//

  const signupformsubmitted = async (event) => {
    event.preventDefault();
    if (formisvalid) {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: signupemail,
          password: signuppassword,
        }),
      });

      if (response.ok) {
        Navigate("/login");
        dispatch(resmessage.setmessage("account created"));
        dispatch(resmessage.setshowmessage(true));
        setTimeout(() => {
          dispatch(resmessage.setshowmessage(false));
        }, "3000");
      } else if (response.status === 401) {
        seterror(true);
      }
    } else {
      touched();
    }
  };
  if (error) {
    emailclassname = "invalid-input";
  }

  return (
    <>
      <Navbar />
      <div className="signup-page-background">
        <div className="signup-main-content">
          <div className="signup-content-container">
            <div className="signup-form-container">
              <div className="signup-heading">Signup for new account</div>
              <form className="signup-form" onSubmit={signupformsubmitted}>
                <input
                  name="firstname"
                  type="text"
                  onChange={firstnameentered}
                  placeholder="Enter your first name"
                  onBlur={firstnameblur}
                  className={firstnameclassname}
                ></input>
                <input
                  name="lastname"
                  className={lastnameclassname}
                  onBlur={lastnameblur}
                  type="text"
                  onChange={lastnameentered}
                  placeholder="Enter your last name"
                ></input>
                <input
                  name="email"
                  onBlur={emailblur}
                  type="email"
                  className={emailclassname}
                  onChange={emailentered}
                  placeholder="Enter your email"
                ></input>
                <input
                  className={passwordclassname}
                  type="password"
                  onChange={passwordentered}
                  placeholder="Password"
                  onBlur={passwordblur}
                ></input>
                <input
                  className={confirmpasswordclassname}
                  onBlur={confirmpasswordblur}
                  type="password"
                  onChange={confirmpasswordentered}
                  placeholder="Confirm Password"
                ></input>
                <button type="submit">SIGNUP</button>
              </form>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="signup-form-login-button">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
