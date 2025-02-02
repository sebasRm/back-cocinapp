import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";

export async function consultarTotalMeserosRestaurante(idRestaurante: any) {
  const totalMeseros = await initModel.mesero.count({
    include: [
      {
        model: initModel.usuario,
        as: "Usuario_",
        required: true,
        include: [
          {
            model: initModel.usuario_has_restaurante,
            as: "usuario_",
            required: true,
            where: {
              Restaurante_idRestaurante: idRestaurante,
            },
          },
        ],
        where:{Estado_idEstado:1}
      },
    ],
  });
  return totalMeseros;
}

export async function rendimientoMeserosRestaurante(idRestaurante: any) {
  const totalMeseros = await initModel.mesero.findAll({
    include: [
      {
        model: initModel.factura,
        as: "facturas",
        attributes: [
          [
            Sequelize.fn("COUNT", Sequelize.col("facturas.idFactura")),
            "contadorPedidosMesero",
          ],
        ],
        where: {
          Restaurante_idRestaurante: idRestaurante,
          pagado: {
            [Op.not]: null, // Solo facturas pagadas
          },
        },
        required: true, // Asegura que solo se incluyan meseros con facturas asociadas
      },
      {
        model: initModel.usuario,
        as: "Usuario_",
        attributes: ["nombre"], // Obtén el nombre del mesero
        required: true,
      },
    ],
    attributes: ["idMesero"], // Incluye solo el ID del mesero en el resultado principal
    group: ["mesero.idMesero", "Usuario_.idUsuario"], // Agrupa por el mesero y su usuario asociado
    raw: true, // Retorna un objeto plano
  });

  // Procesar resultados para formato final
  let idMesero: string[] = [];
  let nombres: string[] = [];
  let totalPedidos: string[] = [];
  if(totalMeseros.length>0)
  {
    totalMeseros.forEach((mesero: any) => {
      idMesero.push(mesero.idMesero)
      nombres.push(mesero["Usuario_.nombre"])
      totalPedidos.push(mesero["facturas.contadorPedidosMesero"])

    });
  }


  return {idMesero, nombres, totalPedidos};
}
