import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
import Sequelize, { Op } from "sequelize";

export async function crearMesa(req: Request, res: Response) {
  req = req.body.data.restaurante;
  try {
    const { id }: any = req;
    const mesas = await initModel.mesa.findAll({
      where: {
        Restaurante_idRestaurante: id,
      },
    });
    if (mesas.length===0) {
        let numero = 1
        const mesa: any = await initModel.mesa.create({
            numero: numero,
            Estado_idEstado: 1,
            Restaurante_idRestaurante: id
          });
          if(mesa){
            return  responseMessage(res, 200, mesa, "Mesa creada exitosamente");
          }
          return  responseMessage(res, 400, false,"Error al crear la mesa");
    }
    let ultimaMesa:any = mesas[mesas.length-1]
    ultimaMesa = ultimaMesa.dataValues.numero + 1
    const mesa: any = await initModel.mesa.create({
        numero: ultimaMesa,
        Estado_idEstado: 1,
        Restaurante_idRestaurante: id
      });
      if(mesa){
        return  responseMessage(res, 200, mesa, "Mesa creada exitosamente");
      }
      return  responseMessage(res, 400, false,"Error al crear la mesa");

  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}


export async function consultarTodasMesas(req: Request, res: Response) {
  req = req.body.data.restaurante;
  const { idRestaurante, numeroMesa }: any = req;
  try {
    const mesas = await initModel.mesa.findAll({
      where: {
        Restaurante_idRestaurante: idRestaurante,
        [Op.and]: [numeroMesa ? { numero: { [Op.like]: numeroMesa } } : {}],
      },
    });
    if (mesas.length>0) {
      return  responseMessage(res, 200, mesas, "Mesas existentes");
    }
      return  responseMessage(res, 400, false,"No hay mesas asignadas a este restaurante");

  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}


export async function cambioEstadoMesaDesactivada(req: Request, res: Response) {
  req = req.body.data.restaurante;
  const { idMesa }: any = req;
  try {
    let mesa={
      Estado_idEstado: 2
    }
    const mesas = await initModel.mesa.update(mesa,{
      where: {
        idMesa:idMesa
      },
    });
    if (mesas) {
      return  responseMessage(res, 200, mesas, "Estado de mesa modificada exitosamente");
    }
      return  responseMessage(res, 400, false,"No se modifico la mesa");

  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}

export async function cambioEstadoMesaActivada(req: Request, res: Response) {
  req = req.body.data.restaurante;
  const { idMesa }: any = req;
  try {
    let mesa={
      Estado_idEstado: 1
    }
    const mesas = await initModel.mesa.update(mesa,{
      where: {
        idMesa:idMesa
      },
    });
    if (mesas) {
      return  responseMessage(res, 200, mesas, "Estado de mesa modificada exitosamente");
    }
      return  responseMessage(res, 400, false,"No se modifico la mesa");

  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}









