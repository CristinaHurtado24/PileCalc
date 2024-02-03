import React, { useState, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./MethodSelect.modules.css";

export default function MethodSelect() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const [selectedMethod, setSelectedMethod] = useState(projectValues.methods);
  const [checkedComparison, setCheckedComparison] = useState(
    projectValues.methods["comparison"]
  );
  const [selectedValue, setSelectedValue] = useState(
    projectValues.methods.methodValue
  );

  const methods = [
    {
      value: "0",
      label: "--",
    },
    {
      value: "1",
      label: "Meyerhof (1976)",
    },
    {
      value: "2",
      label: "Caquot y Kérisel (1961)",
    },
    {
      value: "3",
      label: "Compilación Pérez Guerra-Carrillo (1981)",
    },
  ];

  const handleOnChangeCompar = (e) => {
    if (!checkedComparison) {
      selectedMethod["comparison"] = !checkedComparison;
      setCheckedComparison(!checkedComparison);
    } else {
      selectedMethod["comparison"] = !checkedComparison;
      setCheckedComparison(!checkedComparison);
    }
    setSelectedMethod(selectedMethod);
  };

  const handleOnChangeMethod = (e) => {
    let value = e.target.value;
    setSelectedValue(value);
    methods.map((method) => {
      if (method.value === value) {
        selectedMethod["methodValue"] = method.value;
        selectedMethod["methodLabel"] = method.label;
      }
    });
    setSelectedMethod(selectedMethod);
  };

  const handleChanges = (newValues) => {
    updateProjectValues({ ...projectValues, methods: newValues });
  };
  return (
    <div className={styles.container}>
      <h3>Seleccione un método de cálculo</h3>
      <form>
        <ul>
          <li>
            <div className={styles.dropdown}>
              <select
                className={styles.select_test}
                value={selectedValue}
                onChange={(e) => handleOnChangeMethod(e)}
              >
                {methods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </li>
          <li>
            <div className={styles.inputDiv}>
              <input
                type="checkbox"
                name="comparacion"
                value="comparacion"
                checked={selectedMethod["comparison"]}
                onChange={handleOnChangeCompar}
              />
              <label>Mostrar comparación con otros métodos</label>
            </div>
          </li>
          <li>
            <div className={styles.btn}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleChanges(selectedMethod);
                  debugger;
                }}
              >
                Aceptar
              </button>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
}
