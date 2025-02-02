import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { factura, facturaId } from './factura';
import type { usuario, usuarioId } from './usuario';

export interface meseroAttributes {
  idMesero: number;
  Usuario_idUsuario: number;
}

export type meseroPk = "idMesero";
export type meseroId = mesero[meseroPk];
export type meseroOptionalAttributes = "idMesero";
export type meseroCreationAttributes = Optional<meseroAttributes, meseroOptionalAttributes>;

export class mesero extends Model<meseroAttributes, meseroCreationAttributes> implements meseroAttributes {
  idMesero!: number;
  Usuario_idUsuario!: number;

  // mesero hasMany factura via Mesero_idMesero
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
  // mesero belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof mesero {
    return mesero.init({
    idMesero: {
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
    tableName: 'mesero',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMesero" },
        ]
      },
      {
        name: "fk_Mesero_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
