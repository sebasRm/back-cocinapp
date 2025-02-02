import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";

export async function consultarTotalFacturasDomiciliosRestaurante(
  idRestaurante: any
) {
  const inicioDia = new Date();
  inicioDia.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00

  const finDia = new Date();
  finDia.setHours(23, 59, 59, 999);
  const contadorFacturas: any = await initModel.factura.findAll({
    where: {
      Restaurante_idRestaurante: idRestaurante,
      Mesa_idMesa: {
        [Op.is]: null, // Usa Op.is para verificar que Mesa_idMesa es null
      },
      Fecha: {
        [Op.between]: [inicioDia, finDia], // Filtra entre el inicio y fin del día usando "fecha"
      },
    },
    attributes: [
      [
        Sequelize.fn("COUNT", Sequelize.col("idFactura")),
        "contadorFacturaDomicilios",
      ],
    ],
  });
  return contadorFacturas;
}

export async function consultarTotalFacturasPagadasDelDiaRestaurante(
  idRestaurante: any
) {
  const inicioDia = new Date();
  inicioDia.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00

  const finDia = new Date();
  finDia.setHours(23, 59, 59, 999); // Establece la hora a 23:59:59

  const totalPagado: any = await initModel.factura.findAll({
    where: {
      Restaurante_idRestaurante: idRestaurante,
      pagado: {
        [Op.not]: null,
      },

      Fecha: {
        [Op.between]: [inicioDia, finDia], // Filtra entre el inicio y fin del día usando "Fecha"
      },
    },
    attributes: [
      [
        Sequelize.fn(
          "SUM",
          Sequelize.fn("COALESCE", Sequelize.col("pagado"), 0)
        ),
        "totalPagadoDomicilios",
      ],

      [
        Sequelize.fn(
          "SUM",
          Sequelize.fn("COALESCE", Sequelize.col("precio_envio"), 0)
        ),
        "totalDomicilios",
      ],
    ],
  });

  return totalPagado;
}

export async function consultarTotalFacturasDomicilioPagadasRestaurante(
  idRestaurante: any
) {
  const totalPagado: any = await initModel.factura.findAll({
    where: {
      Restaurante_idRestaurante: idRestaurante,
      pagado: {
        [Op.not]: null,
      },
      Mesa_idMesa: {
        [Op.is]: null, // Verifica que Mesa_idMesa es null
      },
    },
    attributes: [
      [
        Sequelize.fn("COUNT", Sequelize.col("idFactura")),
        "contadorFacturaDomicilios",
      ],
    ],
  });

  return totalPagado;
}

// Mapeo de días en inglés a español
const diasSemana: any = {
  Sunday: "Domingo",
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado",
};

export async function consultarIngresosSemanales(idRestaurante: any) {
  const totalPagado: any = await initModel.factura.findAll({
    where: {
      Restaurante_idRestaurante: idRestaurante,
      pagado: {
        [Op.not]: null, // Solo facturas que ya están pagadas
      },
      Fecha: {
        [Op.gte]: Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 7 DAY)"), // Últimos 7 días
      },
    },
    attributes: [
      [
        Sequelize.fn("DAYNAME", Sequelize.col("Fecha")), // Agrupa por nombre del día
        "diaSemana",
      ],
      [Sequelize.fn("SUM", Sequelize.col("pagado")), "totalIngresos"], // Suma los ingresos
      [Sequelize.fn("SUM", Sequelize.col("precio_envio")), "totalDomicilio"], // Suma los domicilios
    ],
    group: [Sequelize.fn("DAYNAME", Sequelize.col("Fecha"))], // Agrupa por día
    raw: true, // Devuelve un objeto plano
  });

  // Definir un orden personalizado de los días en español
  const diasSemanaOrden: any = {
    Saturday: 1,
    Sunday: 2,
    Monday: 3,
    Tuesday: 4,
    Wednesday: 5,
    Thursday: 6,
    Friday: 7,
  };

  // Convertir días a español y ordenar
  const diasSemana: any = {
    Sunday: "Domingo",
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
  };

  let dias: string[] = [];
  let ingresos: number[] = []; // Ordenar y mapear resultados
  //console.log("soy el totalPagado", totalPagado)
  if (totalPagado.length > 0) {
    const resultadosOrdenados = totalPagado
      .map((dato: any) => ({
        diaSemana: diasSemana[dato.diaSemana] || dato.diaSemana,
        totalIngresos: dato.totalIngresos,
        totalDomicilio: dato.totalDomicilio ? dato.totalDomicilio : 0,
      }))
      .sort(
        (a: any, b: any) =>
          diasSemanaOrden[a.diaSemana] - diasSemanaOrden[b.diaSemana]
      );

    resultadosOrdenados.forEach((dato: any) => {
      dias.push(dato.diaSemana);
      ingresos.push(dato.totalIngresos + dato?.totalDomicilio);
    });

    //console.log("Días ordenados:", dias);
    //console.log("Ingresos ordenados:", ingresos);
  }

  return { dias, ingresos };
}

export async function consultarTotalFacturasPagadasRestaurante(
  idRestaurante: any
) {
  const totalPagado: any = await initModel.factura.findAll({
    where: {
      Restaurante_idRestaurante: idRestaurante,
      pagado: {
        [Op.not]: null,
      },
    },
    attributes: [
      [
        Sequelize.fn(
          "SUM",
          Sequelize.fn("COALESCE", Sequelize.col("pagado"), 0)
        ),
        "totalPagadoDomicilios",
      ],

      [
        Sequelize.fn(
          "SUM",
          Sequelize.fn("COALESCE", Sequelize.col("precio_envio"), 0)
        ),
        "totalDomicilios",
      ],
    ],
  });
  let totalFactura = 0;

  if (totalPagado.length > 0) {
    totalPagado.forEach((factura: any) => {
      totalFactura =
        factura.dataValues.totalPagadoDomicilios +
        factura.dataValues.totalDomicilios;
    });
  }
  return totalFactura;
}
