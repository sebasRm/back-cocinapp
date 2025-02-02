import type { Sequelize } from "sequelize";
import { cajero as _cajero } from "./cajero";
import type { cajeroAttributes, cajeroCreationAttributes } from "./cajero";
import { categoria as _categoria } from "./categoria";
import type { categoriaAttributes, categoriaCreationAttributes } from "./categoria";
import { cliente as _cliente } from "./cliente";
import type { clienteAttributes, clienteCreationAttributes } from "./cliente";
import { cocinero as _cocinero } from "./cocinero";
import type { cocineroAttributes, cocineroCreationAttributes } from "./cocinero";
import { estado as _estado } from "./estado";
import type { estadoAttributes, estadoCreationAttributes } from "./estado";
import { factura as _factura } from "./factura";
import type { facturaAttributes, facturaCreationAttributes } from "./factura";
import { gerente as _gerente } from "./gerente";
import type { gerenteAttributes, gerenteCreationAttributes } from "./gerente";
import { mesa as _mesa } from "./mesa";
import type { mesaAttributes, mesaCreationAttributes } from "./mesa";
import { mesero as _mesero } from "./mesero";
import type { meseroAttributes, meseroCreationAttributes } from "./mesero";
import { pedido as _pedido } from "./pedido";
import type { pedidoAttributes, pedidoCreationAttributes } from "./pedido";
import { plato as _plato } from "./plato";
import type { platoAttributes, platoCreationAttributes } from "./plato";
import { restaurante as _restaurante } from "./restaurante";
import type { restauranteAttributes, restauranteCreationAttributes } from "./restaurante";
import { usuario as _usuario } from "./usuario";
import type { usuarioAttributes, usuarioCreationAttributes } from "./usuario";
import { usuario_has_restaurante as _usuario_has_restaurante } from "./usuario_has_restaurante";
import type { usuario_has_restauranteAttributes, usuario_has_restauranteCreationAttributes } from "./usuario_has_restaurante";

export {
  _cajero as cajero,
  _categoria as categoria,
  _cliente as cliente,
  _cocinero as cocinero,
  _estado as estado,
  _factura as factura,
  _gerente as gerente,
  _mesa as mesa,
  _mesero as mesero,
  _pedido as pedido,
  _plato as plato,
  _restaurante as restaurante,
  _usuario as usuario,
  _usuario_has_restaurante as usuario_has_restaurante,
};

