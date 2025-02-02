import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cliente, clienteId } from './cliente';
import type { mesa, mesaId } from './mesa';
import type { mesero, meseroId } from './mesero';
import type { pedido, pedidoId } from './pedido';
import type { restaurante, restauranteId } from './restaurante';
import type { usuario, usuarioId } from './usuario';

export interface facturaAttributes {
  idFactura: number;
  Usuario_idUsuario?: number;
  Mesa_idMesa?: number | null ;
  Mesero_idMesero?: number;
  Cliente_idCliente?: number | null ;
  Fecha?: Date;
  IVA?: string;
  pagado?: number | null ;
  precio_envio?: number;
  Restaurante_idRestaurante: number;
}

export type facturaPk = "idFactura";
export type facturaId = factura[facturaPk];
export type facturaOptionalAttributes = "idFactura" | "Usuario_idUsuario" | "Mesa_idMesa" | "Mesero_idMesero" | "Cliente_idCliente" | "Fecha" | "IVA" | "pagado" | "precio_envio";
export type facturaCreationAttributes = Optional<facturaAttributes, facturaOptionalAttributes>;

export class factura extends Model<facturaAttributes, facturaCreationAttributes> implements facturaAttributes {
  idFactura!: number;
  Usuario_idUsuario?: number;
  Mesa_idMesa?: number | null ;
  Mesero_idMesero?: number;
  Cliente_idCliente?: number | null ;
  Fecha?: Date;
  IVA?: string;
  pagado?: number | null ;;
  precio_envio?: number;
  Restaurante_idRestaurante!: number;

  // factura belongsTo cliente via Cliente_idCliente
  Cliente_idCliente_cliente!: cliente;
  getCliente_idCliente_cliente!: Sequelize.BelongsToGetAssociationMixin<cliente>;
  setCliente_idCliente_cliente!: Sequelize.BelongsToSetAssociationMixin<cliente, clienteId>;
  createCliente_idCliente_cliente!: Sequelize.BelongsToCreateAssociationMixin<cliente>;
  // factura hasMany pedido via Factura_idFactura
  pedidos!: pedido[];
  getPedidos!: Sequelize.HasManyGetAssociationsMixin<pedido>;
  setPedidos!: Sequelize.HasManySetAssociationsMixin<pedido, pedidoId>;
  addPedido!: Sequelize.HasManyAddAssociationMixin<pedido, pedidoId>;
  addPedidos!: Sequelize.HasManyAddAssociationsMixin<pedido, pedidoId>;
  createPedido!: Sequelize.HasManyCreateAssociationMixin<pedido>;
  removePedido!: Sequelize.HasManyRemoveAssociationMixin<pedido, pedidoId>;
  removePedidos!: Sequelize.HasManyRemoveAssociationsMixin<pedido, pedidoId>;
  hasPedido!: Sequelize.HasManyHasAssociationMixin<pedido, pedidoId>;
  hasPedidos!: Sequelize.HasManyHasAssociationsMixin<pedido, pedidoId>;
  countPedidos!: Sequelize.HasManyCountAssociationsMixin;
  // factura belongsTo mesa via Mesa_idMesa
  Mesa_idMesa_mesa!: mesa;
  getMesa_idMesa_mesa!: Sequelize.BelongsToGetAssociationMixin<mesa>;
  setMesa_idMesa_mesa!: Sequelize.BelongsToSetAssociationMixin<mesa, mesaId>;
  createMesa_idMesa_mesa!: Sequelize.BelongsToCreateAssociationMixin<mesa>;
  // factura belongsTo mesero via Mesero_idMesero
  Mesero_idMesero_mesero!: mesero;
  getMesero_idMesero_mesero!: Sequelize.BelongsToGetAssociationMixin<mesero>;
  setMesero_idMesero_mesero!: Sequelize.BelongsToSetAssociationMixin<mesero, meseroId>;
  createMesero_idMesero_mesero!: Sequelize.BelongsToCreateAssociationMixin<mesero>;
  // factura belongsTo restaurante via Restaurante_idRestaurante
  Restaurante_idRestaurante_restaurante!: restaurante;
  getRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToGetAssociationMixin<restaurante>;
  setRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToSetAssociationMixin<restaurante, restauranteId>;
  createRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToCreateAssociationMixin<restaurante>;
  // factura belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof factura {
    return factura.init({
    idFactura: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    Mesa_idMesa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mesa',
        key: 'idMesa'
      }
    },
    Mesero_idMesero: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mesero',
        key: 'idMesero'
      }
    },
    Cliente_idCliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'idCliente'
      }
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IVA: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pagado: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    precio_envio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Restaurante_idRestaurante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurante',
        key: 'idRestaurante'
      }
    }
  }, {
    sequelize,
    tableName: 'factura',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idFactura" },
        ]
      },
      {
        name: "fk_Factura_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
      {
        name: "fk_Factura_Mesa1_idx",
        using: "BTREE",
        fields: [
          { name: "Mesa_idMesa" },
        ]
      },
      {
        name: "fk_Factura_Mesero1_idx",
        using: "BTREE",
        fields: [
          { name: "Mesero_idMesero" },
        ]
      },
      {
        name: "fk_Factura_Cliente1_idx",
        using: "BTREE",
        fields: [
          { name: "Cliente_idCliente" },
        ]
      },
      {
        name: "fk_Factura_Restaurante1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurante_idRestaurante" },
        ]
      },
    ]
  });
  }
}
