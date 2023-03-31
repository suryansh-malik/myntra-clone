import './Overlay.css'
import { useSelector } from 'react-redux'
const Overlay = () => {
    const hover = useSelector((state)=>state.hover.hover)
    return <div className={hover ? "overlay" : "overlayout"}></div>;
}
export default Overlay;