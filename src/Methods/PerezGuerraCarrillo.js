import { sqrt, tan, pow, sin, unit, pi, count } from "mathjs";
import { roundToCero } from "./CaquotKerisel";

//Valores de N*c y N*q
const capacityFactorsMixedSoil = [
  { phi: 0, Nc: 9.5, Nq: 1 },
  { phi: 1, Nc: 9.75, Nq: 1.286 },
  { phi: 2, Nc: 9.9, Nq: 1.456 },
  { phi: 3, Nc: 10.0, Nq: 1.571 },
  { phi: 4, Nc: 10.714, Nq: 1.714 },
  { phi: 5, Nc: 11.429, Nq: 1.829 },
  { phi: 6, Nc: 11.714, Nq: 2.1 },
  { phi: 7, Nc: 12.857, Nq: 2.514 },
  { phi: 8, Nc: 14.0, Nq: 2.8 },
  { phi: 9, Nc: 14.285, Nq: 2.914 },
  { phi: 10, Nc: 15.429, Nq: 3.429 },
  { phi: 11, Nc: 15.714, Nq: 4.0 },
  { phi: 12, Nc: 17.143, Nq: 4.5 },
  { phi: 13, Nc: 18.571, Nq: 5.3 },
  { phi: 14, Nc: 18.825, Nq: 5.5 },
  { phi: 15, Nc: 20.0, Nq: 6.66 },
  { phi: 16, Nc: 22.857, Nq: 7.0 },
  { phi: 17, Nc: 24.428, Nq: 8.0 },
  { phi: 18, Nc: 28.571, Nq: 9.2 },
  { phi: 19, Nc: 30.0, Nq: 11.428 },
  { phi: 20, Nc: 31.429, Nq: 12.857 },
  { phi: 21, Nc: 34.286, Nq: 14.286 },
  { phi: 22, Nc: 37.143, Nq: 16.857 },
  { phi: 23, Nc: 40.0, Nq: 17.714 },
  { phi: 24, Nc: 46.0, Nq: 21.143 },
  { phi: 25, Nc: 50.5, Nq: 28.571 },
  { phi: 26, Nc: 60.0, Nq: 30.0 },
  { phi: 27, Nc: 68.0, Nq: 34.286 },
  { phi: 28, Nc: 75.0, Nq: 35.143 },
  { phi: 29, Nc: 80.0, Nq: 45.0 },
  { phi: 30, Nc: 96.0, Nq: 51.0 },
  { phi: 31, Nc: 100.0, Nq: 66.67 },
  { phi: 32, Nc: 114.286, Nq: 73.33 },
  { phi: 33, Nc: 135.714, Nq: 80.0 },
  { phi: 34, Nc: 145.714, Nq: 100.0 },
  { phi: 35, Nc: 180.0, Nq: 128.571 },
  { phi: 36, Nc: 200.0, Nq: 142.857 },
  { phi: 37, Nc: 262.857, Nq: 178.571 },
  { phi: 38, Nc: 328.571, Nq: 234.286 },
  { phi: 39, Nc: 342.857, Nq: 271.429 },
  { phi: 40, Nc: 380.0, Nq: 322.857 },
  { phi: 41, Nc: 420.0, Nq: 371.429 },
  { phi: 42, Nc: 533.33, Nq: 480.0 },
  { phi: 43, Nc: 660.0, Nq: 586.67 },
  { phi: 44, Nc: 800.0, Nq: 800.0 },
  { phi: 45, Nc: 900.0, Nq: 900.0 },
];

//Trabaja en metros
const N60 = (soilList, conv1) => {
  try {
    //conv1 es 100 para kgf/cm

    let ArrayN60 = [];
    let Lacum = 0;

    for (let i = 0; i < soilList.length; i++) {
      let espesor = parseFloat(soilList[i]["espesor"]) / conv1;
      let N = parseFloat(soilList[i]["ngp"]);
      Lacum += espesor;
      while (espesor > 0) {
        let N60 = 0;
        if (Lacum - espesor + 1 <= 4) {
          N60 = 1.67 * 0.45 * 1.0 * N * 0.75;
        }
        if (Lacum - espesor + 1 > 4 && Lacum - espesor + 1 <= 6) {
          N60 = 1.67 * 0.45 * 1.0 * N * 0.85;
        }
        if (Lacum - espesor + 1 > 6 && Lacum - espesor + 1 <= 10) {
          N60 = 1.67 * 0.45 * 1.0 * N * 0.95;
        }
        if (Lacum - espesor + 1 > 10) {
          N60 = 1.67 * 0.45 * 1.0 * N * 1.0;
        }
        ArrayN60.push(N60);
        espesor = espesor - 1;
      }
    }

    return ArrayN60;
  } catch (error) {
    console.log(error);
    return "Error en la función N60";
  }
};

