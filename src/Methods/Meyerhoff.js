import { pi, pow, round } from "mathjs";

function roundToCero(num) {
  return +(round(num + "e+0") + "e-0");
}

function roundToTwo(num) {
  return +(round(num + "e+2") + "e-2");
}

export const MeyerhoffKgfLen = (diam, length, soilList) => {
  try {
    let fricc = 0; //Coeficiente de fricción kgf/cm2
    let Lrelleno = 0;
    let Lefect = 0;
    let Qp = 0;
    let Qf = 0;
    let Fn = 0;
    let Qadm = 0;
    let Lacum = 0; //Acumulador de espesores
    let Np = 0; //Numero de golpes en la punta del pilote
    let Nf = 0; //Numero de golpes promedio en el fuste del pilote
    let estatrosTot = 0; //Numero de estratos totales
    let NfAcum = 0; //Numero acum de golpes en el fuste
    let estratosF = 0; //Numero de estratos en el fuste

    let longPerfil = 0;

    for (let i = 0; i < soilList.length; i++) {
      longPerfil += parseFloat(soilList[i]["espesor"]);
      if (soilList[i]["typeValue"] === "1") {
        Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
        fricc = 0.2;
        Lacum += parseFloat(soilList[i]["espesor"]);
      }
      if (soilList[i]["typeValue"] === "2") {
        Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
        fricc = 0.6;
        Lacum += parseFloat(soilList[i]["espesor"]);
      }
      if (
        !(soilList[i]["typeValue"] === "1") &&
        !(soilList[i]["typeValue"] === "2") &&
        Lacum < length
      ) {
        NfAcum += parseFloat(soilList[i]["ngp"]);
        Lacum += parseFloat(soilList[i]["espesor"]);
        estratosF += 1;
      }
      if (
        !(soilList[i]["typeValue"] === "1") &&
        !(soilList[i]["typeValue"] === "2") &&
        Lacum == length
      ) {
        Np = parseFloat(soilList[i]["ngp"]);
      }
      if (
        Lacum >= length &&
        (soilList[i]["typeValue"] === "7" ||
          soilList[i]["typeValue"] === "8" ||
          soilList[i]["typeValue"] === "9" ||
          soilList[i]["typeValue"] === "10" ||
          soilList[i]["typeValue"] === "11" ||
          soilList[i]["typeValue"] === "30" ||
          soilList[i]["typeValue"] === "31" ||
          soilList[i]["typeValue"] === "32" ||
          soilList[i]["typeValue"] === "34" ||
          soilList[i]["typeValue"] === "37")
      ) {
        return "Este método de cálculo no contempla la presencia de suelos cohesivos en la punta del pilote. \n Por favor, seleccione otro método de cálculo.";
      }
      estatrosTot += 1;
    }

    Lefect = length - Lrelleno;

    if (Lefect < 6 * diam) {
      return "No se cumple la condición de que la longitud efectiva del pilote debe ser mayor o igual a 6 veces el diámetro del pilote. \n Por favor, modifique las dimensiones ingresadas.";
    }
    Nf = NfAcum / estratosF;
    console.log("Nf: " + Nf);

    if (Np == 0) {
      Np = parseFloat(soilList[estatrosTot - 1]["ngp"]);
    }
    if (Nf > 30) {
      Nf = 30;
    }
    if (Np > 30) {
      Np = 30;
    }
    console.log("Np: " + Np);

    Qp = (4 * Np * (pi * pow(diam / 2, 2))) / 3;

    Qf = (4 * Nf * ((2 * pi * (diam / 2) * Lefect) / 200)) / 3;
    Fn = 2 * pi * (diam / 2) * fricc * Lrelleno;

    console.log("Qp: " + Qp);
    console.log("Qf: " + Qf);
    console.log("Fn: " + Fn);
    Qadm = Qp + Qf - Fn;
    Qadm = roundToCero(Qadm);

    if (longPerfil <= length) {
      return "La longitud del pilote es mayor que la longitud total de los estratos. \n Por favor, modifique las dimensiones ingresadas.";
    }
    return Qadm;
  } catch (error) {
    console.log(error);
    return "Ocurrió un error en el cálculo, verifique los datos ingresados.";
  }
};

