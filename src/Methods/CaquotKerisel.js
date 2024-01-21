import { pi, pow, tan, round } from "mathjs";

export function roundToCero(num) {
  return +(round(num + "e+0") + "e-0");
}

function roundToFour(num) {
  return +(round(num + "e+4") + "e-4");
}

const values = [
  { phi: 0, S1: 0.0, S2: 0.0, S2p: 0.0, S3p: 0.0, S5p: 0.0 },
  { phi: 10, S1: 0.3356, S2: 2.471, S2p: 1.01, S3p: 0.2854, S5p: 1.6 },
  { phi: 11, S1: 0.4017, S2: 2.71, S2p: 1.012, S3p: 0.3314, S5p: 1.68 },
  { phi: 12, S1: 0.4774, S2: 2.973, S2p: 1.014, S3p: 0.382, S5p: 1.76 },
  { phi: 13, S1: 0.5641, S2: 3.264, S2p: 1.017, S3p: 0.4377, S5p: 1.85 },
  { phi: 14, S1: 0.6635, S2: 3.586, S2p: 1.02, S3p: 0.499, S5p: 1.95 },
  { phi: 15, S1: 0.7775, S2: 3.941, S2p: 1.023, S3p: 0.5669, S5p: 2.06 },
  { phi: 16, S1: 0.9084, S2: 4.335, S2p: 1.026, S3p: 0.6415, S5p: 2.15 },
  { phi: 17, S1: 1.059, S2: 4.772, S2p: 1.03, S3p: 0.7241, S5p: 2.28 },
  { phi: 18, S1: 1.232, S2: 5.258, S2p: 1.034, S3p: 0.8155, S5p: 2.41 },
  { phi: 19, S1: 1.431, S2: 5.798, S2p: 1.038, S3p: 0.9168, S5p: 2.55 },
  { phi: 20, S1: 1.66, S2: 6.399, S2p: 1.042, S3p: 1.029, S5p: 2.7 },
  { phi: 21, S1: 1.925, S2: 7.071, S2p: 1.047, S3p: 1.054, S5p: 2.86 },
  { phi: 22, S1: 2.231, S2: 7.821, S2p: 1.052, S3p: 1.293, S5p: 3.02 },
  { phi: 23, S1: 2.585, S2: 8.661, S2p: 1.058, S3p: 1.448, S5p: 3.21 },
  { phi: 24, S1: 2.997, S2: 9.603, S2p: 1.063, S3p: 1.621, S5p: 3.41 },
  { phi: 25, S1: 3.475, S2: 10.66, S2p: 1.07, S3p: 1.814, S5p: 3.62 },
  { phi: 26, S1: 4.032, S2: 11.85, S2p: 1.076, S3p: 2.031, S5p: 3.85 },
  { phi: 27, S1: 4.683, S2: 13.2, S2p: 1.083, S3p: 2.275, S5p: 4.11 },
  { phi: 28, S1: 5.444, S2: 14.72, S2p: 1.09, S3p: 2.55, S5p: 4.39 },
  { phi: 29, S1: 6.339, S2: 16.44, S2p: 1.098, S3p: 2.86, S5p: 4.68 },
  { phi: 30, S1: 7.391, S2: 18.4, S2p: 1.107, S3p: 3.211, S5p: 5.01 },
  { phi: 31, S1: 8.633, S2: 20.63, S2p: 1.116, S3p: 3.609, S5p: 5.4 },
  { phi: 32, S1: 10.1, S2: 23.18, S2p: 1.125, S3p: 4.062, S5p: 5.75 },
  { phi: 33, S1: 11.85, S2: 26.09, S2p: 1.135, S3p: 4.579, S5p: 6.2 },
  { phi: 34, S1: 13.94, S2: 29.44, S2p: 1.146, S3p: 5.171, S5p: 6.71 },
  { phi: 35, S1: 16.43, S2: 33.3, S2p: 1.157, S3p: 5.852, S5p: 7.27 },
  { phi: 36, S1: 19.43, S2: 37.75, S2p: 1.169, S3p: 6.636, S5p: 7.86 },
  { phi: 37, S1: 23.04, S2: 42.92, S2p: 1.182, S3p: 7.544, S5p: 8.35 },
  { phi: 38, S1: 27.43, S2: 48.93, S2p: 1.195, S3p: 8.6, S5p: 8.86 },
  { phi: 39, S1: 32.77, S2: 55.96, S2p: 1.21, S3p: 9.854, S5p: 9.3 },
  { phi: 40, S1: 39.3, S2: 64.2, S2p: 1.225, S3p: 11.27, S5p: 10.36 },
  { phi: 41, S1: 47.34, S2: 73.9, S2p: 1.242, S3p: 12.98, S5p: 12.12 },
  { phi: 42, S1: 57.29, S2: 85.37, S2p: 1.259, S3p: 14.99, S5p: 13.39 },
  { phi: 43, S1: 69.68, S2: 99.01, S2p: 1.278, S3p: 17.39, S5p: 14.6 },
  { phi: 44, S1: 85.2, S2: 115.3, S2p: 1.298, S3p: 20.26, S5p: 16.16 },
  { phi: 45, S1: 104.8, S2: 134.9, S2p: 1.32, S3p: 23.71, S5p: 17.97 },
  { phi: 46, S1: 129.7, S2: 158.5, S2p: 1.343, S3p: 27.91, S5p: 20.05 },
  { phi: 47, S1: 161.5, S2: 187.2, S2p: 1.368, S3p: 33.03, S5p: 22.8 },
  { phi: 48, S1: 202.7, S2: 222.3, S2p: 1.395, S3p: 39.33, S5p: 25.2 },
  { phi: 49, S1: 256.3, S2: 265.5, S2p: 1.423, S3p: 47.16, S5p: 28.6 },
  { phi: 50, S1: 326.7, S2: 319.1, S2p: 1.454, S3p: 56.95, S5p: 32.3 },
  { phi: 51, S1: 420.4, S2: 385.0, S2p: 1.488, S3p: 69.33, S5p: 37.1 },
  { phi: 52, S1: 546.1, S2: 470.3, S2p: 1.524, S3p: 85.13, S5p: 42.4 },
  { phi: 53, S1: 717.0, S2: 577.5, S2p: 1.564, S3p: 105.5, S5p: 48.9 },
  { phi: 54, S1: 952.2, S2: 715.1, S2p: 1.606, S3p: 132.2, S5p: 56.5 },
  { phi: 55, S1: 1280.0, S2: 893.5, S2p: 1.653, S3p: 167.4, S5p: 66.9 },
  { phi: 56, S1: 1745.0, S2: 1127.0, S2p: 1.703, S3p: 214.7, S5p: 79.0 },
  { phi: 57, S1: 2413.0, S2: 1438.0, S2p: 1.759, S3p: 279.3, S5p: 94.9 },
  { phi: 58, S1: 3391.0, S2: 1856.0, S2p: 1.82, S3p: 344.3, S5p: 114.6 },
  { phi: 59, S1: 4850.0, S2: 2425.0, S2p: 1.885, S3p: 414.7, S5p: 140.0 },
  { phi: 60, S1: 7075.0, S2: 3214.0, S2p: 1.96, S3p: 489.5, S5p: 172.0 },
];

