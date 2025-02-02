import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
import Sequelize, { Op } from "sequelize";

export async function crearMesero(req: Request, res: Response) {
  try {
    req = req.body.data.user;
    const { nombre, correo, password, celular, idRestaurante }: any = req;
    const passwordCrypt = await bcrypt.hash(password, 10);
    const userExist = await initModel.usuario.findOne({
      where: {
        correo: correo,
      },
    });
    if (userExist) {
      return responseMessage(
        res,
        400,
        false,
        "Ya existe un Mesero asociado con ese correo"
      );
    } else {
      const user: any = await initModel.usuario.create({
        nombre: nombre,
        correo: correo,
        contrasena: passwordCrypt,
        celular: celular,
        Estado_idEstado: 1
      });
      await initModel.usuario_has_restaurante.create({
        Usuario_idUsuario: user.dataValues.idUsuario,
        Restaurante_idRestaurante: idRestaurante,
      });

      const mesero: any = await initModel.mesero.create({
        Usuario_idUsuario: user.dataValues.idUsuario,
      });

      if (mesero) {
        delete user.dataValues.contrasena;
        return responseMessage(res, 200, user, "Mesero creado exitosamente");
      }
    }
  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}

export async function consultarMeserosRestaurante(req: Request, res: Response) {
  req = req.body.data.restaurante;
  const { idRestaurante, nombreMesero }: any = req;
  try {
    const mesas = await initModel.mesero.findAll({
      include: [
        {
          model: initModel.usuario,
          as: "Usuario_",
          include: [
            {
              model: initModel.usuario_has_restaurante,
              as: "usuario_",
              where: { Restaurante_idRestaurante: idRestaurante },
              attributes: [],
            },
          ],
          where: {
            ...(nombreMesero && { nombre: { [Op.like]: `%${nombreMesero}%` } }),
          },
          attributes: { exclude: ["contrasena"] },
        },
      ],
      attributes: [],
    });
    if (mesas.length > 0) {
      return responseMessage(res, 200, mesas, "Meseros existentes");
    }
    return responseMessage(
      res,
      400,
      false,
      "No hay Meseros asignadas a este restaurante"
    );
  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}

export async function actualizarMesero(req: Request, res: Response) {
  try {
    req = req.body.data.user;
    const { nombre, correo, celular, idUsuario }: any = req;
    let usuario = {
      nombre: nombre,
      correo: correo,
      celular: celular,
    };
    const user: any = await initModel.usuario.update(usuario, {
      where: { idUsuario: idUsuario },
    });

    if (user) {
      return responseMessage(res, 200, user, "Mesero actualizado exitosamente");
    }
    return responseMessage(res, 400, false, "Error al actualizar el mesero");
  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}

export async function desactivarMesero(req: Request, res: Response) {
  try {
    req = req.body.data.user;
    const { idUsuario }: any = req;
    let usuario = {
      Estado_idEstado: 2
    };
    const user: any = await initModel.usuario.update(usuario, {
      where: { idUsuario: idUsuario },
    });

    if (user) {
      return responseMessage(res, 200, user, "Mesero desactivado exitosamente");
    }
    return responseMessage(res, 400, false, "Error al actualizar el mesero");
  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}


export async function activarMesero(req: Request, res: Response) {
  try {
    req = req.body.data.user;
    const { idUsuario }: any = req;
    let usuario = {
      Estado_idEstado: 1
    };
    const user: any = await initModel.usuario.update(usuario, {
      where: { idUsuario: idUsuario },
    });

    if (user) {
      return responseMessage(res, 200, user, "Mesero desactivado exitosamente");
    }
    return responseMessage(res, 400, false, "Error al actualizar el mesero");
  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}
