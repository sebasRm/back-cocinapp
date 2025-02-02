import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";

export async function consultarTotalMesasActivasRestaurante(
  idRestaurante: any
) {
  const contadorMesas: any = await initModel.mesa.findAll({
    where: { Restaurante_idRestaurante: idRestaurante },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("idMesa")), "contadorMesas"],
    ],
    include: [
      {
        model: initModel.estado,
        as: "Estado_",
        where: { idEstado: 1 },
        attributes: [],
      },
    ],
  });
  return contadorMesas;
}

export async function consultarTotalMesasOcupadas(idRestaurante: any) {
  const contadorMesas: any = await initModel.mesa.findAll({
    where: { Restaurante_idRestaurante: idRestaurante, ocupada: 1 },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("idMesa")), "contadorMesas"],
    ],
  });
  return contadorMesas;
}
