import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
import Sequelize, { Op } from "sequelize";


export async function crearCliente(req: Request, res: Response) {
    try {
      req = req.body.data.user;
      const { nombre, correo, password, celular }: any = req;
      const passwordCrypt = await bcrypt.hash(password, 10);
      const userExist = await initModel.usuario.findOne({
        where: {
          correo: correo,
        },
      });
      if (userExist) {
        return  responseMessage(res, 400, false,"Ya existe un Cliente asociado con ese correo");
      } else {
        const user: any = await initModel.usuario.create({
          nombre: nombre,
          correo: correo,
          contrasena: passwordCrypt,
          celular: celular,
          Estado_idEstado: 1
        });
        const cliente: any = await initModel.cliente.create({
          Usuario_idUsuario: user.dataValues.idUsuario,
        });
        if (cliente) {
            delete user.dataValues.contrasena
            return  responseMessage(res, 200, user, "Cliente creado exitosamente");
        }
      }
    } catch (error) {
      return responseMessage(res, 400, error, "error server ...");
    }
  }
  