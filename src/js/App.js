import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import Scene from "../Components/3dModel/scene";
import graphicStyles from '../Components/3dModel/3dModel.modules.css'

export default function App() {
  const [data, setData] = useState([]);

  const callFromSidebar = (value) => {
    try {
      setData(value);
    } catch (error) {
      console.log("error in callFromSidebar");
      console.log(error);
    }
  };

  console.log(data);

  return (
    <>
      <Navbar />
      <Sidebar callback={callFromSidebar} />
      <div className={graphicStyles.container}>
        <Scene></Scene>
      </div>
    </>
  );
}
