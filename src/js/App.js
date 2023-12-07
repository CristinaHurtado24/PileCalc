import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import Profile from "../Components/Profile/Profile";
import Scene from "../Components/3dModel/scene";
import graphicStyles from "../Components/3dModel/3dModel.modules.css";
import Dimensions from "../Components/Dimensions/Dimensions";
import Units from "../Components/Units/Units";

export default function App() {
  const [data, setData] = useState([]);
  const [showComp, setShowComp]=useState([]);

  const callFromNavbar = (value) => {
    try {
      setShowComp(value);
    } catch (error) {
      console.log("error in callFromNavbar");
      console.log(error);
    }
  };

  console.log(showComp);

  return (
    <>
      <Navbar callback={callFromNavbar}/>
      
      {/* <Sidebar callback={callFromSidebar} /> */}
      {/* <div className={graphicStyles.container}>
        <Scene></Scene>
      </div> */}
    </>
  );
}
