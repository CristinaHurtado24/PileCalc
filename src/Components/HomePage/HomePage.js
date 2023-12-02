import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import Scene from "../Components/3dModel/scene";
import graphicStyles from "../Components/3dModel/3dModel.modules.css";
export default function HomePage() {
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