//TRABAJA EN TON/M
const vertEfectStress = (soilList, NF, conv1, conv4) => {
  try {
    const stressArray = [];
    let Lacum = 0;
    let gW = 1; //Peso especifico del agua en Ton/m3

    //Conv1 es 100 para kgf/cm
    //conv4 es 1000 para kgf/cm3
    //Conv2 es 0.1 para kgf/cm

    for (let i = 0; i < soilList.length; i++) {
      let espesor = parseFloat(soilList[i]["espesor"]) / conv1;
      let dens = parseFloat(soilList[i]["peso"]) * conv4;
      Lacum += espesor;
      while (espesor > 0) {
        let vo = 0;
        if (NF === 0) {
          vo = dens * (Lacum - espesor + 1);
        }
        if (Lacum > NF && NF != 0) {
          vo = dens * (Lacum - espesor + 1) - gW * (Lacum - espesor + 1 - NF);
        }
        if (Lacum <= NF && NF != 0) {
          vo = dens * (Lacum - espesor + 1);
        }
        stressArray.push(vo);
        espesor = espesor - 1;
      }
    }

    return stressArray;
  } catch (error) {
    console.log(error);
    return "Error en la función vertEfectStress";
  }
};

const N160 = (soilList, NF, conv1, conv4, N60) => {
  try {
    const ArrayN160 = [];

    let stress;
    if (NF["NFStart"] == "" || NF["NF"] === false) {
      stress = vertEfectStress(soilList, 0, conv1, conv4);
    }
    if (NF["NFStart"] != "" && NF["NF"] === true) {
      let freatico = parseFloat(NF["NFStart"]) / conv1;
      stress = vertEfectStress(soilList, freatico, conv1, conv4);
    }

    for (let i = 0; i < N60.length; i++) {
      let N160 = N60[i] * sqrt(10 / stress[i]);
      ArrayN160.push(N160);
    }

    return ArrayN160;
  } catch (error) {
    console.log(error);
    return "Error en la función N160";
  }
};

