import React, { useState } from "react";
import styles from "./Navbar.modules.css";

export default function Navbar(props) {
  const buttons = [
    { name: "Units" },
    { name: "Methods" },
    { name: "Profile" },
    { name: "Dimensions" },
    { name: "Run" },
  ];

  const [checkedState, setCheckedState] = useState(props.list);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedState(updatedCheckedState);
    props.callback(checkedState);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {buttons.map(({ name }, index) => {
          return (
            <li>
              <div className={styles.marg}>
                <button
                  onClick={() => {
                    handleOnChange(index);
                    props.callback(checkedState);
                  }}
                >
                  {name}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
