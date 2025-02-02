import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { factura, facturaId } from './factura';
import type { usuario, usuarioId } from './usuario';

export interface clienteAttributes {
  idCliente: number;
  Usuario_idUsuario: number;
}

export type clientePk = "idCliente";
export type clienteId = cliente[clientePk];
export type clienteOptionalAttributes = "idCliente";
export type clienteCreationAttributes = Optional<clienteAttributes, clienteOptionalAttributes>;

export class cliente extends Model<clienteAttributes, clienteCreationAttributes> implements clienteAttributes {
  idCliente!: number;
  Usuario_idUsuario!: number;

  // cliente hasMany factura via Cliente_idCliente
  facturas!: factura[];
  getFacturas!: Sequelize.HasManyGetAssociationsMixin<factura>;
  setFacturas!: Sequelize.HasManySetAssociationsMixin<factura, facturaId>;
  addFactura!: Sequelize.HasManyAddAssociationMixin<factura, facturaId>;
  addFacturas!: Sequelize.HasManyAddAssociationsMixin<factura, facturaId>;
  createFactura!: Sequelize.HasManyCreateAssociationMixin<factura>;
  removeFactura!: Sequelize.HasManyRemoveAssociationMixin<factura, facturaId>;
  removeFacturas!: Sequelize.HasManyRemoveAssociationsMixin<factura, facturaId>;
  hasFactura!: Sequelize.HasManyHasAssociationMixin<factura, facturaId>;
  hasFacturas!: Sequelize.HasManyHasAssociationsMixin<factura, facturaId>;
  countFacturas!: Sequelize.HasManyCountAssociationsMixin;
  // cliente belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cliente {
    return cliente.init({
    idCliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    }
  }, {
    sequelize,
    tableName: 'cliente',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCliente" },
        ]
      },
      {
        name: "fk_Cliente_Usuario_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
