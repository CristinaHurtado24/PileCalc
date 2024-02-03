import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import FHNavbar from "../Components/FileHandling/FHNavbar";
import ProjectContextProvider from "../Context/ProjectContext";

export default function App() {
  return (
    <>
      <ProjectContextProvider>
        <FHNavbar />
        <Navbar />
      </ProjectContextProvider>
    </>
  );
}
