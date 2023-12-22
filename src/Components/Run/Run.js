import React from "react";
import {
  MeyerhoffBothDim,
  MeyerhofDiamIter,
  MeyerhofLenIter,
} from "../../Methods/Methods";

import {
  CaquotKeriselBD,
  CaquotKeriselLenIter,
  CaquotKeriselDiamIter,
} from "../../Methods/Methods";

export default function Run(props) {
  const results3 = CaquotKeriselBD(
    props.soilList,
    props.units,
    props.dimensions
  );

  const results2 = CaquotKeriselLenIter(
    props.soilList,
    props.units,
    props.dimensions
  );

  return (
    <div>
      {props.method[0]["methodValue"] === "3" && (
        <div>
          <h3>Resultados</h3>
          <h3>Ambas Dimensiones</h3>
          <p>Capacidad portante:{results3}</p>
          <h3>Itera sobre la longitud</h3>
          <p>Longitud:{results2[0]["length"]}</p>
          <p>Capacidad portante:{results2[0]["Qadm"]}</p>
        </div>
      )}
    </div>
  );
}
