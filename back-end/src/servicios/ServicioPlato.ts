import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import Sequelize, { Op } from "sequelize";


export async function consultarTotalPlatosVendidosRestaurante(
    idRestaurante: any
  ) {
    const totalPlatosVendidos: any = await initModel.pedido.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("cantidad")), "totalPlatosVendidos"],
      ],
      include: [
        {
          model: initModel.factura,
          as: "Factura_",
          where: {
            Restaurante_idRestaurante: idRestaurante,
            pagado: {
              [Op.not]: null,
            },
          },
          attributes: [], // Excluye los atributos de la tabla `factura` en el resultado
        },
      ],
      raw: true, // Esto garantiza que obtienes un objeto plano sin metadatos innecesarios
    });
  
    return totalPlatosVendidos[0]?.totalPlatosVendidos || 0; // Devuelve el total o 0 si no hay resultados
  }
  export async function consultarTopPlatosVendidosRestaurante(
    idRestaurante: any
  ) {
    const topPlatosVendidos: any = await initModel.pedido.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("cantidad")), "totalPlatosVendidos"], // Suma la cantidad vendida de cada plato
        [Sequelize.col("Plato_.nombre"), "nombrePlato"], // Obtén el nombre del plato
      ],
      include: [
        {
          model: initModel.factura,
          as: "Factura_",
          where: {
            Restaurante_idRestaurante: idRestaurante,
            pagado: {
              [Op.not]: null, // Solo facturas pagadas
            },
          },
          attributes: [], // Excluye los atributos de la tabla `factura`
        },
        {
          model: initModel.plato,
          as: "Plato_", // Relación con el modelo `plato`
          attributes: [], // Excluye otros atributos de la tabla `plato`
        },
      ],
      group: ["Plato_.idPlato"], // Agrupa por el ID del plato
      order: [[Sequelize.literal("totalPlatosVendidos"), "DESC"]], // Orden descendente por cantidad vendida
      limit: 3, // Limita los resultados a los 3 platos más vendidos
      raw: true, // Devuelve un objeto plano
    });
  
    // Retorna un arreglo con el nombre del plato y la cantidad vendida
    return topPlatosVendidos.map((plato: any) => ({
      nombre: plato.nombrePlato,
      totalVendidos: plato.totalPlatosVendidos,
    }));
  }
  