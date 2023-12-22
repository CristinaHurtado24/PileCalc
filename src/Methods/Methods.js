import {
  MeyerhoffKgf,
  MeyerhoffTon,
  MeyerhoffKgfLen,
  MeyerhoffTonLen,
} from "./Meyerhoff";

import { CaquotKeriselBothDim } from "./CaquotKerisel";

// Método de cálculo Meyerhoff suelo granular en la punta del pilote
export const MeyerhoffBothDim = (soilList, units, dimensions) => {
  //Se tiene dimension del diametro y longitud del pilote
  if (units[0]["unitValue"] === "1") {
    // El usuario seleccionó unidades en kgf/cm
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]);
    const length = parseFloat(dimensions[0]["lengthValue"]);

    let Qadm = MeyerhoffKgf(diam, length, soilList);
    return Qadm;
  }

  if (units[0]["unitValue"] === "2") {
    // El usuario seleccionó unidades en ton/m
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]) * 100;
    console.log(diam);
    const length = parseFloat(dimensions[0]["lengthValue"]) * 100;

    let Qadm = MeyerhoffTon(diam, length, soilList);
    return Qadm;
  }
};

export const MeyerhofDiamIter = (soilList, units, dimensions) => {
  const result = [{ diameter: 0, Qadm: 0 }];
  let Qadm = 0;
  let diamR = 0;
  let diam = 60;
  //Unidades en kgf/cm
  if (units[0]["unitValue"] === "1") {
    const length = parseFloat(dimensions[0]["lengthValue"]);
    while (diam <= 200) {
      console.log(diam);
      let Qres = 0;
      Qres = MeyerhoffKgf(diam, length, soilList);
      console.log(Qres);
      if (Qadm < Qres && length < 30 * diam) {
        Qadm = Qres;
        diamR = diam;
      }
      if (diam < 65) {
        diam += 5;
      }
      if (diam == 65) {
        diam += 15;
      } else {
        diam += 10;
      }
    }
    result[0]["diameter"] = diamR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
  if (units[0]["unitValue"] === "2") {
    const length = parseFloat(dimensions[0]["lengthValue"]) * 100;
    console.log(length);
    while (diam <= 200) {
      console.log(diam);
      let Qres = 0;
      Qres = MeyerhoffTon(diam, length, soilList);
      console.log(Qres);
      if (Qadm < Qres && length < 30 * diam) {
        Qadm = Qres;
        diamR = diam;
      }
      if (diam < 65) {
        diam += 5;
      }
      if (diam == 65) {
        diam += 15;
      } else {
        diam += 10;
      }
    }
    result[0]["diameter"] = diamR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const MeyerhofLenIter = (soilList, units, dimensions) => {
  const result = [{ length: 0, Qadm: 0 }];
  let Qadm = 0;
  let lengthR = 0;
  let length = 600;
  //Unidades en kgf/cm
  if (units[0]["unitValue"] === "1") {
    const diam = parseFloat(dimensions[0]["diamValue"]);
    while (length <= 30 * diam) {
      console.log(length);
      let Qres = 0;
      Qres = MeyerhoffKgfLen(diam, length, soilList);
      console.log(Qres);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 100;
    }
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
  if (units[0]["unitValue"] === "2") {
    const diam = parseFloat(dimensions[0]["diamValue"]) * 100;
    while (length <= 30 * diam) {
      console.log(length);
      let Qres = 0;
      Qres = MeyerhoffTonLen(diam, length, soilList);
      console.log(Qres);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 100;
    }
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const CaquotKeriselBD = (soilList, units, dimensions) => {
  //Se tiene dimension del diametro y longitud del pilote
  if (units[0]["unitValue"] === "1") {
    // El usuario seleccionó unidades en kgf/cm
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    const length = parseFloat(dimensions[0]["lengthValue"]) / 100;

    let Qadm = CaquotKeriselBothDim(diam, length, soilList, 10, 1000, 100);
    return Qadm * 1000;
  }

  if (units[0]["unitValue"] === "2") {
    // El usuario seleccionó unidades en ton/m
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]);
    console.log(diam);
    const length = parseFloat(dimensions[0]["lengthValue"]);

    let Qadm = CaquotKeriselBothDim(diam, length, soilList, 1, 1, 1);
    return Qadm;
  }
};

export const CaquotKeriselDiamIter = (soilList, units, dimensions) => {
  const result = [{ diameter: 0, Qadm: 0 }];
  let Qadm = 0;
  let diamR = 0;
  let diam = 60;
  //Unidades en kgf/cm
  if (units[0]["unitValue"] === "1") {
    const length = parseFloat(dimensions[0]["lengthValue"]) / 100;
    while (diam <= 200) {
      console.log(diam);
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam / 100, length, soilList, 10, 1000, 100);
      console.log(Qres);
      if (Qadm < Qres) {
        Qadm = Qres;
        diamR = diam;
      }
      if (diam < 65) {
        diam += 5;
      }
      if (diam == 65) {
        diam += 15;
      } else {
        diam += 10;
      }
    }
    result[0]["diameter"] = diamR;
    result[0]["Qadm"] = Qadm * 1000;
    return result;
  }
  if (units[0]["unitValue"] === "2") {
    const length = parseFloat(dimensions[0]["lengthValue"]);
    console.log(length);
    while (diam <= 200) {
      console.log(diam);
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam / 100, length, soilList, 1, 1, 1);
      console.log(Qres);
      if (Qadm < Qres) {
        Qadm = Qres;
        diamR = diam;
      }
      if (diam < 65) {
        diam += 5;
      }
      if (diam == 65) {
        diam += 15;
      } else {
        diam += 10;
      }
    }
    result[0]["diameter"] = diamR / 100;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const CaquotKeriselLenIter = (soilList, units, dimensions) => {
  const result = [{ length: 0, Qadm: 0 }];
  let Qadm = 0;
  let lengthR = 0;
  let length = 6;
  //Unidades en kgf/cm
  if (units[0]["unitValue"] === "1") {
    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    while (length <= 30 * diam) {
      console.log(length);
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam, length, soilList, 10, 1000, 100);
      console.log(Qres);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    result[0]["length"] = lengthR * 100;
    result[0]["Qadm"] = Qadm * 1000;
    return result;
  }
  if (units[0]["unitValue"] === "2") {
    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    while (length <= 30 * diam) {
      console.log(length);
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam, length, soilList, 1, 1, 1);
      console.log("Qres: " + Qres);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};
