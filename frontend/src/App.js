import "./App.css";
import Home from "./component/Homepage/Home";
import { Route, Routes } from "react-router-dom";
import Bag from "./component/Bag/Bag";
import Product from "./component/Product/Product";
import Overlay from "./component/Homepage/Overlay/Overlay";
import Login from "./component/login/Login";
import Signup from "./component/login/Signup";
import { useSelector,useDispatch } from "react-redux";
import Protectedroutes from "./component/protection/Protectedroutes";
import { authenticate ,wishlist,bagproduct} from "./store/store";
import Productdetails from './component/Product/Productdetail'
import Wishlist from "./component/wishlist/Wishlist";
import Errorpage from "./component/Errorpage/Errorpage";
function App() {
  // ======================//
  // persisting state
  // ======================//
  const showmessage = useSelector((state) => state.resmessage.showmessage);
  const dispatch = useDispatch();
  const hover = useSelector((state) => state.hover.hover);
  const token = localStorage.getItem("token");
  const message = useSelector((state) => state.resmessage.message);
  if (token) {
    dispatch(authenticate.setauthenticate(true));
    dispatch(
      wishlist.setwishlist(JSON.parse(localStorage.getItem("wishlist")))
    );
    const cartproducts = JSON.parse(localStorage.getItem("cart"));
    dispatch(bagproduct.setbagproduct(cartproducts));
  }
  console.log(hover);
  // ======================//
  // displaying overlay on menu hover
  // ======================//
  let content;
  content = <Overlay />;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Protectedroutes />}>
          <Route path="bag" element={<Bag />} />
        </Route>
        <Route element={<Protectedroutes />}>
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/products/:gendername" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:ppp" element={<Productdetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      {hover ? content : null}
      {showmessage ? <div className="client-res-message">{message}</div> : null}
    </div>
  );
}

export default App;
