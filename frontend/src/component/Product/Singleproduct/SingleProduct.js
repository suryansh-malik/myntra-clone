import "./Singleproduct.css";
import { useNavigate} from "react-router-dom";
const Singleproduct = (props) => {
const navigate = useNavigate()

  const productclicked = () => {
  navigate(`${process.env.MYNTRA_CLONE_BACKEND}/product/${props.id}`)
}


  return (
    <div className="single-product-box" onClick={productclicked}>
      <img src={props.image} alt="hi" />
      <div className="single-product-details">
        <div className="single-product-brand-name">{props.brandname}</div>
        <div className="single-product-title">
          {props.productname.substring(0, 25)}...
        </div>
        <div className="single-product-price-details">
          <span className="single-product-actual-price">
            Rs {props.baseprice}
          </span>
          {props.offpercentage!=="0"?<span className="single-product-mrp-price">
            Rs. {props.actualprice}
          </span>:null}
          {props.offpercentage!=="0"?<span className="single-product-offpercentage">
            ({props.offpercentage} OFF)
          </span>:null}
        </div>
      </div>
    </div>
  );
};

export default Singleproduct;
