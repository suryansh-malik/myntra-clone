import { useNavigate } from 'react-router-dom';
import './Bestbrandcard.css'

const Bestbrandcard = (props) => {
  const navigate = useNavigate()
    return (
      <div className="bestbrand-card" style={{cursor:"pointer"}} onClick={()=>navigate(`${props.link}`)}>
        <img src={props.image} alt="img" />
      </div>
    );
}

export default Bestbrandcard;