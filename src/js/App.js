import React, {useState} from "react";
import styles from "./App.modules.css";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";

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

console.log(data)

  return (
    <>
      <Navbar />
      <Sidebar callback={callFromSidebar}/>
      
    </>
  );
}
