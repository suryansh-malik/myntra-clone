import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wishlist } from "../../store/store";
import { BASE_URL } from '../../Baseurl';
const Wishlistproduct = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bagproduct = useSelector((state) => state.bagproduct.products);
  let productaddedtobag = false;
  bagproduct.forEach((p) => {
    if (p.productid === props.productid) {
      productaddedtobag = true;
    }
  });
  // ======================//
  // remove product from wishlist 
  // ======================//
  const removewishlist = async () => {
    const response = await fetch(`${BASE_URL}/removefromwishlist`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        product: props.productid,
      }),
    });
    if (response.ok) {
      dispatch(wishlist.removewishlist(props.productid));
      const wishlitlocalstorage = JSON.parse(localStorage.getItem("wishlist"));
      const filterwishlist = wishlitlocalstorage.filter(
        (p) => p.productid !== props.productid
      );
      localStorage.setItem("wishlist", JSON.stringify(filterwishlist));
    }
  };

  const productclicked = () => {
    navigate(`/product/${props.productid}`);
  };

  return (
    <>
      <div className="wishlist-product-main-div">
        <div className="wishlit-product-inner-main-content">
          <svg
            onClick={removewishlist}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="wishlist-remove-product"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
            </g>
          </svg>
          <div className="wishlit-product-image-div" onClick={productclicked}>
            <img
              className="wishlist-product-image"
              src={props.image}
              alt="img"
            ></img>
          </div>
          <div className="wishist-product-name-div">
            {props.productname.substring(0, 22)}...
          </div>
          <div className="wishlist-product-pricing-div">
            <div className="wishlist-product-actual-price">
              Rs.{props.baseprice}
            </div>
            {props.offpercentage !== "0" ? (
              <div className="wishlist-product-mrp-price">
                Rs.{props.actualprice}
              </div>
            ) : null}
            {props.offpercentage !== "0" ? (
              <div className="wishlist-product-off-percentage">
                ({props.offpercentage} OFF)
              </div>
            ) : null}
          </div>
          {!productaddedtobag ? (
            <div
              onClick={productclicked}
              className="wishlist-product-move-to-bag-div"
            >
              MOVE TO BAG
            </div>
          ) : (
            <div
              onClick={() => navigate("/bag")}
              className="wishlist-product-move-to-bag-div"
            >
              GO TO BAG
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Wishlistproduct;
