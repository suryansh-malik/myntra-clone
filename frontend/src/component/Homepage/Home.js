import "./Home.css";
import Navbar from "./Navbar/Navbar";
import Slider from "./Slider/Slider";
import Daydeal from "./Daydeal/Daydeal";
import Bestbrands from './Bestbrands/Bestbrands'
import Toppicks from './Toppicks/Toppicks'
import Catagories from './Catagories/Catagories'
import { useSelector } from "react-redux";

const Home = () => {

  return (
    <div className="home">
      <Navbar />
      <Slider />
      <Daydeal />
      <Bestbrands />
      <Toppicks />
      <Catagories />
    </div>
  );
};

export default Home;
