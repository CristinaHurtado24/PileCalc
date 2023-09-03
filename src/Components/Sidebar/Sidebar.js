import React, { useState } from "react";
import Select from "react-select";
import styles from "./Sidebar.modules.css";
import Profile from "../Profile/Profile";

export default function Sidebar() {
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

  const [showProfile, setShowProfile] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (Obj) => {
    setSelectedValue(Obj.value);
  };

  const callFromProfile = (value) => {
    try {
      setShowProfile(value);
    } catch (error) {
      console.log("error in callFromProfile");
      console.log(error);
    }
  };

  return (
    <>
    <div className={styles.show_hide}>
      {showProfile && <Profile callback={callFromProfile}/>}
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
              <button className={styles.profile}>Pile Dimensions</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
