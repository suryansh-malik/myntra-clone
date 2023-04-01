import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {  useDispatch } from "react-redux";
import Navbar from "../Homepage/Navbar/Navbar";
import useValidation from "./Formvalidation/Formvalidation";
import "./login.css";
import { authenticate, resmessage, user, wishlist } from "../../store/store";

const Login = () => {
  const dispatch = useDispatch();
  const [error, seterror] = useState(false);
  const [errorcontent, seterrorcontent] = useState("");

  // ======================//
  // validating login form 
  // ======================//
  const {
    inputisvalid: emailisvalid,
    inputvalueentered: emailentered,
    inputblur: emailblur,
    inputvalue: loginemail,
    // touched: emailtouched,
    formsubmit: emailinputtouched,
    reset: emailinputreset,
    classname: emailclass,
  } = useValidation((value) => value.includes("@"));
  const {
    inputisvalid: passwordvalid,
    inputvalueentered: passwordentered,
    inputblur: passwordblur,
    inputvalue: loginpassword,
    // touched: passwordtouched,
    formsubmit: passowrdinputtouched,
    reset: passwordinputreset,
    classname: passwordclassname,
  } = useValidation((value) => value.length > 8);
  const navigate = useNavigate();
  const formvalid = emailisvalid && passwordvalid;

  // ======================//
  // login form submission
  // ======================//
  const loginformsubmitted = async (event) => {
    event.preventDefault();

    if (formvalid) {
      const response = await fetch(`${process.env.MYNTRA_CLONE_BACKEND}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: loginemail,
          password: loginpassword,
        }),
      });
      const res = await response.json();
      if (response.ok) {
        localStorage.setItem("token", res.token);
        const users = JSON.stringify(res.data);
        console.log(res.data);
        const wishlistdata = JSON.stringify(res.data.wishlist);
        localStorage.setItem("wishlist", wishlistdata);
        const saveuser = JSON.parse(users);
        localStorage.setItem("user", users);
        dispatch(user.setuser(saveuser));
        dispatch(wishlist.setwishlist(res.data.wishlist));
        dispatch(authenticate.setauthenticate(true));
        localStorage.setItem("cart", JSON.stringify(res.data.cart));
        dispatch(resmessage.setmessage("login successfully"));
        dispatch(resmessage.setshowmessage(true));
        setTimeout(() => {
          dispatch(resmessage.setshowmessage(false));
        }, "3000");
        emailinputreset();
        passwordinputreset();

        navigate("/");
      } else if (response.status === 401) {
        console.log("error");
        seterror(true);
        seterrorcontent("Email and password doesn't matched");
      }
    } else {
      emailinputtouched();
      passowrdinputtouched();
    }
  };
  return (
    <>
      <Navbar />
      <div className="login-page-background">
        {error && (
          <div className="form-error">
            <div className="form-error-content">{errorcontent}</div>
          </div>
        )}
        <div className="login-main-content">
          <div className="login-content-container">
            <div className="login-form-container">
              <div className="login-heading">Login to your account</div>
              <form className="login-form" onSubmit={loginformsubmitted}>
                <input
                  className={emailclass}
                  type="email"
                  name="email"
                  onChange={emailentered}
                  placeholder="Enter your email"
                  onBlur={emailblur}
                  value={loginemail}
                ></input>
                <input
                  value={loginpassword}
                  className={passwordclassname}
                  type="password"
                  onChange={passwordentered}
                  placeholder="Password"
                  onBlur={passwordblur}
                  name="password"
                ></input>
                <button type="submit">LOGIN</button>
              </form>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="login-form-signup-button">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
