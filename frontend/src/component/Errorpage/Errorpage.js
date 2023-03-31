import Navbar from "../Homepage/Navbar/Navbar"
import "./Errorpage.css"
const Errorpage = () => {
    return (
      <>
        <Navbar />
        <div className="error-page-main-div">
          <div className="error-page-inner-content">
            <img
              src="https://constant.myntassets.com/web/assets/img/11488523304066-search404.png"
              alt="img"
              className="error-page-image"
            ></img>
            <div className="error-page-heading">
              We couldn't find any matches!
            </div>
            <div className="error-page-message">
              Please check the spelling or try searching something else
            </div>
          </div>
        </div>
      </>
    );
}
export default Errorpage