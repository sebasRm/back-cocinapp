import express from "express";
const router = express.Router();
import { crearGerente } from "../Controladores/GerenteControlador";
import { login } from "../Controladores/UsuarioControlador";
import { crearRestaurante, consultarRestaurantes, consultarInformacionRestaurante } from "../Controladores/RestauranteControlador";
import { cambioEstadoMesaActivada, cambioEstadoMesaDesactivada, consultarTodasMesas, crearMesa } from "../Controladores/MesasControlador";
import { crearCliente } from "../Controladores/ClienteControlador";
import { crearFacturaDomicilio, crearFacturaMesa } from "../Controladores/FacturaControlador";
import { activarMesero, actualizarMesero, consultarMeserosRestaurante, crearMesero, desactivarMesero } from "../Controladores/MeseroControlador";
import { consultarTodasCategorias, crearCategoria } from "../Controladores/CategoriaControlador";
import { consultarTodosPlatos, crearPlato, editarPlato } from "../Controladores/PlatoControlador";
import { crearPedido } from "../Controladores/PedidoControlador";
import { upload } from "../helpers/utils";

/** *************************  MODULO USUARIO  ***************************/

router.post("/api/login", login);

/** *************************  MODULO GERENTE  ***************************/

router.post("/api/crear/gerente", crearGerente);

/** *************************  MODULO CLIENTE  ***************************/
router.post("/api/crear/cliente", crearCliente);

/** *************************  MODULO MESERO  ***************************/

router.post("/api/crear/mesero", crearMesero);
router.post("/api/consultar/meseros/restaurante", consultarMeserosRestaurante);
router.put("/api/actualizar/mesero/restaurante", actualizarMesero);
router.put("/api/desactivar/mesero/restaurante", desactivarMesero);
router.put("/api/activar/mesero/restaurante", activarMesero);

/** *************************  MODULO RESTAURANTE  ***************************/

router.get("/api/consultar/informacion/restaurante/:idRestaurante", consultarInformacionRestaurante);
router.post("/api/crear/restaurante", crearRestaurante);
router.post("/api/consultar/restaurantes", consultarRestaurantes);



/** *************************  MODULO MESA  ***************************/
router.post("/api/consultar/mesas", consultarTodasMesas);
router.post("/api/crear/mesa", crearMesa); 
router.post("/api/editar/mesa/estado/desactivada", cambioEstadoMesaDesactivada); 
router.post("/api/editar/mesa/estado/activada", cambioEstadoMesaActivada); 

/** *************************  MODULO FACTURA  ***************************/

router.post("/api/crear/factura/domicilio", crearFacturaDomicilio);
router.post("/api/crear/factura/mesa", crearFacturaMesa);


/** *************************  MODULO CATEGORIA  ***************************/

router.post("/api/crear/categoria", crearCategoria);
router.get("/api/consultar/categorias/:idRestaurante", consultarTodasCategorias);

/** *************************  MODULO PLATO  ***************************/

router.post("/api/crear/plato", upload.single("imagen"), crearPlato);
router.put("/api/editar/plato", upload.single("imagen"), editarPlato);
router.post("/api/consultar/todos/plato", consultarTodosPlatos);


/** *************************  MODULO PEDIDO  ***************************/

router.post("/api/crear/pedido", crearPedido);



export { router };