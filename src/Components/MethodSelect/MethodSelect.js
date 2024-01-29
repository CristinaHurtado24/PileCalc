import React, { useState } from "react";
import Select from "react-select";
import styles from "./MethodSelect.modules.css";

export default function MethodSelect(props) {
  const [selectedMethod, setSelectedMethod] = useState(props.list);
  const [checkedComparison, setCheckedComparison] = useState(
    props.list[0]["comparison"]
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
    const list = [...selectedMethod];
    if (!checkedComparison) {
      list[0]["comparison"] = !checkedComparison;
      setCheckedComparison(!checkedComparison);
    } else {
      list[0]["comparison"] = !checkedComparison;
      setCheckedComparison(!checkedComparison);
    }
    setSelectedMethod(list);
  };

  const handleOnChangeMethod = (e) => {
    let value = e.target.value;
    const list = [...selectedMethod];
    methods.map((method) => {
      if (method.value === value) {
        list[0]["methodValue"] = method.value;
        list[0]["methodLabel"] = method.label;
      }
    });
    setSelectedMethod(list);
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
                value={selectedMethod[0]["methodValue"]}
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
                checked={selectedMethod[0]["comparison"]}
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
                  props.callback(selectedMethod);
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
