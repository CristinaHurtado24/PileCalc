import React from "react";
import {
  MeyerhoffBothDim,
  MeyerhofDiamIter,
  MeyerhofLenIter,
} from "../../Methods/Methods";

import { CaquotKeriselBD } from "../../Methods/Methods";

export default function Run(props) {
  const results2 = MeyerhoffBothDim(
    props.soilList,
    props.units,
    props.dimensions
  );

  const results1 = MeyerhofDiamIter(
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
      {props.method[0]["methodValue"] === "1" && (
        <div>
          <h3>Resultados</h3>
          <h3>Ambas Dimensiones</h3>
          <p>Capacidad portante:{results2}</p>
          <h3>Itera sobre el diametro</h3>
          <p>Diametro:{results1[0]["diameter"]}</p>
          <p>Capacidad portante:{results1[0]["Qadm"]}</p>
          <h3>Itera sobre la longitud</h3>
          <p>Longitud del fuste:{results[0]["length"]}</p>
          <p>Capacidad portante:{results[0]["Qadm"]}</p>
        </div>
      )}
    </div>
  );
}
