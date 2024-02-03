import React, { useState, useContext } from "react";

export const ProjectContext = React.createContext();

export default function ProjectContextProvider({ children }) {
  const [projectValues, setProjectValues] = useState({
    units: {
      unitValue: "0",
      unitLabel: "",
      unitForce: "",
      unitLength: "",
      unitPeso: "",
      unitCohesion: "",
      unitGrade: "°",
    },
    methods: {
      methodValue: "0",
      methodLabel: "",
      comparison: false,
    },
    soilList: [
      {
        typeValue: "",
        typeDescription: "",
        espesor: "",
        ngp: "",
        peso: "",
        cohesion: "",
        phi: "",
        isRelleno: false,
        e1: false,
        e2: false,
        e3: false,
        e4: false,
        e5: false,
      },
    ],
    freatico: { NF: false, NFStart: "", errorMsg: false, cont: 0 },
    dimensions: {
      diamIter: false,
      diamValue: "",
      lengthIter: false,
      lengthValue: "",
      withoutDim: false,
      e1: false,
      e2: false,
    },
    solicitation: { Qsol: false, QsolValue: "", errorMsg: false },
    materials: { fc: "", fy: "", e1: false, e2: false },
  });

  const updateProjectValues = (newValues) => {
    setProjectValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };
  return (
    <ProjectContext.Provider value={{ projectValues, updateProjectValues }}>
      {children}
    </ProjectContext.Provider>
  );
}
