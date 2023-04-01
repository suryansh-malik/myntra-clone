import { useState , useEffect} from 'react';
import "./Bagproduct.css";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";
import { useDispatch } from "react-redux"
import { bagproduct } from '../../store/store'
import { FaRupeeSign } from "@react-icons/all-files/fa/FaRupeeSign";
import { useNavigate } from 'react-router-dom';


const Bagproduct = (props) => {
  const navigate = useNavigate();
  const [quantity, setquantity] = useState(props.quantity);
  const dispatch = useDispatch();

  // ======================//
  // remove product from bag
  // ======================//
  const removeproducts = async () => {
    const response = await fetch(`${process.env.MYNTRA_CLONE_BACKEND}/cartproductremove`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        productid: props.productid,
      }),
    });
    if (response.ok) {
      dispatch(bagproduct.removeproduct(props.productid));
      const bagproducts = JSON.parse(localStorage.getItem("cart"));
      const filterbagproduct = bagproducts.filter(
        (p) => p.productid !== props.productid
      );
      localStorage.setItem("cart", JSON.stringify(filterbagproduct));
    }
  };
  // ======================//
  // on changing product quantity
  // ======================//
  const quantitychanged = async (event) => {
    const data = {
      productid: props.productid,
      quantity: event.target.value,
    };
    dispatch(bagproduct.quantitychange(data));
    setquantity(event.target.value);
    const response = await fetch(`${process.env.MYNTRA_CLONE_BACKEND}/quantitychanged`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        productid: props.productid,
        quantity: event.target.value,
      }),
    });
    if (response.ok) {
      console.log("changed");
    }
  };
  useEffect(() => {
    setquantity(props.quantity);
  }, [props.quantity]);
  // ======================//
  // conditionally rendering data
  // ======================//
  let size;
  const productype = props.producttype;
  if (productype === "cloths") {
    size = (
      <div>
        <label> Size:</label>
        <select name="bag-product-size" id="bag-product-size">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    );
  } else if (productype === "shoes") {
    size = (
      <div>
        <label> Size:</label>
        <select name="bag-product-size" id="bag-product-size">
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
      </div>
    );
  }
  return (
    <div className="bag-product">
      <div
        className="bag-product-image"
        onClick={() => navigate(`/product/${props.productid}`)}
      >
        <img src={props.image} alt="img"></img>
      </div>
      <div className="bag-product-details">
        <div className="bag-product-brand">{props.brandname}</div>
        <div className="bag-product-name">{props.productname}</div>
        <div className="bag-product-seller">
          sold by : {props.productseller}
        </div>

        <div className="bag-product-size-quantity">
          {productype === "cloths" ? (
            <div className="bag-product-size">{size}</div>
          ) : null}
          <div className="bag-product-quantity">
            <label>Qty:</label>
            <select
              name="bag-product-quantity"
              id="bag-product-quantity"
              onChange={quantitychanged}
              value={quantity}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="bag-product-price">
          <div className="bag-product-base-price">
            <FaRupeeSign className="bag-product-rupees" />
            {props.baseprice}
          </div>
          {props.offpercentage !== "0" ? (
            <div className="bag-product-actual-price">
              <FaRupeeSign className="rupees" />
              {props.actualprice}
            </div>
          ) : null}
          {props.offpercentage !== "0" ? (
            <div className="bag-product-off-percentage">
              ({props.offpercentage} OFF)
            </div>
          ) : null}
        </div>
      </div>
      <div className="bag-product-remove-button">
        <RiCloseLine onClick={removeproducts} />
      </div>
    </div>
  );
};

export default Bagproduct;
