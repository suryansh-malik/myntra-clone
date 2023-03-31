import {useEffect, useState} from 'react'
import {  useNavigate, useParams } from "react-router-dom";
import Navbar from "../Homepage/Navbar/Navbar";
import { bagproduct, resmessage } from '../../store/store';
import { useSelector,useDispatch } from 'react-redux';
import "./Productdetail.css";
import { HiOutlineShoppingBag } from "@react-icons/all-files/hi/HiOutlineShoppingBag";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
// BiRightArrowAlt;
import { wishlist } from '../../store/store';

const Productdetails = () => {
  const dispatch = useDispatch();
  let productadded = false;
  let wishlisted = false;
  const storebagproduct = useSelector((state) => state.bagproduct.products);
  const wishlistproduct = useSelector((state) => state.wishlist.wishlist);
  const auth = useSelector((state) => state.authenticate.authenticate);
  const navigate = useNavigate();
  const [product, setproduct] = useState("");
  const [loading, setloading] = useState("");
  const { ppp } = useParams();
  // ======================//
  // fetching all details about one products
  // ======================//
  const fetchingproduct = async () => {
    setloading(true);
    const response = await fetch(`/product/${ppp}`, {
      method: "GET",
      headers: {
        "content-type": "appliation/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setproduct(data);
      setloading(false);
    }
    if (response.status === 409) {
      navigate("/*");
    }
  };

  // ======================//
  // checking product already on bag or not
  // ======================//
  storebagproduct.forEach((p) => {
    if (p.productid === product._id) {
      productadded = true;
    }
  });
  // ======================//
  // checking product already on wishlist or not
  // ======================//
  wishlistproduct.forEach((products) => {
    if (products.productid === product._id) {
      wishlisted = true;
    }
  });
  useEffect(() => {
    fetchingproduct();
  }, [ppp]);
  const addtobag = async () => {
    const addedproduct = {
      quantity: 1,
      productid: product._id,
      image: product.image,
      brandname: product.brandname,
      productname: product.productname,
      sellername: product.sellername,
      baseprice: product.baseprice,
      actualprice: product.actualprice,
      offpercentage: product.offpercentage,
      producttype: product.producttype,
    };
    // ======================//
    // add product to bag
    // ======================//
    if (auth) {
      const response = await fetch("/addtocart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          product: addedproduct,
        }),
      });
      if (response.ok) {
        console.log("product successfully added");
        dispatch(bagproduct.addbagproduct(addedproduct));
        const localbagproduct = JSON.parse(localStorage.getItem("cart"));
        const filterproducts = [...localbagproduct, addedproduct];
        localStorage.setItem("cart", JSON.stringify(filterproducts));
        dispatch(resmessage.setmessage("added to bag"));
        dispatch(resmessage.setshowmessage(true));
        setTimeout(() => {
          dispatch(resmessage.setshowmessage(false));
        }, "3000");
      }
    } else {
      navigate("/login");
    }
  };
  // ======================//
  // add product to wishlist
  // ======================//
  const addtowishlist = async () => {
    if (auth) {
      const wishlistdata = {
        productid: product._id,
        image: product.image,
        baseprice: product.baseprice,
        actualprice: product.actualprice,
        offpercentage: product.offpercentage,
        productname: product.productname,
      };
      const response = await fetch("/addtowishlist", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          product: wishlistdata,
        }),
      });
      if (response.ok) {
        dispatch(wishlist.addtowishlist(wishlistdata));
        const localwishlistdata = JSON.parse(localStorage.getItem("wishlist"));
        const filteredwishlist = [...localwishlistdata, wishlistdata];
        localStorage.setItem("wishlist", JSON.stringify(filteredwishlist));
        dispatch(resmessage.setmessage("added to wishlist"));
        dispatch(resmessage.setshowmessage(true));
        setTimeout(() => {
          dispatch(resmessage.setshowmessage(false));
        }, "3000");
      }
      const result = await response.json();
      console.log(result);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />

      {!loading ? (
        <div className="product-detail-main-container">
          <div className="productdetail-section">
            <div className="productdetail-image-comtainer">
              <img src={product.detailimage1} alt="imag" />
              <img src={product.detailimage2} alt="imag" />
            </div>
            <div className="productdetail-content-section">
              <div className="productdetail-content">
                <div className="productdetail-brandname">
                  {product.brandname}
                </div>
                <div className="productdetail-name">{product.productname}</div>
                <div className="productdetail-rating-container">
                  <div className="productdetail-rating-content">
                    <div className="productdetail-rating-number">4.3</div>
                    <div className="rating-separator">|</div>
                    <div className="productdetail-total-rating-number">
                      969 Ratings
                    </div>
                  </div>
                </div>
                <div className="productdetail-price-container">
                  <div className="productdetail-baseprice">
                    <div>
                      <FaRupeeSign className="rupees-logo-baseprice" />
                    </div>
                    <div className="baseprice-detail">{product.baseprice}</div>
                  </div>
                  {product.offpercentage !== "0" ? (
                    <span className="prductdetail-MRP-heading">MRP</span>
                  ) : null}
                  {product.offpercentage !== "0" ? (
                    <div className="prductdetail-actual-price">
                      <div>
                        <FaRupeeSign className="rupees-logo-actualprice" />
                      </div>
                      <div className="productdetail-actual-price-number">
                        {product.actualprice}
                      </div>
                    </div>
                  ) : null}
                  {product.offpercentage !== "0" ? (
                    <span className="prductdetail-offpercentage">
                      ({product.offpercentage} OFF)
                    </span>
                  ) : null}
                </div>
                <p className="taxes-text">inclusive of all taxes</p>
                <div className="size-selection-div">
                  {/* <div className="size-selection-heading">
                    <div className="select-size-heading1">SELECT SIZE</div>
                    <div className="select-size-heading2">(UK size)</div>
                  </div> */}
                  {/* <div className="size-selection-choices">
                    <div className="size-selection-options">6</div>
                    <div className="size-selection-options">7</div>
                    <div className="size-selection-options">8</div>
                    <div className="size-selection-options">9</div>
                    <div className="size-selection-options">10</div>
                    <div className="size-selection-options">11</div>
                    <div className="size-selection-options">12</div>
                  </div> */}
                  <div className="buttons-wishlist-cart">
                    {!productadded ? (
                      <button onClick={addtobag} className="add-to-cart-button">
                        <HiOutlineShoppingBag className="add-to-bag-png" />
                        ADD TO BAG
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/bag")}
                        className="add-to-cart-button"
                      >
                        {/* <HiOutlineShoppingBag className="add-to-bag-png" /> */}
                        GO TO BAG
                        <FiArrowRight className="add-to-arrow-png" />
                      </button>
                    )}
                    {!wishlisted ? (
                      <div
                        className="wishlist-button"
                        onClick={addtowishlist}
                        style={{ cursor: "pointer" }}
                      >
                        <svg
                          role="img"
                          height="16"
                          width="16"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          data-encore-id="icon"
                          className="current-playing-song-like-button-svg"
                        >
                          <path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path>
                        </svg>
                        wishlist
                      </div>
                    ) : (
                      <div
                        className="wishlist-button"
                        style={{ backgroundColor: "#535766", color: "white" }}
                      >
                        <svg
                          // onClick={songdisliked}
                          role="img"
                          height="16"
                          width="16"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          data-encore-id="icon"
                          className="liked-current-song"
                          style={{ fill: "#ff3f6c" }}
                        >
                          <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
                        </svg>
                        wishlisted
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default Productdetails;