export const MethodPGC = (
  soilList,
  diam,
  length,
  NF,
  factor1,
  factor4,
  factor5
) => {
  try {
    //factor5 es 10 para kgf/cm3 y 1 para ton/m3
    //factor4 es 1000 para kgf/cm3 y 1 para ton/m3
    let N60values = N60(soilList, factor1);
    let N160values = N160(soilList, NF, factor1, factor4, N60values);

    let Qp = 0;
    let Lefect = 0;
    let Lrelleno = 0;
    let Fs = 0;
    let Qadm = 0;
    let Ltotal = length; //Longitud total en metros
    let diameter = diam; //Diametro en metros
    let Laux = 0;
    let Lacum = 0;
    let Nqp = 0; //En la punta
    let cu = 0;
    let st = 0; //esfuerzo vertical en la punta
    let Lc = 0; //Longitud critica

    //Capacidad por punta suelo mixto
    let cont = 0;
    while (Ltotal > Laux && cont < soilList.length) {
      Laux += parseFloat(soilList[cont]["espesor"]) / factor1;
      cont++;
    }

    for (let i = 0; i < soilList.length; i++) {
      if (soilList[i]["typeValue"] == 1 || soilList[i]["typeValue"] == 2) {
        Lrelleno += parseFloat(soilList[i]["espesor"]) / factor1;
      }
    }

    Lefect = Ltotal - Lrelleno;

    cont = cont - 1;
    if (Laux >= Ltotal) {
      for (let u = 0; u < capacityFactorsMixedSoil.length; u++) {
        if (
          roundToCero(parseInt(soilList[cont]["phi"])) ==
          capacityFactorsMixedSoil[u]["phi"]
        ) {
          Nqp = capacityFactorsMixedSoil[u]["Nq"];
        }
      }
    }

    if (parseFloat(soilList[cont]["phi"]) > 20) {
      Lc = pow(10, (parseFloat(soilList[cont]["phi"]) - 7) / 27) * diameter;
    }
    if (parseFloat(soilList[cont]["phi"]) <= 20) {
      Lc = 3 * diameter;
    }

    let aux = 0;
    let Lcritica = 0;

    while (Lc > Lcritica && aux < soilList.length) {
      Lcritica += parseFloat(soilList[aux]["espesor"]) / factor1;
      aux++;
    }

    let densP = parseFloat(soilList[aux - 1]["peso"]) * factor4;

    st = densP * Lc;

    cu = parseFloat(soilList[cont]["cohesion"]) * factor5;

    Qp = 9 * cu + st * Nqp;

    let qpmax = N160values[length - 1] * 20;

    if (Qp > qpmax) {
      Qp = qpmax;
    }

    //Capacidad por fuste

    let verticalStresses;
    if (NF["NFStart"] != "" && NF["NF"]) {
      let Nf = parseFloat(NF["NFStart"]);
      verticalStresses = vertEfectStress(soilList, Nf, factor1, factor4);
    }
    if (NF["NFStart"] == "" || NF["NF"] === false) {
      verticalStresses = vertEfectStress(soilList, 0, factor1, factor4);
    }

    console.log("verticalStresses: " + verticalStresses);

    let Fsrelleno = 0;
    let counter = 0;

    const Pa = 10.33;
    let FsLim = 0;
    for (let i = 0; i < soilList.length; i++) {
      let alpha = 0;
      let espesor = parseFloat(soilList[i]["espesor"]) / factor1;
      let phi = parseFloat(soilList[i]["phi"]);
      Lacum += espesor;
      let cohesion = parseFloat(soilList[i]["cohesion"]) * factor5;

      let d = (2 / 3) * phi;
      let b = tan(unit(d, "deg"));
      let K = 1 - sin(unit(phi, "deg"));
      if (
        (soilList[i]["typeValue"] == 1 || soilList[i]["typeValue"] == 2) &&
        cohesion != 0
      ) {
        alpha = 0.31 + 0.17 * (Pa / cohesion);
        while (espesor > 0 && counter < length) {
          if (alpha > 1) {
            alpha = 1;
          }
          Fsrelleno += verticalStresses[counter] * b * K + alpha * cohesion;
          espesor = espesor - 1;
          counter++;
        }
      }
      if (
        (soilList[i]["typeValue"] == 1 || soilList[i]["typeValue"] == 2) &&
        cohesion == 0
      ) {
        while (espesor > 0 && counter < length) {
          Fsrelleno += verticalStresses[counter] * b * K;

          espesor = espesor - 1;
          counter++;
        }
      }
      if (
        soilList[i]["typeValue"] != 2 &&
        soilList[i]["typeValue"] != 1 &&
        cohesion != 0
      ) {
        alpha = 0.31 + 0.17 * (Pa / cohesion);

        while (espesor > 0 && counter < length) {
          if (alpha > 1) {
            alpha = 1;
          }

          

          Fs += verticalStresses[counter] * b * K + alpha * cohesion;

          FsLim += N160values[counter] * 0.1;
          espesor = espesor - 1;
          counter++;
        }
      }
      if (
        soilList[i]["typeValue"] != 1 &&
        soilList[i]["typeValue"] != 2 &&
        cohesion === 0
      ) {
        while (espesor > 0 && counter < length) {
          Fs += verticalStresses[counter] * b * K;

          FsLim += N160values[counter] * 0.1;
          espesor = espesor - 1;
          counter++;
        }
      }
    }

    Fs = Fs - Fsrelleno;

    if (Lacum <= length) {
      return "La longitud del pilote es mayor que la longitud total de los estratos. \n Por favor, modifique las dimensiones ingresadas.";
    }

    if (Lefect < 6 * diam) {
      return "No se cumple la condición de que la longitud efectiva del pilote debe ser mayor o igual a 6 veces el diámetro del pilote. \n Por favor, modifique las dimensiones ingresadas.";
    }

    if (Fs > FsLim) {
      Fs = FsLim;
    }
    console.log("Fs: " + Fs);

    if (diameter >= 1.2) {
      Qp = (120 / (diameter * 100)) * Qp;
    }
    
    let ap = pi * pow(diameter / 2, 2);
    let alat = 2 * pi * (diameter / 2) * Lefect;
    
    Qadm = (Qp * ap) / 3 + (Fs * alat) / 2;
    
    return roundToCero(Qadm * factor4);
  } catch (error) {
    console.log(error);
    return "Error en el método de Pérez-Guerra y Carrillo";
  }
};
