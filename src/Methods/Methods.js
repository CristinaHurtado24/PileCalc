import {
  MeyerhoffKgf,
  MeyerhoffTon,
  MeyerhoffKgfLen,
  MeyerhoffTonLen,
  Qestructural,
  Volume,
} from "./Meyerhoff";

import { CaquotKeriselBothDim } from "./CaquotKerisel";

// Método de cálculo Meyerhoff suelo granular en la punta del pilote
export const MeyerhoffBothDim = (soilList, units, dimensions, materials) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  if (dimensions[0]["diamIter"] || dimensions[0]["lengthIter"]) {
    return result;
  }
  //Se tiene dimension del diametro y longitud del pilote
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"]
  ) {
    // El usuario seleccionó unidades en kgf/cm
    // Se trabaja en kgf/cm

    const Fc = parseFloat(materials[0]["fc"]);
    const Fy = parseFloat(materials[0]["fy"]);
    const diam = parseFloat(dimensions[0]["diamValue"]);
    const length = parseFloat(dimensions[0]["lengthValue"]);
    let Qestr = Qestructural(diam, Fc, Fy, 1);
    let Qadm = MeyerhoffKgf(diam, length, soilList);
    let volume = Volume(diam, length, 1);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    return result;
  }

  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"]
  ) {
    // El usuario seleccionó unidades en ton/m
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]) * 100;
    console.log(diam);
    const length = parseFloat(dimensions[0]["lengthValue"]) * 100;

    const Fc = parseFloat(materials[0]["fc"]);
    const Fy = parseFloat(materials[0]["fy"]);
    let Qestr = Qestructural(diam, Fc, Fy, 1000);
    let Qadm = MeyerhoffTon(diam, length, soilList);
    let volume = Volume(diam, length, 1000);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam / 100;
    result[0]["length"] = length / 100;
    result[0]["Qest"] = Qestr;
    return result;
  }
};

export const MeyerhofDiamIter = (soilList, units, dimensions, materials) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  let Qadm = 0;
  let diamR = 0;
  let diam = 60;
  //Unidades en kgf/cm
  if (
    units[0]["unitValue"] === "1" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"]
  ) {
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
    let Qestr = Qestructural(diamR, Fc, Fy, 1);
    let volume = Volume(diamR, length, 1);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diamR;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"]
  ) {
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
    let Qestr = Qestructural(diamR, Fc, Fy, 1000);
    let volume = Volume(diamR, length, 1000);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diamR / 100;
    result[0]["length"] = length / 100;
    result[0]["Qest"] = Qestr;
    return result;
  } else {
    return result;
  }
};

export const MeyerhofLenIter = (soilList, units, dimensions, materials) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  let Qadm = 0;
  let lengthR = 0;
  let length = 600;
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  //Unidades en kgf/cm
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"]
  ) {
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
    let Qestr = Qestructural(diam, Fc, Fy, 1);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam;
    result[0]["Qest"] = Qestr;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"]
  ) {
    const diam = parseFloat(dimensions[0]["diamValue"]) * 100;
    while (length <= 30 * diam) {
      console.log(length);
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
    let Qestr = Qestructural(diam, Fc, Fy, 1000);
    let volume = Volume(diam, lengthR, 1000);
    result[0]["vol"] = volume;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam;
    result[0]["Qest"] = Qestr;
    return result;
  } else {
    return result;
  }
};

export const CaquotKeriselBD = (soilList, units, dimensions, materials) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  //Se tiene dimension del diametro y longitud del pilote
  if (units[0]["unitValue"] === "1") {
    // El usuario seleccionó unidades en kgf/cm
    // Se trabaja en ton/m

    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    const length = parseFloat(dimensions[0]["lengthValue"]) / 100;

    let Qadm = CaquotKeriselBothDim(diam, length, soilList, 10, 1000, 100);
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam, length);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm * 1000;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = length * 100;
    result[0]["Qest"] = Qestr;
    return result;
  }

  if (units[0]["unitValue"] === "2") {
    // El usuario seleccionó unidades en ton/m
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]);
    console.log(diam);
    const length = parseFloat(dimensions[0]["lengthValue"]);

    let Qadm = CaquotKeriselBothDim(diam, length, soilList, 1, 1, 1);
    let Qestr = Qestructural(diam, Fc, Fy, 1000);
    let volume = Volume(diam, length);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    return result;
  }
};

export const CaquotKeriselDiamIter = (
  soilList,
  units,
  dimensions,
  materials
) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, asent: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
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
    let Qestr = Qestructural(diamR, Fc, Fy, 1);
    let volume = Volume(diam, length);
    result[0]["vol"] = volume;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diamR;
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
    let Qestr = Qestructural(diamR, Fc, Fy, 1000);
    let volume = Volume(diam, length);
    result[0]["vol"] = volume;
    result[0]["diam"] = diamR / 100;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const CaquotKeriselLenIter = (
  soilList,
  units,
  dimensions,
  materials
) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, asent: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
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
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam, length);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diam * 100;
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
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, length);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diam;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};
