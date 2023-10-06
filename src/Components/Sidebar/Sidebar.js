import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./Sidebar.modules.css";
import Profile from "../Profile/Profile";
import Dimensions from "../Dimensions/Dimensions";

export default function Sidebar({callback}) {
  const methods = [
    {
      value: "1",
      label: "Meyerhof (Suelo Granular)",
    },
    {
      value: "2",
      label: "Caquot y Kérisel (Suelo Cohesivo)",
    },
    {
      value: "3",
      label: "Método para Suelo Granular",
    },
    {
      value: "4",
      label: "Método para Suelo Cohesivo",
    },
    {
      value: "5",
      label: "Método para Suelo Mixto",
    },
  ];

  //AGREGAR CAMBIO DE UNIDADES
  const units = [
    {
      value: "1",
      label: "Kgf/cm",
    },
    {
      value: "2",
      label: "Ton/m",
    },
  ];

  const [showProfile, setShowProfile] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [data, setData] = useState(true)
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedUnits, setSelectedUnits] = useState(0);
  const [dimensions, setDimensions] = useState([]);
  const [soilProfile, setSoilProfile] = useState([]);
  const [parameters, setParameters] = useState([
    { method: "", units: "", soilProfile: [], dimensions: [] }
  ]);

  const handleChange = (Obj) => {
    setSelectedValue(Obj.value);
  };

  const handleChangedUnits = (Obj) => {
    setSelectedUnits(Obj.value);
  };

  const callFromProfile = (value, profile) => {
    try {
      setShowProfile(value);
      setSoilProfile(profile);
    } catch (error) {
      console.log("error in callFromProfile");
      console.log(error);
    }
  };

  const callFromDimensions = (value, dim) => {
    try {
      setShowDimensions(value);
      setDimensions(dim);
    } catch (error) {
      console.log("error in callFromDimensions");
      console.log(error);
    }
  };

  if (
    selectedValue != 0 &&
    selectedUnits != 0 &&
    soilProfile.length != 0 &&
    dimensions.length != 0 && data
  ) {
    const list = [...parameters];
    list["method"] = selectedValue;
    list["units"] = selectedUnits;
    list["soilProfile"] = soilProfile;
    list["dimensions"] = dimensions;
    setParameters(list);
    setData(false)
  }

  console.log(parameters)
  return (
    <>
      <div className={styles.show_hide}>
        {showProfile && !showDimensions && (
          <Profile callback={callFromProfile} />
        )}
        {!showProfile && showDimensions && (
          <Dimensions callback={callFromDimensions} />
        )}
      </div>
      <div className={styles.container}>
        <ul>
          <li>
            <div className={styles.dropdown}>
              <Select
                className={styles.select_dropdown}
                placeholder="Seleccione un Método"
                options={methods}
                onChange={handleChange}
              />
            </div>
          </li>
          <hr />
          <li>
            <div className={styles.btn_div}>
              <button
                className={styles.profile}
                onClick={() => {
                  setShowProfile(!showProfile);
                  console.log(showProfile);
                }}
              >
                Profile
              </button>
            </div>
          </li>
          <hr />
          <li>
            <div className={styles.btn_div}>
              <button
                className={styles.profile}
                onClick={() => {
                  setShowDimensions(!showDimensions);
                  console.log(showDimensions);
                }}
              >
                Pile Dimensions
              </button>
            </div>
          </li>
          <hr />
          <li>
            <div className={styles.units_dropdown}>
              <Select
                className={styles.select_dropdown}
                placeholder="Unidades"
                options={units}
                onChange={handleChangedUnits}
              />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
