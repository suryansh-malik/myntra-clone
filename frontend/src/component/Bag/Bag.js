import "./Bag.css";
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import Bagproduct from "./Bagproduct";
import { bagproduct } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Bag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ======================//
  // bag price calculations
  // ======================//

  const bagproducts = useSelector((state) => state.bagproduct.products);
  let bagMRPrice = 0;
  let bagdiscountprice = 0;
  let bagpayableamount = 0;
  let numberofproduct = 0;
  bagproducts.forEach((p) => numberofproduct++);
  bagproducts.forEach(
    (product) =>
      (bagMRPrice =
        bagMRPrice + product.actualprice * 1 * (product.quantity * 1))
  );
  bagproducts.forEach(
    (product) =>
      (bagpayableamount =
        bagpayableamount + product.baseprice * 1 * (product.quantity * 1))
  );
  bagdiscountprice = bagMRPrice - bagpayableamount;
  // ======================//
  // fetching bag product
  // ======================//
  const fetching = () => {
    fetch(`${process.env.MYNTRA_CLONE_BACKEND}/cart`, {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => {
      res.json().then((res) => {
        dispatch(bagproduct.setbagproduct(res));
      });
    });
  };
  useEffect(() => {
    fetching();
  });
  // ======================//
  // conditinally rendering data
  // ======================//
  let discount;
  if (bagdiscountprice > 0) {
    discount = (
      <div className="bag-discount-price">
        <FaRupeeSign className="rupees" />-{bagdiscountprice}
      </div>
    );
  } else {
    discount = (
      <div className="bag-discount-price">
        <FaRupeeSign className="rupees" />0
      </div>
    );
  }

  let product;
  if (bagproducts.length > 0) {
    product = true;
  } else {
    product = false;
  }



  const bagproductnumber = bagproducts.map((product) => (
    <Bagproduct
      productid={product.productid}
      quantity={product.quantity}
      image={product.image}
      brandname={product.brandname}
      productseller={product.sellername}
      baseprice={product.baseprice}
      actualprice={product.actualprice}
      offpercentage={product.offpercentage}
      productname={product.productname}
      producttype={product.producttype}
      key={product._id}
    />
  ));

  return (
    <div className="bag">
      <div className="bag-header">
        <div className="bag-header-content">
          <Link to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png?20210915004801"
              alt="imag"
            />
          </Link>
          <div className="checkout-steps"></div>
          <div className="security-batch">
            <img
              src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
              alt="imag"
            />
            <div className="bag-100secure">100% SECURE</div>
          </div>
        </div>
      </div>
      {bagproducts.length !== 0 ? (
        <div className="bag-container">
          <div className="bag-container-content">
            <div className="bag-container-left">
              <div className="check-deliver-address">
                <div className="address-pincode">
                  <div className="delivery-pincode">Deliver to:</div>
                </div>
                <button
                  onClick={fetching}
                  className="change-address-pincode-button"
                >
                  CHANGE ADDRESS
                </button>
              </div>
              <div className="check-available-offer">
                <div className="available-offer">Available Offers</div>
                <div className="offers-name">
                  <li>
                    10% Instant Discount on ICICI Bank Credit and Debit Cards on
                    a min spend of Rs 3,500.TCA
                  </li>
                  <button>Show more</button>
                </div>
              </div>
              <div className="check-deliver-fee">
                <div className="delivery-fee-svg">
                  <img
                    src="https://constant.myntassets.com/checkout/assets/img/ship-free.webp"
                    alt="a"
                  />
                </div>
                <div className="delivery-fee-updates">
                  yah! no convenience fee on this order.
                </div>
              </div>
              {product ? (
                bagproductnumber
              ) : (
                <p className="not-product">*Add Products </p>
              )}
            </div>
            <div className="bag-container-right">
              <div className="coupons">
                <div className="coupon-heading">COUPONS</div>
                <div className="apply-coupons">
                  <div className="apply-coupon-heading">Apply Coupons</div>
                  <button className="coupon-apply-button">APPLY</button>
                </div>
                <div className="coupons-name">
                  login to get upto ₹500 OFF on first order
                </div>
              </div>
              <div className="gifts">
                <div className="gifts-heading">GIFTING & PERSONAISATION</div>
                <div className="gifts-details">
                  <img
                    src="https://constant.myntassets.com/checkout/assets/img/gift-big.webp"
                    alt="img"
                  />
                  <div className="gifts-right-content">
                    <div className="gifts-content">
                      <h1>Buying for a loved ones</h1>
                      <p>
                        Gifts wrap and personalised message on card only for 25
                      </p>
                      <button>ADD GIFTS WRAP</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bag-product-price-container">
                <div className="price-heading">
                  Price Detail({numberofproduct} items)
                </div>
                <div className="total-mrp prices">
                  <div>Total MRP</div>
                  <div className="total-mrp-unit">
                    <FaRupeeSign className="rupees" />
                    {bagMRPrice}
                  </div>
                </div>
                <div className="discount-mrp prices">
                  <div>Discount on MRP</div>
                  <div className="bag-discount-price">{discount}</div>
                </div>
                <div className="coupon-discount prices">
                  <div>Coupon Discount</div>
                  <div className="price-apply-coupon">Apply Coupons</div>
                </div>
                <div className="convenience-fee prices">
                  <div>Convenience Fee</div>
                  <div className="delivery-satus-free">FREE</div>
                </div>
              </div>
              {product && (
                <div className="Total-amount-payable">
                  <div>Total Amount</div>
                  <div>
                    <FaRupeeSign className="rupees" />
                    {bagpayableamount}
                  </div>
                </div>
              )}

              {product ? (
                <button
                  type="submit"
                  className="bag-buy-now-button "
                >
                  BUY NOW WITH EARLY ACCESS
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={true}
                  className="bag-buy-now-button disabled"
                >
                  BUY NOW WITH EARLY ACCESS
                </button>
              )}
              {/* <button onClick={addproduct}>addproduct</button> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-bag-main-div">
          <div className="empty-bag-inner-content">
            <img
              className="empty-bag-image"
              src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
              alt="img"
            ></img>
            <div className="empty-bag-heading">Hey, it feels so light!</div>
            <div className="empty-bag-message">
              There is nothing in your bag. Let's add some items.
            </div>
            <div
              onClick={() => navigate("/wishlist")}
              className="empty-bag-to-wishlist-button"
            >
              add items from wishlist
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Bag;
