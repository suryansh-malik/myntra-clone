import { Navigate,Outlet } from "react-router-dom";  
import { useSelector } from "react-redux";
const Protectedroutes = () => {
    const auth = useSelector((state) => state.authenticate.authenticate)
    // console.log(auth)
    // const auth = false;
    
    return (
        auth?<Outlet/>:<Navigate to="/login" />
    )
}

export default Protectedroutes