export const MeyerhoffTonLen = (diam, length, soilList) => {
  try {
    let fricc = 0; //Coeficiente de fricción kgf/cm2
    let Lrelleno = 0;
    let Lefect = 0;
    let Qp = 0;
    let Qf = 0;
    let Fn = 0;
    let Qadm = 0;
    let Lacum = 0; //Acumulador de espesores
    let Np = 0; //Numero de golpes en la punta del pilote
    let Nf = 0; //Numero de golpes promedio en el fuste del pilote
    let estatrosTot = 0; //Numero de estratos totales
    let NfAcum = 0; //Numero acum de golpes en el fuste
    let estratosF = 0; //Numero de estratos en el fuste
    let longPerfil = 0;

    for (let i = 0; i < soilList.length; i++) {
      longPerfil += parseFloat(soilList[i]["espesor"]);
      if (soilList[i]["typeValue"] === "1") {
        Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
        fricc = 0.2;
        Lacum += parseFloat(soilList[i]["espesor"]);
      }
      if (soilList[i]["typeValue"] === "2") {
        Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
        fricc = 0.6;
        Lacum += parseFloat(soilList[i]["espesor"]);
      }
      if (
        !(soilList[i]["typeValue"] === "1") &&
        !(soilList[i]["typeValue"] === "2") &&
        Lacum < length / 100
      ) {
        NfAcum += parseFloat(soilList[i]["ngp"]);
        Lacum += parseFloat(soilList[i]["espesor"]);
        estratosF += 1;
      }
      if (
        !(soilList[i]["typeValue"] === "1") &&
        !(soilList[i]["typeValue"] === "2") &&
        Lacum == length / 100
      ) {
        Np = parseFloat(soilList[i]["ngp"]);
      }
      if (
        Lacum >= length / 100 &&
        (soilList[i]["typeValue"] === "7" ||
          soilList[i]["typeValue"] === "8" ||
          soilList[i]["typeValue"] === "9" ||
          soilList[i]["typeValue"] === "10" ||
          soilList[i]["typeValue"] === "11" ||
          soilList[i]["typeValue"] === "30" ||
          soilList[i]["typeValue"] === "31" ||
          soilList[i]["typeValue"] === "32" ||
          soilList[i]["typeValue"] === "34" ||
          soilList[i]["typeValue"] === "37")
      ) {
        return "Este método de cálculo no contempla la presencia de suelos cohesivos en la punta del pilote. \n Por favor, seleccione otro método de cálculo.";
      }
      estatrosTot += 1;
    }

    Lrelleno = Lrelleno * 100;
    Lefect = length - Lrelleno;
    if (Lefect < 6 * diam) {
      return "No se cumple la condición de que la longitud efectiva del pilote debe ser mayor o igual a 6 veces el diámetro del pilote. \n Por favor, modifique las dimensiones ingresadas.";
    }
    Nf = NfAcum / estratosF;

    if (Np == 0) {
      Np = parseFloat(soilList[estatrosTot - 1]["ngp"]);
    }
    if (Nf > 30) {
      Nf = 30;
    }
    if (Np > 30) {
      Np = 30;
    }

    Lacum = Lacum * 100;

    Qp = (4 * Np * (pi * pow(diam / 2, 2))) / 3;
    Qf = (4 * Nf * ((2 * pi * (diam / 2) * Lefect) / 200)) / 3;
    Fn = 2 * pi * (diam / 2) * fricc * Lrelleno;

    Qadm = Qp + Qf - Fn;

    Qadm = Qadm / 1000;
    Qadm = roundToCero(Qadm);

    if (longPerfil <= length / 100) {
      return "La longitud del pilote es mayor que la longitud total de los estratos. \n Por favor, modifique las dimensiones ingresadas.";
    }
    return Qadm;
  } catch (error) {
    console.log(error);
    return "Ocurrió un error en el cálculo, verifique los datos ingresados.";
  }
};

