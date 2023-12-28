import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Scene from "../Components/3dModel/Scene";
import graphicStyles from "../Components/3dModel/3dModel.modules.css";

export default function App() {
  const [data, setData] = useState([]);

  return (
    <>
      <Navbar />
      <div className={graphicStyles.container}>
        <Scene></Scene>
      </div>
    </>
  );
}
