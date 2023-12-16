import React from "react";
import {
  MeyerhoffBothDim,
  MeyerhofDiamIter,
  MeyerhofLenIter,
} from "../../Methods/Methods";

export default function Run(props) {
  const results2 = MeyerhofDiamIter(
    props.soilList,
    props.units,
    props.dimensions
  );
  const results = MeyerhofLenIter(
    props.soilList,
    props.units,
    props.dimensions
  );

  return (
    <div>
      <h3>Resultados</h3>
      <h3>Diam Iter</h3>
      <p>Diámetro:{results2[0]["diameter"]}</p>
      <p>Capacidad portante:{results2[0]["Qadm"]}</p>
      <h3>Len Iter</h3>
      <p>Diámetro:{results[0]["length"]}</p>
      <p>Capacidad portante:{results[0]["Qadm"]}</p>
    </div>
  );
}
