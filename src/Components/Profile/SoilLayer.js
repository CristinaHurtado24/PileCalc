import React, { useState } from "react";
import Select from "react-select";
import styles from "./Profile.modules.css";

export default function SoilLayer() {
  
    const soilTypes = [
    {
      value: "1",
      label: "Relleno (Fin)",
    },
    {
      value: "2",
      label: "Arena (Sand)",
    },
    {
      value: "3",
      label: "Grava (Gravel)",
    },
    {
      value: "4",
      label: "Arcilla (Clay)",
    },
    {
      value: "5",
      label: "Limo (Mud)",
    },
    {
      value: "6",
      label: "Arcilla de alta plasticidad",
    },
  ];

  const profile = [];
  const [soilType, setSoilType]=useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [numGP, setNumGP] = useState('')

  return (
    <div className={styles.comp}>
      <ul>
        <li>
          <Select
            className={styles.select_soil}
            placeholder="Seleccione un tipo de suelo"
            options={soilTypes}
          />
        </li>
        <li>
          <div>
            <label>Inicio</label>
            <input placeholder="0"></input>
          </div>
        </li>
        <li>
          <div>
            <label>Fin</label>
            <input placeholder="0"></input>
          </div>
        </li>
        <li>
          <div>
            <label>Num G/P</label>
            <input placeholder="20"></input>
          </div>
        </li>
      </ul>
    </div>
  );
}
