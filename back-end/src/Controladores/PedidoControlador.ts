import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
import Sequelize, { Op } from "sequelize";


export async function crearPedido(req: Request, res: Response) {
    try {
      req = req.body.data.pedido;
      const { idPlato, idFactura, observacion, cantidad, precioPlato }: any = req;
        let precioPedido = precioPlato*cantidad
        const pedido: any = await initModel.pedido.create({
          Plato_idPlato: idPlato,
          Factura_idFactura: idFactura,
          observacion: observacion,
          cantidad: cantidad,
          precio: precioPedido
        });

        if (pedido) {
            return  responseMessage(res, 200, pedido, "Pedido creado exitosamente");
        }
        return  responseMessage(res, 400, pedido, "Error al crear el Pedido");
      
    } catch (error) {
      return responseMessage(res, 400, error, "error server ...");
    }
  }
  