export type {
  cajeroAttributes,
  cajeroCreationAttributes,
  categoriaAttributes,
  categoriaCreationAttributes,
  clienteAttributes,
  clienteCreationAttributes,
  cocineroAttributes,
  cocineroCreationAttributes,
  estadoAttributes,
  estadoCreationAttributes,
  facturaAttributes,
  facturaCreationAttributes,
  gerenteAttributes,
  gerenteCreationAttributes,
  mesaAttributes,
  mesaCreationAttributes,
  meseroAttributes,
  meseroCreationAttributes,
  pedidoAttributes,
  pedidoCreationAttributes,
  platoAttributes,
  platoCreationAttributes,
  restauranteAttributes,
  restauranteCreationAttributes,
  usuarioAttributes,
  usuarioCreationAttributes,
  usuario_has_restauranteAttributes,
  usuario_has_restauranteCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const cajero = _cajero.initModel(sequelize);
  const categoria = _categoria.initModel(sequelize);
  const cliente = _cliente.initModel(sequelize);
  const cocinero = _cocinero.initModel(sequelize);
  const estado = _estado.initModel(sequelize);
  const factura = _factura.initModel(sequelize);
  const gerente = _gerente.initModel(sequelize);
  const mesa = _mesa.initModel(sequelize);
  const mesero = _mesero.initModel(sequelize);
  const pedido = _pedido.initModel(sequelize);
  const plato = _plato.initModel(sequelize);
  const restaurante = _restaurante.initModel(sequelize);
  const usuario = _usuario.initModel(sequelize);
  const usuario_has_restaurante = _usuario_has_restaurante.initModel(sequelize);

  restaurante.belongsToMany(usuario, { as: 'Usuario_', through: usuario_has_restaurante, foreignKey: "Restaurante_idRestaurante", otherKey: "Usuario_idUsuario" });
  usuario.belongsToMany(restaurante, { as: 'Restaurante_', through: usuario_has_restaurante, foreignKey: "Usuario_idUsuario", otherKey: "Restaurante_idRestaurante" });
  plato.belongsTo(categoria, { as: "Categoria_", foreignKey: "Categoria_idCategoria"});
  categoria.hasMany(plato, { as: "platos", foreignKey: "Categoria_idCategoria"});
  factura.belongsTo(cliente, { as: "Cliente_", foreignKey: "Cliente_idCliente"});
  cliente.hasMany(factura, { as: "facturas", foreignKey: "Cliente_idCliente"});
  mesa.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(mesa, { as: "mesas", foreignKey: "Estado_idEstado"});
  plato.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(plato, { as: "platos", foreignKey: "Estado_idEstado"});
  restaurante.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(restaurante, { as: "restaurantes", foreignKey: "Estado_idEstado"});
  usuario.belongsTo(estado, { as: "Estado_", foreignKey: "Estado_idEstado"});
  estado.hasMany(usuario, { as: "usuarios", foreignKey: "Estado_idEstado"});
  pedido.belongsTo(factura, { as: "Factura_", foreignKey: "Factura_idFactura"});
  factura.hasMany(pedido, { as: "pedidos", foreignKey: "Factura_idFactura"});
  factura.belongsTo(mesa, { as: "Mesa_", foreignKey: "Mesa_idMesa"});
  mesa.hasMany(factura, { as: "facturas", foreignKey: "Mesa_idMesa"});
  factura.belongsTo(mesero, { as: "Mesero_", foreignKey: "Mesero_idMesero"});
  mesero.hasMany(factura, { as: "facturas", foreignKey: "Mesero_idMesero"});
  pedido.belongsTo(plato, { as: "Plato_", foreignKey: "Plato_idPlato"});
  plato.hasMany(pedido, { as: "pedidos", foreignKey: "Plato_idPlato"});
  categoria.belongsTo(restaurante, { as: "Restaurante_", foreignKey: "Restaurante_idRestaurante"});
  restaurante.hasMany(categoria, { as: "categoria", foreignKey: "Restaurante_idRestaurante"});
  factura.belongsTo(restaurante, { as: "Restaurante_", foreignKey: "Restaurante_idRestaurante"});
  restaurante.hasMany(factura, { as: "facturas", foreignKey: "Restaurante_idRestaurante"});
  mesa.belongsTo(restaurante, { as: "Restaurante_", foreignKey: "Restaurante_idRestaurante"});
  restaurante.hasMany(mesa, { as: "mesas", foreignKey: "Restaurante_idRestaurante"});
  plato.belongsTo(restaurante, { as: "Restaurante_", foreignKey: "Restaurante_idRestaurante"});
  restaurante.hasMany(plato, { as: "platos", foreignKey: "Restaurante_idRestaurante"});
  usuario_has_restaurante.belongsTo(restaurante, { as: "Restaurante_", foreignKey: "Restaurante_idRestaurante"});
  restaurante.hasMany(usuario_has_restaurante, { as: "usuario_", foreignKey: "Restaurante_idRestaurante"});
  cajero.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(cajero, { as: "cajeros", foreignKey: "Usuario_idUsuario"});
  cliente.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(cliente, { as: "clientes", foreignKey: "Usuario_idUsuario"});
  cocinero.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(cocinero, { as: "cocineros", foreignKey: "Usuario_idUsuario"});
  factura.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(factura, { as: "facturas", foreignKey: "Usuario_idUsuario"});
  gerente.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(gerente, { as: "gerentes", foreignKey: "Usuario_idUsuario"});
  mesero.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(mesero, { as: "meseros", foreignKey: "Usuario_idUsuario"});
  usuario_has_restaurante.belongsTo(usuario, { as: "Usuario_", foreignKey: "Usuario_idUsuario"});
  usuario.hasMany(usuario_has_restaurante, { as: "usuario_", foreignKey: "Usuario_idUsuario"});

  return {
    cajero: cajero,
    categoria: categoria,
    cliente: cliente,
    cocinero: cocinero,
    estado: estado,
    factura: factura,
    gerente: gerente,
    mesa: mesa,
    mesero: mesero,
    pedido: pedido,
    plato: plato,
    restaurante: restaurante,
    usuario: usuario,
    usuario_has_restaurante: usuario_has_restaurante,
  };
}
