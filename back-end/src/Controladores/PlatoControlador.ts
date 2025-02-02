import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
import Sequelize, { Op } from "sequelize";

let server = "http://localhost:4000/images/"

export async function crearPlato(req: Request, res: Response) {
    try {
      const { nombre, descripcion, precio, imagen, idCategoria, idRestaurante }: any = req.body;
          // Verifica si se subió una imagen
      if (!req.file) {
        res.status(400).json({ message: "La imagen es requerida" });
        return;
      }
      const platoExist = await initModel.plato.findOne({
        where: {
            nombre: nombre,
            Restaurante_idRestaurante: idRestaurante
        },
      });
      if (platoExist) {
        return  responseMessage(res, 400, false,"Ya existe un Plato con ese nombre");
      } else {
        const imagenUrl = `${server}${req.file.filename}`; 
        const plato: any = await initModel.plato.create({
          Categoria_idCategoria: idCategoria,
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          imagen: imagenUrl,
          Restaurante_idRestaurante: idRestaurante,
          Estado_idEstado: 1
        });

        if (plato) {
            return  responseMessage(res, 200, plato, "Plato creado exitosamente");
        }
      }
    } catch (error) {
      return responseMessage(res, 400, error, "error server ...");
    }
  }
  

  export async function consultarTodosPlatos(req: Request, res: Response) {
    try {
      const { nombre, idCategoria, idRestaurante }: any = req.body.data.plato;

      // Consulta inicial con filtros
      let platos = await initModel.plato.findAll({
        where: {
          [Op.and]: [
            nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : {}, // Filtrar por nombre si está presente
            idCategoria ? { Categoria_idCategoria: idCategoria } : {}, // Filtrar por tipo si está presente
          ],
          Restaurante_idRestaurante: idRestaurante
        },
      });
  
      // Si no se encuentran productos, obtener todos
      if (platos.length === 0) {
        platos = await initModel.plato.findAll({});
      }
  
      if (platos.length > 0) {
        return responseMessage(res, 200, platos, "platos encontrados");
      } else {
        return responseMessage(
          res,
          400,
          false,
          "No se encontraron platos registrados"
        );
      }
    } catch (error) {
      console.error("Error al consultar productos:", error);
      return responseMessage(res, 500, false, "Error al consultar productos");
    }
  }
  
  export async function editarPlato(req: Request, res: Response) {
    try {
      const { nombre, descripcion, precio, imagen, idCategoria, idPlato, idRestaurante, idEstado }: any = req.body;
          // Verifica si se subió una imagen
          console.log("estoy aqui", nombre, descripcion, precio, imagen, idCategoria, idPlato, idRestaurante, idEstado )


        let file = req.file;
        let imagenUrl = imagen; // Asumir la imagen del body como fallback
        
        if (file) {
          imagenUrl = `${server}${file.filename}`;
        }
        
        let platoEditado = {
          Categoria_idCategoria: idCategoria,
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          imagen: imagenUrl,
          Estado_idEstado: idEstado 
        }
        const plato: any = await initModel.plato.update(platoEditado,{where:{ idPlato: idPlato,}});

        if (plato) {
            return  responseMessage(res, 200, plato, "Plato editado exitosamente");
        }
      
    } catch (error) {
      return responseMessage(res, 400, error, "error server ...");
    }
  }