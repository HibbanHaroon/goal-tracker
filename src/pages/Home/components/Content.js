import React from "react";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import { UserAuth } from "../../../context/AuthContext";
import "./styles/Content.css";

function Content() {
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <div className="content-left">
        <div className="circle-container circle-right">
          <div className="circle"></div>
        </div>
        <div className="intro">
          <h1>Do you have some Goals?</h1>
          <p id="paragraph">
            Embark on a journey of self-improvement with Goal Tracker. Whether
            it's big or small, your goals matter. <br></br>
            <br></br>With our intuitive interface and insightful tracking,
            you'll be able to visualize your achievements, track your growth,
            and witness the transformation unfold in an intuitive graph to
            empower your day, every day.
          </p>
        </div>
        <div className="circle-container circle-left circle-last">
          <div className="circle"></div>
        </div>
      </div>
      <div className="content-right">
        <div className="circle-container circle-left">
          <div className="circle"></div>
        </div>
        <div className="register">
          <h1>Track them right away.</h1>
          <div className="button-container" id="button-container">
            <button id="button" onClick={handleGoogleSignIn}>
              <GoogleIcon width={18} height={18} />
              Login with Google
            </button>
          </div>
        </div>
        <div className="circle-container circle-right circle-last">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}

export default Content;
