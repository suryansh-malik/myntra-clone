import { useNavigate } from 'react-router-dom';
import './Toppickscard.css'
const Toppickscard = (props) => {
const navigate = useNavigate();

    return (
        <div className="toppicks-card" onClick={()=>navigate(`${props.link}`)} style={{cursor:"pointer"}}>
            <img src={props.images} alt="" />
        </div>
    )
}

export default Toppickscard;