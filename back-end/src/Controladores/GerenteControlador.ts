import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");


export async function crearGerente(req: Request, res: Response) {
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
        return  responseMessage(res, 400, false,"Ya existe un Gerenete asociado con ese correo");
      } else {
        const user: any = await initModel.usuario.create({
          nombre: nombre,
          correo: correo,
          contrasena: passwordCrypt,
          celular: celular,
          Estado_idEstado: 1
        });
        const gerente: any = await initModel.gerente.create({
          Usuario_idUsuario: user.dataValues.idUsuario,
        });
        if (gerente) {
            delete user.dataValues.contrasena
            return  responseMessage(res, 200, user, "Gerente creado exitosamente");
        }
      }
    } catch (error) {
      return responseMessage(res, 400, error, "error server ...");
    }
  }
  