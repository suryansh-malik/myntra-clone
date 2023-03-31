import { useNavigate } from 'react-router-dom';
import './Catagoriescard.css'

const Catagoriescard = (props) => {
     const navigate = useNavigate()
    return (
        <div className="catagories-card" onClick={()=>navigate(`${props.link}`)} style={{cursor:"pointer"}}>
            <img src={props.images} alt=""/>
        </div>
    )
}
export default Catagoriescard;