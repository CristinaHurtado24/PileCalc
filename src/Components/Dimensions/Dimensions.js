import React, { useState } from "react";
import styles from './Dimensions.modules.css'

export default function Dimensions({callback}){

    const [dimList, setDimList] = useState([{radius:'', length:''}])

    const handleRadiusChange = (e)=>{
        const {value} = e.target
        const list = [...dimList]
        list[0]['radius']= value;
        setDimList(list)
    }

    const handleLengthChange = (e)=>{
        const {value} = e.target
        const list = [...dimList]
        list[0]['length']= value;
        setDimList(list)
    }

    console.log(dimList)
    const show = false;

    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <ul>
            <li>
              <button
                className={styles.xBtn}
                onClick={() => {
                  callback(show, dimList);
                }}
              >
                X
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.form}>
          <ul>
            <li>
              <label className={styles.rad}>Radio</label>
              <input
                className={styles.input_rad}
                onChange={(e) => handleRadiusChange(e)}
              ></input>
            </li>
            <li>
              <label className={styles.fust}>Longitud del fuste</label>
              <input
                className={styles.input_fust}
                onChange={(e) => handleLengthChange(e)}
              ></input>
            </li>
            <li>
              <div className={styles.btn}>
                <button>
                  Aceptar
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
}