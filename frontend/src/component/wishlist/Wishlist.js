import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Homepage/Navbar/Navbar";
import "./Wishlist.css"
import Wishlistproduct from "./Wishlistproduct"
const Wishlist = () => {
  const navigate = useNavigate()
    const wishlist = useSelector((state) => state.wishlist.wishlist)
  const wishlisproduct = wishlist.map((product) => <Wishlistproduct image={product.image} productname={product.productname} actualprice={product.actualprice} baseprice={product.baseprice} productid={product.productid} offpercentage={product.offpercentage} key={product.productid} />)
  const continueclicked = () => {
    navigate("/")
  }
    return (
      <>
        <Navbar />
        {wishlist.length !== 0 ? (
          <div className="wishlist-main-page">
            <div className="wishlist-man-content-page">
              <h3 className="wishlist-heading">
                My Wishlist
                <span className="wishlist-heading-item-number">
                  {" "}
                  {wishlist.length} items
                </span>
              </h3>
              <div className="wishlist-product-container">{wishlisproduct}</div>
            </div>
          </div>
        ) : (
          <div className="empty-wishlist-main-div">
            <div className="empty-wishlist-inner-div">
              <div className="empty-wishlist-main-heading">
                YOUR WISHLIST IS EMPTY
              </div>
              <div className="empty-wishlist-message">
                Add items that you like to your wishlist. Review<br></br>them
                anytime and easily move them to the bag.
              </div>
              <img className="empty-wishlist-image"src="https://constant.myntassets.com/web/assets/img/11488523304066-search404.png" alt="img"></img>
              <div onClick={continueclicked} className="continue-shopping-button">continue shopping</div>
            </div>
          </div>
        )}
      </>
    );
}
export default Wishlist 