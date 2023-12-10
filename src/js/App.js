import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import Profile from "../Components/Profile/Profile";
import Scene from "../Components/3dModel/scene";
import graphicStyles from "../Components/3dModel/3dModel.modules.css";
import Dimensions from "../Components/Dimensions/Dimensions";
import Units from "../Components/Units/Units";
import MethodSelect from '../Components/MethodSelect/MethodSelect'


export default function App() {
  const [data, setData] = useState([]);


  return (
    <>
      <Navbar/>
      <div className={graphicStyles.container}>
        <Scene></Scene>
      </div>
    </>
  );
}
