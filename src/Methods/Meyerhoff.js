import { pi, pow, round } from "mathjs";

function roundToFour(num) {
  return +(round(num + "e+4") + "e-4");
}

export const MeyerhoffKgfLen = (diam, length, soilList) => {
  let fricc = 0.3; //Coeficiente de fricción kgf/cm2
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

  for (let i = 0; i < soilList.length; i++) {
    if (soilList[i]["typeValue"] === "1") {
      Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
      Lacum += parseFloat(soilList[i]["espesor"]);
    }
    if (!(soilList[i]["typeValue"] === "1") && Lacum < length) {
      NfAcum += parseFloat(soilList[i]["ngp"]);
      Lacum += parseFloat(soilList[i]["espesor"]);
      estratosF += 1;
    }
    if (!(soilList[i]["typeValue"] === "1") && Lacum == length) {
      Np = parseFloat(soilList[i]["ngp"]);
    }
    if (
      Lacum >= length &&
      (soilList[i]["typeValue"] === "4" ||
        soilList[i]["typeValue"] === "5" ||
        soilList[i]["typeValue"] === "6" ||
        soilList[i]["typeValue"] === "7" ||
        soilList[i]["typeValue"] === "8")
    ) {
      return "No es recomendable utilizar el método de Meyerhof para un pilote que tenga suelo cohesivo en la punta. \n Por favor, seleccione otro método de cálculo.";
    }
    estatrosTot += 1;
  }

  Lefect = length - Lrelleno;

  if (Lefect < 6 * diam) {
    return "No se cumple la condición de que la longitud efectiva del pilote debe ser mayor o igual a 6 veces el diámetro del pilote. \n Por favor, modifique las dimensiones ingresadas.";
  }
  Nf = NfAcum / estratosF;

  console.log(Nf);
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
  console.log(Nf);
  console.log(diam);
  console.log(Lefect);
  console.log(pi);
  Qf = (4 * Nf * ((2 * pi * (diam / 2) * Lefect) / 200)) / 3;
  Fn = 2 * pi * (diam / 2) * fricc * Lrelleno;
  console.log(Qp);
  console.log(Qf);
  console.log(Fn);
  Qadm = Qp + Qf - Fn;
  Qadm = roundToFour(Qadm);
  if (Lacum <= length) {
    return "La longitud del pilote es mayor que la longitud total de los estratos. \n Por favor, modifique las dimensiones ingresadas.";
  }
  return Qadm;
};

export const MeyerhoffTonLen = (diam, length, soilList) => {
  let fricc = 0.3; //Coeficiente de fricción kgf/cm2
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

  for (let i = 0; i < soilList.length; i++) {
    if (soilList[i]["typeValue"] === "1") {
      Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
      Lacum += parseFloat(soilList[i]["espesor"]);
    }
    if (!(soilList[i]["typeValue"] === "1") && Lacum < length / 100) {
      NfAcum += parseFloat(soilList[i]["ngp"]);
      Lacum += parseFloat(soilList[i]["espesor"]);
      estratosF += 1;
    }
    if (!(soilList[i]["typeValue"] === "1") && Lacum == length / 100) {
      Np = parseFloat(soilList[i]["ngp"]);
    }
    if (
      Lacum >= length / 100 &&
      (soilList[i]["typeValue"] === "4" ||
        soilList[i]["typeValue"] === "5" ||
        soilList[i]["typeValue"] === "6" ||
        soilList[i]["typeValue"] === "7" ||
        soilList[i]["typeValue"] === "8")
    ) {
      return "No es recomendable utilizar el método de Meyerhof para un pilote que tenga suelo cohesivo en la punta. \n Por favor, seleccione otro método de cálculo.";
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

  console.log(Qp);
  console.log(Qf);
  console.log(Fn);

  Qadm = Qp + Qf - Fn;
  console.log(Qadm);
  Qadm = Qadm / 1000;
  Qadm = roundToFour(Qadm);
  if (Lacum <= length) {
    return "La longitud del pilote es mayor que la longitud total de los estratos. \n Por favor, modifique las dimensiones ingresadas.";
  }
  return Qadm;
};

export const MeyerhoffTon = (diam, length, soilList) => {
  let fricc = 0.3; //Coeficiente de fricción kgf/cm2
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

  for (let i = 0; i < soilList.length; i++) {
    if (soilList[i]["typeValue"] === "1") {
      Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
      Lacum += parseFloat(soilList[i]["espesor"]);
    }
    if (!(soilList[i]["typeValue"] === "1") && Lacum < length / 100) {
      NfAcum += parseFloat(soilList[i]["ngp"]);
      Lacum += parseFloat(soilList[i]["espesor"]);
      estratosF += 1;
    }
    if (!(soilList[i]["typeValue"] === "1") && Lacum == length / 100) {
      Np = parseFloat(soilList[i]["ngp"]);
    }
    if (
      Lacum >= length / 100 &&
      (soilList[i]["typeValue"] === "4" ||
        soilList[i]["typeValue"] === "5" ||
        soilList[i]["typeValue"] === "6" ||
        soilList[i]["typeValue"] === "7" ||
        soilList[i]["typeValue"] === "8")
    ) {
      return "No es recomendable utilizar el método de Meyerhof para un pilote que tenga suelo cohesivo en la punta. \n Por favor, seleccione otro método de cálculo.";
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

  console.log(Qp);
  console.log(Qf);
  console.log(Fn);

  Qadm = Qp + Qf - Fn;
  console.log(Qadm);
  Qadm = Qadm / 1000;
  Qadm = roundToFour(Qadm);
  return Qadm;
};

export const MeyerhoffKgf = (diam, length, soilList) => {
  let fricc = 0.3; //Coeficiente de fricción kgf/cm2
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

  for (let i = 0; i < soilList.length; i++) {
    if (soilList[i]["typeValue"] === "1") {
      Lrelleno = Lrelleno + parseFloat(soilList[i]["espesor"]);
      Lacum += parseFloat(soilList[i]["espesor"]);
    }
    if (!(soilList[i]["typeValue"] === "1") && Lacum < length) {
      NfAcum += parseFloat(soilList[i]["ngp"]);
      Lacum += parseFloat(soilList[i]["espesor"]);
      estratosF += 1;
    }
    if (!(soilList[i]["typeValue"] === "1") && Lacum == length) {
      Np = parseFloat(soilList[i]["ngp"]);
    }
    if (
      Lacum >= length &&
      (soilList[i]["typeValue"] === "4" ||
        soilList[i]["typeValue"] === "5" ||
        soilList[i]["typeValue"] === "6" ||
        soilList[i]["typeValue"] === "7" ||
        soilList[i]["typeValue"] === "8")
    ) {
      return "No es recomendable utilizar el método de Meyerhof para un pilote que tenga suelo cohesivo en la punta. \n Por favor, seleccione otro método de cálculo.";
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
  console.log(Qp);
  console.log(Qf);
  console.log(Fn);
  Qadm = Qp + Qf - Fn;
  Qadm = roundToFour(Qadm);
  return Qadm;
};