export const MeyerhoffTon = (diam, length, soilList) => {
  try {
    let fricc = 0; //Coeficiente de fricción kgf/cm2
    let Lrelleno = 0;
    let Lefect = 0;
    let Qp = 0;
    let Qf = 0;
    let Fn = 0;
    let Qadm = 0;
    let Lacum = 0; //Acumulador de espesores
    let Np = 0; //Numero de golpes en la punta del pilote
    let Nf = 0; //Numero de golpes promedio en el fuste del pilote
    let estatrosTot = 0; //Numero de estratos totales
    let NfAcum = 0; //Numero acum de golpes en el fuste
    let estratosF = 0; //Numero de estratos en el fuste

    let longPerfil = 0;

    for (let i = 0; i < soilList.length; i++) {
      longPerfil += parseFloat(soilList[i]["espesor"]);
      if (soilList[i]["typeValue"] === "1") {
        Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
        fricc = 0.2;
        Lacum += parseFloat(soilList[i]["espesor"]);
      }
      if (soilList[i]["typeValue"] === "2") {
        Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
        fricc = 0.6;
        Lacum += parseFloat(soilList[i]["espesor"]);
      }
      if (
        !(soilList[i]["typeValue"] === "1") &&
        !(soilList[i]["typeValue"] === "2") &&
        Lacum < length / 100
      ) {
        NfAcum += parseFloat(soilList[i]["ngp"]);
        Lacum += parseFloat(soilList[i]["espesor"]);
        estratosF += 1;
      }
      if (
        !(soilList[i]["typeValue"] === "1") &&
        !(soilList[i]["typeValue"] === "2") &&
        Lacum == length / 100
      ) {
        Np = parseFloat(soilList[i]["ngp"]);
      }
      if (
        Lacum >= length / 100 &&
        (soilList[i]["typeValue"] === "7" ||
          soilList[i]["typeValue"] === "8" ||
          soilList[i]["typeValue"] === "9" ||
          soilList[i]["typeValue"] === "10" ||
          soilList[i]["typeValue"] === "11" ||
          soilList[i]["typeValue"] === "30" ||
          soilList[i]["typeValue"] === "31" ||
          soilList[i]["typeValue"] === "32" ||
          soilList[i]["typeValue"] === "34" ||
          soilList[i]["typeValue"] === "37")
      ) {
        return "Este método de cálculo no contempla la presencia de suelos cohesivos en la punta del pilote. \n Por favor, seleccione otro método de cálculo.";
      }
      estatrosTot += 1;
    }

    Lrelleno = Lrelleno * 100;
    Lefect = length - Lrelleno;

    if (Lefect < 6 * diam) {
      return "No se cumple la condición de que la longitud efectiva del pilote debe ser mayor o igual a 6 veces el diámetro del pilote. \n Por favor, modifique las dimensiones ingresadas.";
    }
    Nf = NfAcum / estratosF;

    if (Np == 0) {
      Np = parseFloat(soilList[estatrosTot - 1]["ngp"]);
    }
    if (Nf > 30) {
      Nf = 30;
    }
    if (Np > 30) {
      Np = 30;
    }

    Lacum = Lacum * 100;

    Qp = (4 * Np * (pi * pow(diam / 2, 2))) / 3;

    Qf = (4 * Nf * ((2 * pi * (diam / 2) * Lefect) / 200)) / 3;
    Fn = 2 * pi * (diam / 2) * fricc * Lrelleno;

    Qadm = Qp + Qf - Fn;
    Qadm = Qadm / 1000;
    if (longPerfil <= length / 100) {
      return "La longitud del pilote es mayor que la longitud total de los estratos. \n Por favor, modifique las dimensiones ingresadas.";
    }
    Qadm = roundToCero(Qadm);
    return Qadm;
  } catch (error) {
    console.log(error);
    return "Ocurrió un error en el cálculo, verifique los datos ingresados.";
  }
};

