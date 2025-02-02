import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
import Sequelize, { Op } from "sequelize";


export async function crearCategoria(req: Request, res: Response) {
    try {
      req = req.body.data.categoria;
      const { nombre, descripcion, idRestaurante }: any = req;

      const categoriaExist = await initModel.categoria.findOne({
        where: {
            nombre: nombre,
            Restaurante_idRestaurante: idRestaurante
        },
      });
      if (categoriaExist) {
        return  responseMessage(res, 400, false,"Ya existe una Categoria con ese nombre");
      } else {
        const categoria: any = await initModel.categoria.create({
          nombre: nombre,
          descripcion: descripcion,
          Restaurante_idRestaurante: idRestaurante
        });

        if (categoria) {
            return  responseMessage(res, 200, categoria, "Categoria creada exitosamente");
        }
      }
    } catch (error) {
      return responseMessage(res, 400, error, "error server ...");
    }
  }
  

  
export async function consultarTodasCategorias(req: Request, res: Response) {
  try {
    let idRestaurante = req.params.idRestaurante;

    const categorias = await initModel.categoria.findAll({
      where: {
          Restaurante_idRestaurante: idRestaurante
      },
    });
    if (categorias.length<1) {
      return  responseMessage(res, 400, false,"Aun no tienes categorias registradas");
    } else {
          return  responseMessage(res, 200, categorias, "Categorias registradas");
    }
  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}
