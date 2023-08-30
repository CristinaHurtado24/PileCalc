import React, { useState } from "react";
import Select from "react-select";
import styles from "./Sidebar.modules.css";

export default function Sidebar() {
  const methods = [
    {
      value: "1",
      label: "Meyerhof (Suelo Granular)",
    },
    {
      value: "2",
      label: "Caquot y Kerisel (Suelo Cohesivo)",
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

  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (Obj) => {
    setSelectedValue(Obj.value);
  };

  return (
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

          //I want to show a modal window that renders the profile component when the user clicks this button

            <button className={styles.profile} >
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
  );
}
