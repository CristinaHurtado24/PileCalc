import React, {useState} from "react";
import styles from './Navbar.modules.css'

export default function Navbar({callback}) {

  const buttons = [
    { name: "Units" },
    { name: "Methods" },
    { name: "Profile" },
    { name: "Dimensions" },
    { name: "Run" },
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(buttons.length).fill(false)
);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);}
  console.log(checkedState)

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {buttons.map(({ name }, index) => {
          return (
            <li>
              <div className={styles.marg}>
                <button onClick={() => handleOnChange(index)}>{name}</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
