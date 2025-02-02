import { Request, Response } from "express";
import { initModels} from "../models/init-models"
import { sequelize } from "../db/conexionDB";
let initModel= initModels(sequelize)
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");

/**
 * Función para logear el usuario
 */

export async function login(req: Request, res: Response) {
  req = req.body.data.user;
  const { password, correo }: any = req;
  try {
    const user :any = await initModel.usuario.findOne({
      where: { correo: correo },
      include: [
        {
          model: initModel.gerente,
          as: "gerentes",
        },
        {
            model: initModel.cajero,
            as: "cajeros",
          },
          {
            model: initModel.cocinero,
            as: "cocineros",
          },
          {
            model: initModel.mesero,
            as: "meseros",
          },
          {
            model: initModel.cliente,
            as: "clientes",
          },
      ],
      
    });
    if(!user)
    {
      return  responseMessage(res, 404, false,"Error el usuario no se encuentra registrado");
    }
    else{
        const login = await bcrypt.compare(password, user.dataValues.contrasena);   
        if (login) {
          delete user.dataValues.contrasena
          return  responseMessage(res, 200, user,"Usuario logeado correctamente");
        }
        return  responseMessage(res, 404, false,"Error la contraseña es incorrecta");
    }
  } catch (error) {
    return  responseMessage(res, 503, error,"error server ...");
  }
}
