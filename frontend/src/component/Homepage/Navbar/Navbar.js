import React, { useState } from "react";
// import { Transition } from "react-transition-group";
import "./Navbar.css";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { HiOutlineShoppingBag } from "@react-icons/all-files/hi/HiOutlineShoppingBag";
import Dropdown from "../Dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { hoverstate,gender } from "../../../store/store";
import { authenticate } from "../../../store/store";
import Men from "./Men/Men";
import Women from "./Women/Women";
import Beauty from "./Beauty/Beauty";
import Homeliving from "./Homeliving/Homeliving";
import Kids from "./Kids/Kids";
import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = useSelector((state) => state.authenticate.authenticate);
  const bagproducts = useSelector((state) => state.bagproduct.products);
  const hoverstat = useSelector((state) => state.hover.hover);
  const [profilehover, setprofilehover] = useState(false);
  const menu = useSelector((state) => state.hover.content);
  const dispatch = useDispatch();
  const clickedhappen = async (event) => {
    fetch("/home", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((result) => {
      result.json().then((result) => {
        console.log(result);
        console.log("hi");
      });
    });
  };

  // ======================//
  // conditinally render navbar menu hover data
  // ======================//
  let content;
  if (menu === "men") {
    content = <Men />;
  } else if (menu === "women") {
    content = <Women />;
  } else if (menu === "home") {
    content = <Homeliving />;
  } else  if (menu === "kids") {
    content = <Kids />;
  } else if (menu === "beauty") {
    content = <Beauty />;
  }
  //  men hover
  const menhoveron = () => {
    dispatch(hoverstate.sethovertrue(true));
    dispatch(hoverstate.mencontent());
  };
  const menhoveroff = () => {
    dispatch(hoverstate.sethovertrue(false));
  };

  // women hover
  const womenhoveron = () => {
    dispatch(hoverstate.sethovertrue(true));
    dispatch(hoverstate.womencontent());
  };
  const womenhoveroff = () => {
    dispatch(hoverstate.sethovertrue(false));
  };
  //kids hover
  const kidshoveron = () => {
    dispatch(hoverstate.sethovertrue(true));
    dispatch(hoverstate.kidscontent());
  };
  const kidshoveroff = () => {
    dispatch(hoverstate.sethovertrue(false));
  };

  //home and living hover
  const homehoveron = () => {
    dispatch(hoverstate.sethovertrue(true));
    dispatch(hoverstate.homelivingcontent());
  };
  const homehoveroff = () => {
    dispatch(hoverstate.sethovertrue(false));
  };
  //beauty hover
  const beautyhoveron = () => {
    dispatch(hoverstate.sethovertrue(true));
    dispatch(hoverstate.beautycontent());
  };
  const beautyhoveroff = () => {
    dispatch(hoverstate.sethovertrue(false));
  };
  //studio hover


  const profilehoveron = () => {
    setprofilehover(true);
  };
  const profilehoveroff = () => {
    setprofilehover(false);
  };
  const logouthandler = () => {
    localStorage.removeItem("token");
    dispatch(authenticate.setauthenticate(false));
  };
  let profilecontent;
  if (profilehover) {
    if (!auth) {
      profilecontent = (
        <div
          className="profile-hover-section"
          onMouseEnter={() => setprofilehover(true)}
          onMouseLeave={() => setprofilehover(false)}
        >
          <div className="profile-hover-content">
            <div className="profile-hover-welcome">Welcome</div>
            <p>To access account details and products</p>
            <div>
              <Link to="/login" className="login-button">
                LOGIN
              </Link>
            </div>
            <br></br>
            <div>
              <Link to="/signup" className="signup-button">
                SIGNUP
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      const data = localStorage.getItem("user");
      const firstname = JSON.parse(data).firstname;
      const lastname = JSON.parse(data).lastname;
      profilecontent = (
        <div
          className="profile-hover-section"
          onMouseEnter={() => setprofilehover(true)}
          onMouseLeave={() => setprofilehover(false)}
        >
          <div className="profile-hover-content">
            <div className="profile-hover-welcome">Welcome</div>
            <p>
              {firstname} {lastname}
            </p>
            <div onClick={logouthandler}>
              <Link to="/login" className="login-button">
                Logout
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
  // ======================//
  // display data after hover
  // ======================//
  let displaycontent;
  displaycontent = <Dropdown cont={content} />;
  return (
    <div className="fullnav">
      <div className="navbar">
        <div className="nav-content">
          <div className="leftnav">
            <div className="logo">
              <Link to="/">
                {" "}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png?20210915004801"
                  alt="img"
                />
              </Link>
            </div>
            <div className="menu">
              <ul>
                <li onMouseEnter={menhoveron} onMouseLeave={menhoveroff}>
                  <Link
                    to="/products/men"
                    onClick={() => dispatch(gender.setgender("men"))}
                    className="menus menu-men"
                  >
                    MEN
                  </Link>
                </li>
                <li onMouseEnter={womenhoveron} onMouseLeave={womenhoveroff}>
                  <Link
                    to="/products/women"
                    className="menus menu-women"
                    onClick={() => dispatch(gender.setgender("women"))}
                  >
                    WOMEN
                  </Link>
                </li>
                <li onMouseEnter={kidshoveron} onMouseLeave={kidshoveroff}>
                  <Link to="/products/kids" className="menus menu-kids">
                    KIDS
                  </Link>
                </li>
                <li onMouseEnter={homehoveron} onMouseLeave={homehoveroff}>
                  <Link
                    to="/products/home&living"
                    className="menus menu-homeliving"
                  >
                    HOME & LIVING
                  </Link>
                </li>
                <li onMouseEnter={beautyhoveron} onMouseLeave={beautyhoveroff}>
                  <Link to="/products/beauty" className="menus menu-beauty">
                    BEAUTY
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="rightnav">
            <div className="search">
              <BiSearch className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="Search for product brands and more"
              />
            </div>
            <div
              className="profile right-menu"
              onClick={clickedhappen}
              onMouseEnter={profilehoveron}
              onMouseLeave={profilehoveroff}
            >
              <CgProfile className="right-icons" />
              <p>Profile</p>
            </div>
            <Link to="/wishlist" className="wishlist right-menu">
              <AiOutlineHeart className="right-icons" />
              <p>Wishlist</p>
            </Link>
            <div>
              <Link to="/bag" className="bag-icon right-menu">
                <HiOutlineShoppingBag className="right-icons" />
                {bagproducts.length > 0 && auth ? (
                  <span className="bag-product-number">
                    {bagproducts.length}
                  </span>
                ) : null}
                <p>Bag</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {profilecontent}
      {/* <Transition in={hoverstat} mountOnEnter unmountOnExit timeout={50}> */}
      {hoverstat ? displaycontent : null}
      {/* </Transition> */}
    </div>
  );
};

export default Navbar;
