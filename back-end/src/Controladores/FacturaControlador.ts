import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";

import Sequelize, { Op } from "sequelize";

export async function crearFacturaDomicilio(req: Request, res: Response) {
  try {
    req = req.body.data.factura;
    const { precio_envio, idRestaurante, idCliente }: any = req;
    const facturaDomicilio: any = await initModel.factura.create({
      Cliente_idCliente: idCliente,
      Restaurante_idRestaurante: idRestaurante,
      Fecha: new Date(),
      precio_envio: precio_envio,
    });

    if (facturaDomicilio) {
      return responseMessage(
        res,
        200,
        facturaDomicilio,
        "Factura creado exitosamente"
      );
    } else {
      return responseMessage(
        res,
        400,
        false,
        "Error al crear la factura domicilio"
      );
    }
  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}


export async function crearFacturaMesa(req: Request, res: Response) {
    try {
      req = req.body.data.factura;
      const { idMesa, idRestaurante, idMesero }: any = req;
      const facturaMesa: any = await initModel.factura.create({
        Mesa_idMesa: idMesa,
        Restaurante_idRestaurante: idRestaurante,
        Mesero_idMesero: idMesero,
        Fecha: new Date(),
      });
  
      if (facturaMesa) {

        let mesa={
          ocupada: 1
        }
        await initModel.mesa.update(mesa,{
        where:{idMesa: idMesa}  
        });

        return responseMessage(
          res,
          200,
          facturaMesa,
          "Factura creado exitosamente"
        );
      } else {
        return responseMessage(
          res,
          400,
          false,
          "Error al crear la factura mesa"
        );
      }
    } catch (error) {
      return responseMessage(res, 400, error, "error server ...");
    }
  }
  
