import './Dropdown.css'
import { useDispatch,useSelector } from 'react-redux'
import  {hoverstate} from '../../../store/store'

const Dropdown = (props) => {
  const hover = useSelector((state) => state.hover.hover);
    const dispatch = useDispatch();
    const mouseentered = () => {
        dispatch(hoverstate.sethovertrue(true));
    }
    const mouseleaved = () => {
    dispatch(hoverstate.sethoverfalse(false));
        
    }

    return (
      <div >
        <div
          className={hover?'dropdownmain dropdown':'dropdownmain dropdownout'}
          onMouseEnter={mouseentered}
          onMouseLeave={mouseleaved}
        >
          {props.cont}
        </div>
        
      </div>
    );
}
export default Dropdown;