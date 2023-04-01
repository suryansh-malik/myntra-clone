import { useEffect, useState,useCallback } from "react";
import {useSelector,useDispatch} from 'react-redux'
import "./Product.css";
import Navbar from "../Homepage/Navbar/Navbar";
import Singleproduct from "./Singleproduct/SingleProduct";
import {mainproduct} from '../../store/store'
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { gendername } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state) => state.mainproduct.products);

  // ======================//
  // sorting product on basic of from input value
  // ======================//
  const sorting = (event) => {
    if (event.target.value === "low") {
      const sortedproducts = products
        .slice()
        .sort((a, b) => a.baseprice - b.baseprice);
      dispatch(mainproduct.setproduct(sortedproducts));
    }
    if (event.target.value === "high") {
      const sortedproducts = products
        .slice()
        .sort((a, b) => b.baseprice - a.baseprice);
      dispatch(mainproduct.setproduct(sortedproducts));
    }
    if (event.target.value === "a-z") {
      const sortedproducts = products
        .slice()
        .sort((a, b) => a.overviewname.localeCompare(b.overviewname));
      dispatch(mainproduct.setproduct(sortedproducts));
    }
    if (event.target.value === "z-a") {
      const sortedproducts = products
        .slice()
        .sort((a, b) => b.overviewname.localeCompare(a.overviewname));
      dispatch(mainproduct.setproduct(sortedproducts));
    }
  };
  // ======================//
  // fetching products on basic of current url parameter
  // ======================//

  const fetching = useCallback(async () => {
    setloading(true);
    const response = await fetch(
      `${process.env.MYNTRA_CLONE_BACKEND}/products/${gendername}`,
      {
        method: "GET",
        "Content-Type": "application/json",
      }
    );
    const data = await response.json();
    dispatch(mainproduct.setproduct(data));

    setloading(false);
  },[gendername,dispatch]);
  useEffect(() => {
    fetching();
  }, [gendername,fetching]);

  const singleproduct = products.map((p) => (
    <Singleproduct
      key={p._id}
      id={p._id}
      image={p.image}
      brandname={p.brandname}
      baseprice={p.baseprice}
      productname={p.overviewname}
      actualprice={p.actualprice}
      offpercentage={p.offpercentage}
    />
  ));

  const genderclicked = (event) => {
    navigate(`/products/${event.target.value}`);
  };

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-brand-title">
          <span className="home-product">Home / </span>
          <span className="home-product-brand-title">myntra fashion store</span>
        </div>
        <div className="product-brand-title-name">myntra fashion store</div>
        <div className="product-filter-container">
          <div className="filter-container">
            <div className="filter-top-heading">
              <div className="filter-heading"> filters</div>
              <div className="filter-clearall-heading"> clear all</div>
            </div>
            <div className="filter-gender-selection">
              <ul>
                <li>
                  <input
                    type="radio"
                    value="men"
                    id="1"
                    name="gender"
                    onClick={genderclicked}
                  />
                  <span className="gender-name">Men</span>
                </li>
                <li>
                  <input
                    type="radio"
                    value="women"
                    id="2"
                    name="gender"
                    onClick={genderclicked}
                  />
                  <span className="gender-name">Women</span>
                </li>
                <li>
                  <input
                    type="radio"
                    value="home&living"
                    // id="3"
                    name="gender"
                    onClick={genderclicked}
                  />
                  <span className="gender-name">home & living</span>
                </li>
                <li>
                  <input
                    type="radio"
                    value="kids"
                    // id="4"
                    name="gender"
                    onClick={genderclicked}
                  />
                  <span className="gender-name">Kids</span>
                </li>
              </ul>
            </div>
            <div className="catagory-filter">
              <div className="sort-heading"> sort by</div>
              <ul className="sort-ul">
                <li>
                  <input
                    type="radio"
                    name="catagory"
                    onClick={sorting}
                    value="high"
                  />
                  <span>Hight to low</span>
                </li>
                <li>
                  <input
                    type="radio"
                    name="catagory"
                    value="low"
                    onClick={sorting}
                  />
                  <span>Low to high</span>
                </li>
                <li>
                  <input
                    type="radio"
                    onClick={sorting}
                    name="catagory"
                    value="a-z"
                  />
                  <span>a-z</span>
                </li>
                <li>
                  <input
                    type="radio"
                    onClick={sorting}
                    name="catagory"
                    value="z-a"
                  />
                  <span>z-a</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-container">
            {/* <div className="sort-by">
              <div className="sort-text">
                sort by <span className="sort-type">: Recomended</span>
              </div>
              <div className=""></div>
              
            </div> */}
            <div className="products-main-container">
              {!loading ? singleproduct : <p className="loading"></p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
