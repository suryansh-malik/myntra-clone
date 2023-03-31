import { useNavigate } from "react-router-dom";
import "./Dealcard.css";

const Dealcard = (props) => {
  const navigate=useNavigate()
  return (
    <div className="card" onClick={()=>navigate(`${props.link}`)} style={{cursor:"pointer"}}>
      <img src={props.image} alt="" />
    </div>
  );
};
export default Dealcard;
