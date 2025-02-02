import { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { sequelize } from "../db/conexionDB";
let initModel = initModels(sequelize);
import { responseMessage } from "../helpers/utils";
const bcrypt = require("bcrypt");
import Sequelize, { Op } from "sequelize";
import {
  consultarTotalMesasActivasRestaurante,
  consultarTotalMesasOcupadas,
} from "../servicios/ServicioMesa";
import {
  consultarIngresosSemanales,
  consultarTotalFacturasDomicilioPagadasRestaurante,
  consultarTotalFacturasDomiciliosRestaurante,
} from "../servicios/SerivicioFactura";
import { consultarTotalMeserosRestaurante } from "../servicios/ServicioMesero";
import { consultarTotalFacturasPagadasDelDiaRestaurante } from "../servicios/SerivicioFactura";
import { consultarTopPlatosVendidosRestaurante, consultarTotalPlatosVendidosRestaurante } from "../servicios/ServicioPlato";
import { rendimientoMeserosRestaurante } from "../servicios/ServicioMesero";
import { consultarTotalFacturasPagadasRestaurante } from "../servicios/SerivicioFactura";

/**
 * Función para logear el usuario
 */

export async function crearRestaurante(req: Request, res: Response) {
  req = req.body.data.restaurante;
  try {
    const { nombre, descripcion }: any = req;
    const RestauranteExiste = await initModel.restaurante.findOne({
      where: {
        nombre: nombre,
      },
    });
    if (RestauranteExiste) {
      return responseMessage(
        res,
        400,
        false,
        "Ya existe un Restaurante con ese nombre"
      );
    }
    const restaurante: any = await initModel.restaurante.create({
      nombre: nombre,
      descripcion: descripcion,
      Estado_idEstado: 1,
    });
    if (restaurante) {
      return responseMessage(
        res,
        200,
        restaurante,
        "Restaurante creado exitosamente"
      );
    }
  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}

export async function consultarRestaurantes(req: Request, res: Response) {
  try {
    const { nombre }: any = req.body.data.restaurante;

    // Consulta inicial con filtros
    let restaurantes: any = await initModel.restaurante.findAll({
      where: {
        [Op.and]: [nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : {}],
      },
    });

    // Si no se encuentran productos, obtener todos
    if (restaurantes.length === 0) {
      restaurantes = await initModel.restaurante.findAll({});
    }

    if (restaurantes.length > 0) {
      for (let restaurante in restaurantes) {
        let idRestaurante = restaurantes[restaurante].dataValues.idRestaurante;
        /** total de mesas en el restaurante */
        let totalMesas = await consultarTotalMesasActivasRestaurante(
          idRestaurante
        );
        restaurantes[restaurante].dataValues.totalMesas =
          totalMesas[0].dataValues.contadorMesas;

        /** total de mesas ocupadas en el restaurante */
        let totalMesasOcupadas = await consultarTotalMesasOcupadas(
          idRestaurante
        );
        restaurantes[restaurante].dataValues.totalMesasOcupadas =
          totalMesasOcupadas[0].dataValues.contadorMesas;

        /** total de domicilios del dia en el restaurante */
        let totalDomicilios = await consultarTotalFacturasDomiciliosRestaurante(
          idRestaurante
        );
        restaurantes[restaurante].dataValues.totalDomicilios =
          totalDomicilios[0].dataValues.contadorFacturaDomicilios;

        /** total de meseros en el restaurante */
        let totalMeseros = await consultarTotalMeserosRestaurante(
          idRestaurante
        );
        restaurantes[restaurante].dataValues.totalMeseros = totalMeseros;

        /** total de ingresos en el dia del restaurante */
        let totalPagado =
          await consultarTotalFacturasPagadasDelDiaRestaurante(
            idRestaurante
          );

        let valorFactura =
          totalPagado[0].dataValues.totalPagadoDomicilios === null
            ? 0
            : totalPagado[0].dataValues.totalPagadoDomicilios;

        let valorDomicilio =
          totalPagado[0].dataValues.totalDomicilios === null
            ? 0
            : totalPagado[0].dataValues.totalDomicilios;

        let ingresos = valorFactura + valorDomicilio;
        restaurantes[restaurante].dataValues.Ingresos = ingresos;
      }

      return responseMessage(
        res,
        200,
        restaurantes,
        "Restaurantes encontrados"
      );
    } else {
      return responseMessage(
        res,
        400,
        false,
        "No tienes restaurantes registrados"
      );
    }
  } catch (error) {
    return responseMessage(res, 500, false, "Error al consultar productos");
  }
}

export async function consultarInformacionRestaurante(
  req: Request,
  res: Response
) {
  let idRestaurante = req.params.idRestaurante;
  try {
    let infoRes: any = {};

    let platosVendidos = await consultarTotalPlatosVendidosRestaurante(
      idRestaurante
    );
    infoRes["platosVendidos"] = platosVendidos;
   
    let totalDomicilios =
      await consultarTotalFacturasDomicilioPagadasRestaurante(idRestaurante);
    
    infoRes["totalDomicilios"] =
      totalDomicilios[0].dataValues.contadorFacturaDomicilios;
   
    let ingresosSemanales = await consultarIngresosSemanales(idRestaurante);
    infoRes["ingresos"] = ingresosSemanales;

    let meserosRendimiento =await  rendimientoMeserosRestaurante(idRestaurante)
    infoRes["meserosRendimiento"] = meserosRendimiento;

    let totalIngresos = await consultarTotalFacturasPagadasRestaurante(idRestaurante)
    infoRes["totalIngresos"] = totalIngresos;

    let topPlatos = await consultarTopPlatosVendidosRestaurante(idRestaurante)
    infoRes["topPlatos"] = topPlatos;
    return  responseMessage(res, 200, infoRes, "Información restaurante");

  } catch (error) {
    return responseMessage(res, 400, error, "error server ...");
  }
}
