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
  const [showComp, setShowComp] = useState([false, false, false, false, false]);

  const callFromNavbar = (value) => {
    try {
      setShowComp(value);
      setShowComp(value);
    } catch (error) {
      console.log("error in callFromNavbar");
      console.log(error);
    }
  };

  const [soilList, setSoilList] = useState([
    { type: "1", espesor: "", ngp: "", peso: "", cohesion: "", phi: "" },
  ]);

  const toProfile = (list)=>{
    try {
      setSoilList(list);
    } catch (error) {
      console.log("error in toProfile");
      console.log(error);
    }
  }

  console.log(soilList)

  return (
    <>
      <Navbar list={showComp} callback={callFromNavbar} />
      {showComp.map(({value},index)=>{
        console.log(showComp[index])
        if(index===0 && showComp[index]){
          return(<Units></Units>)
        }if(index===1 && showComp[index]){
          return(<MethodSelect></MethodSelect>)
        }if (index === 2 && showComp[index]) {
          return <Profile soil={soilList} callback={toProfile}></Profile>;
        }if (index === 3 && showComp[index]) {
          return <Dimensions></Dimensions>;
        }if (index === 4 && showComp[index]) {
          return <Run></Run>;
        }
      })}
      {/* <div className={graphicStyles.container}>
        <Scene></Scene>
      </div> */}
    </>
  );
}
