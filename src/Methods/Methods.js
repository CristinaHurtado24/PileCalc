import {
  MeyerhoffKgf,
  MeyerhoffTon,
  MeyerhoffKgfLen,
  MeyerhoffTonLen,
  Qestructural,
  Volume,
} from "./Meyerhoff";

import { CaquotKeriselBothDim } from "./CaquotKerisel";

import { MethodPGC } from "./PerezGuerraCarrillo";
import { ResultSetDependencies } from "mathjs";

const minVolume = (list) => {
  let min;
  for (let i = 0; i < list.length; i++) {
    let result = list[i];
    if (i == 0) {
      min = result;
    }
    if (!i == 0 && result[0]["vol"] < min[0]["vol"]) {
      min = result;
    }
  }
  return min;
};

// Método de cálculo Meyerhoff suelo granular en la punta del pilote
export const MeyerhoffBothDim = (soilList, units, dimensions, materials) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  if (
    dimensions[0]["diamIter"] ||
    dimensions[0]["lengthIter"] ||
    dimensions[0]["withoutDim"]
  ) {
    return result;
  }
  //Se tiene dimension del diametro y longitud del pilote
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
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
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    // El usuario seleccionó unidades en ton/m
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]) * 100;
    const length = parseFloat(dimensions[0]["lengthValue"]) * 100;

    const Fc = parseFloat(materials[0]["fc"]);
    const Fy = parseFloat(materials[0]["fy"]);
    let Qestr = Qestructural(diam, Fc, Fy, 1000);
    let Qadm = MeyerhoffTon(diam, length, soilList);
    let volume = Volume(diam / 100, length / 100, 1);
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
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]);
    while (diam <= 200) {
      let Qres = 0;
      Qres = MeyerhoffKgf(diam, length, soilList);
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
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]) * 100;
    while (diam <= 200) {
      let Qres = 0;
      Qres = MeyerhoffTon(diam, length, soilList);
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
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const diam = parseFloat(dimensions[0]["diamValue"]);
    while (length <= 30 * diam) {
      let Qres = 0;
      Qres = MeyerhoffKgfLen(diam, length, soilList);
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
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const diam = parseFloat(dimensions[0]["diamValue"]) * 100;
    while (length <= 30 * diam) {
      let Qres = 0;
      Qres = MeyerhoffTonLen(diam, length, soilList);
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

export const MeyerhofQsolWth = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation
) => {
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let results = [];
  let diam = 60;

  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    while (diam <= 200) {
      let res = MeyerhofLenIterAux(
        soilList,
        units,
        dimensions,
        Fc,
        Fy,
        diam,
        solicitation
      );

      if (res[0]["Qadm"] > Qsol) {
        results.push(res);
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

    let min = minVolume(results);
    return min;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    while (diam <= 200) {
      let res = MeyerhofLenIterAux(
        soilList,
        units,
        dimensions,
        Fc,
        Fy,
        diam,
        solicitation
      );

      if (res[0]["Qadm"] > Qsol) {
        results.push(res);
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

    let min = minVolume(results);
    return min;
  } else {
    return results;
  }
};

export const MeyerhofLenIterAux = (
  soilList,
  units,
  dimensions,
  Fc,
  Fy,
  diameter,
  solicitation
) => {
  const result = [{ Qadm: 0, Qest: 0, Qsol: 0, diam: 0, length: 0, vol: 0 }];
  let Qadm = 0;
  let lengthR = 0;
  let length = 600;
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let Lestratos = 0;
  //Unidades en kgf/cm
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = diameter;
    while (Lestratos > length && Qsol > Qadm) {
      let Qres = 0;
      Qres = MeyerhoffKgfLen(diam, length, soilList);
      if (Qadm < Qres && length >= 6 * diam) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 100;
    }
    let Qestr = Qestructural(diam, Fc, Fy, 1);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["length"] = lengthR;
    result[0]["Qsol"] = Qsol;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam;
    result[0]["Qest"] = Qestr;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = diameter;
    while (Lestratos * 100 > length && Qsol > Qadm) {
      let Qres = 0;
      Qres = MeyerhoffTonLen(diam, length, soilList);
      if (Qadm < Qres && length >= 6 * diam) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 100;
    }
    let Qestr = Qestructural(diam, Fc, Fy, 1000);
    let volume = Volume(diam / 100, lengthR / 100, 1);
    result[0]["vol"] = volume;
    result[0]["length"] = lengthR / 100;
    result[0]["Qsol"] = Qsol;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam / 100;
    result[0]["Qest"] = Qestr;
    return result;
  } else {
    return result;
  }
};

export const MeyerhofDiamIterQsol = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation
) => {
  const result = [{ Qadm: 0, Qsol: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let results = [];
  let Qadm = 0;
  let diam = 60;
  let diamR = 0;

  if (
    units[0]["unitValue"] === "1" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]);
    while (diam <= 200 && Qsol > Qadm) {
      let Qres = MeyerhoffKgf(diam, length, soilList);
      if (Qres > Qadm && 30 * diam >= length) {
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
    let Qestr = Qestructural(diam, Fc, Fy, 1);
    let volume = Volume(diam, length, 1);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diamR;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    results.push(result);
    let min = minVolume(results);
    return min;
  }
  if (
    units[0]["unitValue"] === "2" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]) * 100;

    while (diam <= 200 && Qsol > Qadm) {
      let Qres = MeyerhoffTon(diam, length, soilList);
      if (Qres > Qsol && 30 * diam >= length) {
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
    let Qestr = Qestructural(diam, Fc, Fy, 1000);
    let volume = Volume(diam / 100, length / 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diamR / 100;
    result[0]["length"] = length / 100;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;

    results.push(result);
    let min = minVolume(results);
    return min;
  } else {
    return results;
  }
};

export const MeyerhofLenIterQsol = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation
) => {
  const result = [{ Qadm: 0, Qest: 0, Qsol: 0, diam: 0, length: 0, vol: 0 }];
  let Qadm = 0;
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  let lengthR = 0;
  let length = 600;
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let Lestratos = 0;
  //Unidades en kgf/cm
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = parseFloat(dimensions[0]["diamValue"]);
    while (Lestratos > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = MeyerhoffKgfLen(diam, length, soilList);
      if (Qadm < Qres && length >= 6 * diam) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 100;
    }
    let Qestr = Qestructural(diam, Fc, Fy, 1);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["length"] = lengthR;
    result[0]["Qsol"] = Qsol;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam;
    result[0]["Qest"] = Qestr;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = parseFloat(dimensions[0]["diamValue"]) * 100;
    while (Lestratos * 100 > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = MeyerhoffTonLen(diam, length, soilList);

      if (Qadm < Qres && length >= 6 * diam) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 100;
    }
    let Qestr = Qestructural(diam, Fc, Fy, 1000);
    let volume = Volume(diam / 100, lengthR / 100, 1);
    result[0]["vol"] = volume;
    result[0]["length"] = lengthR / 100;
    result[0]["Qsol"] = Qsol;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam / 100;
    result[0]["Qest"] = Qestr;
    return result;
  }
};

export const CaquotKeriselBD = (soilList, units, dimensions, materials) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  //Se tiene dimension del diametro y longitud del pilote
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    // El usuario seleccionó unidades en kgf/cm
    // Se trabaja en ton/m

    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    const length = parseFloat(dimensions[0]["lengthValue"]) / 100;

    let Qadm = CaquotKeriselBothDim(diam, length, soilList, 10, 1000, 100);
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam * 100, length * 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm * 1000;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = length * 100;
    result[0]["Qest"] = Qestr;
    return result;
  }

  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    // El usuario seleccionó unidades en ton/m
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]);
    const length = parseFloat(dimensions[0]["lengthValue"]);

    let Qadm = CaquotKeriselBothDim(diam, length, soilList, 1, 1, 1);
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, length, 1);
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
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]) / 100;
    while (diam <= 200) {
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam / 100, length, soilList, 10, 1000, 100);

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
    let volume = Volume(diamR, length, 1);
    result[0]["vol"] = volume;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diamR;
    result[0]["Qadm"] = Qadm * 1000;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]);

    while (diam <= 200) {
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam / 100, length, soilList, 1, 1, 1);

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
    let volume = Volume(diamR, length, 1000);
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
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  let Qadm = 0;
  let lengthR = 0;
  let length = 6;
  //Unidades en kgf/cm
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    while (length <= 30 * diam) {
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam, length, soilList, 10, 1000, 100);

      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam * 100, lengthR * 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = lengthR * 100;
    result[0]["Qadm"] = Qadm * 1000;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const diam = parseFloat(dimensions[0]["diamValue"]);
    while (length <= 30 * diam) {
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam, length, soilList, 1, 1, 1);

      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diam;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const CaquotKeriselQsolWth = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation
) => {
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let results = [];
  let diam = 60;
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    while (diam <= 200) {
      let res = CaquotKeriselLenIterAux(
        soilList,
        units,
        dimensions,
        Fc,
        Fy,
        diam,
        solicitation
      );

      if (res[0]["Qadm"] > Qsol) {
        results.push(res);
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

    let min = minVolume(results);
    return min;
  }

  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    while (diam <= 200) {
      let res = CaquotKeriselLenIterAux(
        soilList,
        units,
        dimensions,
        Fc,
        Fy,
        diam,
        solicitation
      );

      if (res[0]["Qadm"] > Qsol) {
        results.push(res);
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

    let min = minVolume(results);
    return min;
  }
};

export const CaquotKeriselLenIterAux = (
  soilList,
  units,
  dimensions,
  Fc,
  Fy,
  diameter,
  solicitation
) => {
  const result = [{ Qadm: 0, Qest: 0, Qsol: 0, diam: 0, length: 0, vol: 0 }];
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let Qadm = 0;
  let lengthR = 0;
  let length = 6;
  let Lestratos = 0;
  //Unidades en kgf/cm

  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = diameter / 100;
    while (Lestratos / 100 > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam, length, soilList, 10, 1000, 100) * 1000;
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam * 100, lengthR * 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = lengthR * 100;
    result[0]["Qadm"] = Qadm;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = diameter / 100;
    while (Lestratos > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam, length, soilList, 1, 1, 1);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diam;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const CaquotKeriselDiamIterQsol = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation
) => {
  const result = [{ Qadm: 0, Qest: 0, Qsol: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  const length = parseFloat(dimensions[0]["lengthValue"]);
  let Qadm = 0;
  let Lestratos = 0;

  let diam = 60;
  let diamR = 0;
  if (
    units[0]["unitValue"] === "1" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    while (diam <= 200 && Qsol > Qadm) {
      let Qres =
        CaquotKeriselBothDim(
          diam / 100,
          length / 100,
          soilList,
          10,
          1000,
          100
        ) * 1000;
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

    let Qestr = Qestructural(diam, Fc, Fy, 1);
    let volume = Volume(diam, length, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diamR;
    result[0]["length"] = length;
    result[0]["Qadm"] = Qadm;
    return result;
  }

  if (
    units[0]["unitValue"] === "2" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    while (diam <= 200 && Qsol > Qadm) {
      let Qres = CaquotKeriselBothDim(diam / 100, length, soilList, 1, 1, 1);

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
    let volume = Volume(diamR, length, 1000);
    result[0]["vol"] = volume;
    result[0]["diam"] = diamR / 100;
    result[0]["length"] = length;
    result[0]["Qsol"] = Qsol;
    result[0]["Qest"] = Qestr;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const CaquotKeriselLenIterQsol = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation
) => {
  const result = [{ Qadm: 0, Qest: 0, Qsol: 0, diam: 0, length: 0, vol: 0 }];
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  let Qadm = 0;
  let lengthR = 0;
  let length = 6;
  let Lestratos = 0;
  //Unidades en kgf/cm

  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    while (Lestratos / 100 > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam, length, soilList, 10, 1000, 100) * 1000;
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam * 100, lengthR * 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = lengthR * 100;
    result[0]["Qadm"] = Qadm;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = parseFloat(dimensions[0]["diamValue"]);
    while (Lestratos > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = CaquotKeriselBothDim(diam, length, soilList, 1, 1, 1);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diam;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const PGCBothDim = (soilList, units, dimensions, materials, NF) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  //Se tiene dimension del diametro y longitud del pilote
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    // El usuario seleccionó unidades en kgf/cm
    // Se trabaja en ton/m

    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    const length = parseFloat(dimensions[0]["lengthValue"]) / 100;

    let Qadm = MethodPGC(soilList, diam, length, NF, 100, 1000, 10);

    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam * 100, length * 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = length * 100;
    result[0]["Qest"] = Qestr;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    // El usuario seleccionó unidades en ton/m
    // Se trabaja en kgf/cm

    const diam = parseFloat(dimensions[0]["diamValue"]);
    const length = parseFloat(dimensions[0]["lengthValue"]);

    let Qadm = MethodPGC(soilList, diam, length, NF, 1, 1, 1);

    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, length, 1);
    result[0]["vol"] = volume;
    result[0]["Qadm"] = Qadm;
    result[0]["diam"] = diam;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    return result;
  }
};

export const PGCLenIter = (soilList, units, dimensions, materials, NF) => {
  const result = [{ Qadm: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  let Qadm = 0;
  let lengthR = 0;
  let length = 6;
  //Unidades en kgf/cm
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    while (length <= 30 * diam) {
      let Qres = 0;
      Qres = MethodPGC(soilList, diam, length, NF, 100, 1000, 10);

      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam * 100, lengthR * 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = lengthR * 100;
    result[0]["Qadm"] = Qadm;
    console.log(result);
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const diam = parseFloat(dimensions[0]["diamValue"]);
    while (length <= 30 * diam) {
      let Qres = 0;
      Qres = MethodPGC(soilList, diam, length, NF, 1, 1, 1);

      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diam;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    console.log(result);

    return result;
  }
};

export const PGCDiamIter = (soilList, units, dimensions, materials, NF) => {
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
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]) / 100;
    while (diam <= 200) {
      let Qres = 0;
      Qres = MethodPGC(soilList, diam / 100, length, NF, 100, 1000, 10);

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
    let volume = Volume(diamR, length, 1);
    result[0]["vol"] = volume;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    result[0]["diam"] = diamR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]);

    while (diam <= 200) {
      let Qres = 0;
      Qres = MethodPGC(soilList, diam / 100, length, NF, 1, 1, 1);

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
    let volume = Volume(diamR, length, 1000);
    result[0]["vol"] = volume;
    result[0]["diam"] = diamR / 100;
    result[0]["length"] = length;
    result[0]["Qest"] = Qestr;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const PGCQsolWth = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation,
  NF
) => {
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let results = [];
  let diam = 60;
  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    while (diam <= 200) {
      let res = PGCLenIterAux(
        soilList,
        units,
        dimensions,
        Fc,
        Fy,
        diam,
        solicitation,
        NF
      );

      if (res[0]["Qadm"] > Qsol) {
        results.push(res);
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

    let min = minVolume(results);
    return min;
  }

  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    while (diam <= 200) {
      let res = PGCLenIterAux(
        soilList,
        units,
        dimensions,
        Fc,
        Fy,
        diam,
        solicitation,
        NF
      );

      if (res[0]["Qadm"] > Qsol) {
        results.push(res);
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

    let min = minVolume(results);
    return min;
  }
};

export const PGCLenIterAux = (
  soilList,
  units,
  dimensions,
  Fc,
  Fy,
  diameter,
  solicitation,
  NF
) => {
  const result = [{ Qadm: 0, Qest: 0, Qsol: 0, diam: 0, length: 0, vol: 0 }];
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let Qadm = 0;
  let lengthR = 0;
  let length = 6;
  let Lestratos = 0;
  //Unidades en kgf/cm

  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = diameter / 100;
    while (Lestratos / 100 > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = MethodPGC(soilList, diam, length, NF, 100, 1000, 10);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }

    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam * 100, lengthR * 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = lengthR * 100;
    result[0]["Qadm"] = Qadm;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = diameter / 100;
    while (Lestratos > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = MethodPGC(soilList, diam, length, NF, 1, 1, 1);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diam;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const PGCLenInterQsol = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation,
  NF
) => {
  const result = [{ Qadm: 0, Qest: 0, Qsol: 0, diam: 0, length: 0, vol: 0 }];
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  let Qadm = 0;
  let lengthR = 0;
  let length = 6;
  let Lestratos = 0;
  //Unidades en kgf/cm

  if (
    units[0]["unitValue"] === "1" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = parseFloat(dimensions[0]["diamValue"]) / 100;
    while (Lestratos / 100 > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = MethodPGC(soilList, diam, length, NF, 100, 1000, 10);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }

    if (Qsol > Qadm) {
      return "No se encontró una longitud que cumpla con la solicitación de carga ingresada. Por favor modifique el diámetro del pilote";
    }

    let Qestr = Qestructural(diam * 100, Fc, Fy, 1);
    let volume = Volume(diam * 100, lengthR * 100, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diam * 100;
    result[0]["length"] = lengthR * 100;
    result[0]["Qadm"] = Qadm;
    return result;
  }
  if (
    units[0]["unitValue"] === "2" &&
    !dimensions[0]["diamIter"] &&
    dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    for (let i = 0; i < soilList.length; i++) {
      Lestratos += parseFloat(soilList[i]["espesor"]);
    }
    const diam = parseFloat(dimensions[0]["diamValue"]);
    while (Lestratos > length && Qsol > Qadm && length <= 30 * diam) {
      let Qres = 0;
      Qres = MethodPGC(soilList, diam, length, NF, 1, 1, 1);
      if (Qadm < Qres) {
        Qadm = Qres;
        lengthR = length;
      }
      length += 1;
    }

    if (Qsol > Qadm) {
      return "No se encontró una longitud que cumpla con la solicitación de carga ingresada. Por favor modifique el diámetro del pilote";
    }
    let Qestr = Qestructural(diam * 100, Fc, Fy, 1000);
    let volume = Volume(diam, lengthR, 1);
    result[0]["vol"] = volume;
    result[0]["Qest"] = Qestr;
    result[0]["Qsol"] = Qsol;
    result[0]["diam"] = diam;
    result[0]["length"] = lengthR;
    result[0]["Qadm"] = Qadm;
    return result;
  }
};

export const PGCDiamIterQsol = (
  soilList,
  units,
  dimensions,
  materials,
  solicitation,
  NF
) => {
  const result = [{ Qadm: 0, Qsol: 0, Qest: 0, diam: 0, length: 0, vol: 0 }];
  const Fc = parseFloat(materials[0]["fc"]);
  const Fy = parseFloat(materials[0]["fy"]);
  const Qsol = parseFloat(solicitation[0]["QsolValue"]);
  let Qadm = 0;
  let results = [];
  let diam = 60;
  if (
    units[0]["unitValue"] === "1" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]) / 100;
    while (diam <= 200 && Qsol > Qadm) {
      Qadm = MethodPGC(soilList, diam / 100, length, NF, 100, 1000, 10);
      if (Qadm > Qsol) {
        let Qestr = Qestructural(diam, Fc, Fy, 1);
        let volume = Volume(diam, length * 100, 1);
        result[0]["vol"] = volume;
        result[0]["Qadm"] = Qadm;
        result[0]["Qsol"] = Qsol;
        result[0]["diam"] = diam;
        result[0]["length"] = length * 100;
        result[0]["Qest"] = Qestr;
        results.push(result);
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
    let min = minVolume(results);
    return min;
  }

  if (
    units[0]["unitValue"] === "2" &&
    dimensions[0]["diamIter"] &&
    !dimensions[0]["lengthIter"] &&
    !dimensions[0]["withoutDim"]
  ) {
    const length = parseFloat(dimensions[0]["lengthValue"]);
    while (diam <= 200 && Qsol > Qadm) {
      Qadm = MethodPGC(soilList, diam / 100, length, NF, 1, 1, 1);
      if (Qadm > Qsol) {
        let Qestr = Qestructural(diam, Fc, Fy, 1000);
        let volume = Volume(diam / 100, length, 1);
        result[0]["vol"] = volume;
        result[0]["Qadm"] = Qadm;
        result[0]["diam"] = diam / 100;
        result[0]["Qsol"] = Qsol;
        result[0]["length"] = length;
        result[0]["Qest"] = Qestr;
        results.push(result);
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
    let min = minVolume(results);
    return min;
  }
};