export const MeyerhoffKgf = (diam, length, soilList) => {
  try {
    let fricc = 0; //Coeficiente de fricción kgf/cm2
    let Lrelleno = 0;
    let Lefect = 0;
    let Qp = 0;
    let Qf = 0;
    let Fn = 0;
    let Qadm = 0;
    let Lacum = 0; //Acumulador de espesores
    let Np = 0; //Numero de golpes en la punta del pilote
    let Nf = 0; //Numero de golpes promedio en el fuste del pilote
    let estatrosTot = 0; //Numero de estratos totales
    let NfAcum = 0; //Numero acum de golpes en el fuste
    let estratosF = 0; //Numero de estratos en el fuste

    let longPerfil = 0;

    for (let i = 0; i < soilList.length; i++) {
      longPerfil += parseFloat(soilList[i]["espesor"]);
      if (soilList[i]["typeValue"] === "1") {
        Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
        fricc = 0.2;
        Lacum += parseFloat(soilList[i]["espesor"]);
      }
      if (soilList[i]["typeValue"] === "2") {
        Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
        fricc = 0.6;
        Lacum += parseFloat(soilList[i]["espesor"]);
      }
      if (
        !(soilList[i]["typeValue"] === "1") &&
        !(soilList[i]["typeValue"] === "2") &&
        Lacum < length
      ) {
        NfAcum += parseFloat(soilList[i]["ngp"]);
        Lacum += parseFloat(soilList[i]["espesor"]);
        estratosF += 1;
      }
      if (
        !(soilList[i]["typeValue"] === "1") &&
        !(soilList[i]["typeValue"] === "2") &&
        Lacum == length
      ) {
        Np = parseFloat(soilList[i]["ngp"]);
      }
      if (
        Lacum >= length &&
        (soilList[i]["typeValue"] === "7" ||
          soilList[i]["typeValue"] === "8" ||
          soilList[i]["typeValue"] === "9" ||
          soilList[i]["typeValue"] === "10" ||
          soilList[i]["typeValue"] === "11" ||
          soilList[i]["typeValue"] === "30" ||
          soilList[i]["typeValue"] === "31" ||
          soilList[i]["typeValue"] === "32" ||
          soilList[i]["typeValue"] === "34" ||
          soilList[i]["typeValue"] === "37")
      ) {
        return "Este método de cálculo no contempla la presencia de suelos cohesivos en la punta del pilote. \n Por favor, seleccione otro método de cálculo.";
      }
      estatrosTot += 1;
    }

    Lefect = length - Lrelleno;

    if (Lefect < 6 * diam) {
      return "No se cumple la condición de que la longitud efectiva del pilote debe ser mayor o igual a 6 veces el diámetro del pilote. \n Por favor, modifique las dimensiones ingresadas.";
    }
    Nf = NfAcum / estratosF;

    if (Np == 0) {
      Np = parseFloat(soilList[estatrosTot - 1]["ngp"]);
    }
    if (Nf > 30) {
      Nf = 30;
    }
    if (Np > 30) {
      Np = 30;
    }

    Qp = (4 * Np * (pi * pow(diam / 2, 2))) / 3;
    Qf = 4 * Nf * ((2 * pi * (diam / 2) * Lefect) / (200 * 3));
    Fn = 2 * pi * (diam / 2) * fricc * Lrelleno;
    Qadm = Qp + Qf - Fn;
    Qadm = roundToCero(Qadm);

    if (longPerfil <= length) {
      return "La longitud del pilote es mayor que la longitud total de los estratos. \n Por favor, modifique las dimensiones ingresadas.";
    }
    return Qadm;
  } catch (error) {
    console.log(error);
    return "Ocurrió un error en el cálculo, verifique los datos ingresados.";
  }
};

export const Qestructural = (diam, Fconcreto, Fy, factor) => {
  try {
    let Q = 0;
    Q =
      0.225 *
      (pi * pow(diam / 2, 2) * Fconcreto + 0.005 * pi * pow(diam / 2, 2) * Fy);
    return roundToCero(Q / factor);
  } catch (error) {
    console.log(error);
    return "Ocurrió un error en el cálculo, verifique los datos ingresados.";
  }
};

export const Volume = (diam, length, factor) => {
  try {
    let V = 0;

    V = pi * pow(diam / 2, 2) * length;
    return roundToTwo(V / factor);
  } catch (error) {
    console.log(error);
    return "Ocurrió un error en el cálculo, verifique los datos ingresados.";
  }
};