//FUNCION TRABAJA EN TON/M
export const CaquotKeriselBothDim = (
  diam,
  length,
  soilList,
  fcC,
  fcD,
  fcEspesor
) => {
  let fricc = 0; //Coeficiente de fricción kgf/cm2
  let Fs = 4; //Factor de seguridad

  let espesorFin = 0;
  let estratosTot = 0;
  let estratosF = 0;
  let LacumF = 0;
  let Laux = 0;
  let Lestratos = 0;
  //Variable correspondiente al relleno presente
  let Lrelleno = 0;

  //Variables correspondientes al fuste del pilote
  let densidadF = 0;
  let phiF = 0;
  let cF = 0;

  let phiFuste = 0;
  let cFuste = 0;
  let densidadFuste = 0;
  //Variables correspondientes a la punta del pilote
  let densidadP = 0;
  let phiP = 0;
  let cP = 0;
  let Q = 0;
  let H = 0;
  let Lefect = 0;
  let s1 = 0;
  let s2 = 0;
  let s2p = 0;
  let s3p = 0;
  let s5p = 0;

  let r1 = 0;
  let r2 = 0;
  let r3 = 0;
  let r4 = 0;
  let r5 = 0;

  let resistence = 0;
  let ap = 0;
  let Fn = 0;
  let Qadm = 0;

  for (let i = 0; i < soilList.length; i++) {
    if (soilList[i]["typeValue"] === "1") {
      Lrelleno += parseFloat(soilList[i]["espesor"]) / fcEspesor;
      fricc = 0.2;
    }
    if (soilList[i]["typeValue"] === "2") {
      Lrelleno += parseFloat(soilList[i]["espesor"]) / fcEspesor;
      fricc = 0.6;
    }
    if (
      !(soilList[i]["typeValue"] === "1") &&
      !(soilList[i]["typeValue"] === "2")
    ) {
      LacumF += parseFloat(soilList[i]["espesor"]) / fcEspesor;
      if (LacumF <= length - Lrelleno) {
        console.log("entra");
        densidadF +=
          parseFloat(soilList[i]["peso"]) *
          fcD *
          (parseFloat(soilList[i]["espesor"]) / fcEspesor);
        phiF +=
          parseFloat(soilList[i]["phi"]) *
          (parseFloat(soilList[i]["espesor"]) / fcEspesor);
        cF +=
          parseFloat(soilList[i]["cohesion"]) *
          fcC *
          (parseFloat(soilList[i]["espesor"]) / fcEspesor);
      }
      if (LacumF > length - Lrelleno && Laux < length - Lrelleno) {
        //Se agrega parte del estrato al fuste
        espesorFin = LacumF + Lrelleno - length;
        densidadF +=
          parseFloat(soilList[i]["peso"]) *
          fcD *
          (parseFloat(soilList[i]["espesor"]) / fcEspesor - espesorFin);
        phiF += parseFloat(
          soilList[i]["phi"] *
            (parseFloat(soilList[i]["espesor"]) / fcEspesor - espesorFin)
        );
        cF +=
          parseFloat(soilList[i]["cohesion"]) *
          fcC *
          (parseFloat(soilList[i]["espesor"]) / fcEspesor - espesorFin);

        if (densidadP == 0 && phiP == 0 && cP == 0) {
          console.log("entra 1");
          //Se agregan los datos del estrato a la punta del pilote
          densidadP += parseFloat(soilList[i]["peso"]) * fcD;
          phiP += parseFloat(soilList[i]["phi"]);
          cP += parseFloat(soilList[i]["cohesion"]) * fcC;
        }
      }
      if (
        LacumF == length - Lrelleno &&
        densidadP == 0 &&
        phiP == 0 &&
        cP == 0
      ) {
        console.log("entra 2");
        densidadP += parseFloat(soilList[i]["peso"]) * fcD;
        phiP += parseFloat(soilList[i]["phi"]);
        cP += parseFloat(soilList[i]["cohesion"]) * fcC;
      }
      Laux = LacumF;
      estratosF += 1;
    }
    Lestratos += parseFloat(soilList[i]["espesor"]) / fcEspesor;
    estratosTot += 1;
  }

  Lefect = length - Lrelleno;

  phiFuste = roundToCero(phiF / Lefect);
  cFuste = cF / Lefect;
  densidadFuste = densidadF / Lefect;

  H = cP / tan(phiP);
  for (let i = 0; i < values.length; i++) {
    if (values[i]["phi"] === phiFuste) {
      console.log("entra phi fuste");
      s2p = values[i]["S2p"];
      s3p = values[i]["S3p"];
      s5p = values[i]["S5p"];
    }
    if (values[i]["phi"] === phiP) {
      console.log("entra phi punta");
      s1 = values[i]["S1"];
      s2 = values[i]["S2"];
    }
  }
  if (Lestratos < length) {
    return "La longitud del pilote es mayor que la longitud total de los estratos. \n Por favor, modifique las dimensiones ingresadas.";
  }

  if (Lefect < 6 * diam) {
    return "No se cumple la condición de que la longitud efectiva del pilote debe ser mayor o igual a 6 veces el diámetro del pilote. \n Por favor, modifique las dimensiones ingresadas.";
  }
  r1 = (densidadP * diam * s1) / 4;
  r2 = densidadFuste * Lefect * s2 * s2p;
  r3 = (densidadFuste * 2 * pow(Lefect, 2) * s3p) / diam;
  r4 = H * (s2 - 1);
  r5 = (cFuste * Lefect * 4 * s5p) / diam;

  resistence = r1 + r2 + r3 + r4 + r5;

  ap = pi * pow(diam / 2, 2);
  Fn = 2 * pi * ((diam * 100) / 2) * fricc * Lrelleno * 100;

  Q = (resistence * ap) / Fs - Fn / 1000;

  Qadm = roundToCero((resistence * ap) / Fs - Fn / 1000);

  return Qadm;
};
