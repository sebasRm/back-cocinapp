import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { estado, estadoId } from './estado';
import type { factura, facturaId } from './factura';
import type { restaurante, restauranteId } from './restaurante';

export interface mesaAttributes {
  idMesa: number;
  numero?: number;
  ocupada?: number;
  Estado_idEstado: number;
  Restaurante_idRestaurante: number;
}

export type mesaPk = "idMesa";
export type mesaId = mesa[mesaPk];
export type mesaOptionalAttributes = "idMesa" | "numero" | "ocupada";
export type mesaCreationAttributes = Optional<mesaAttributes, mesaOptionalAttributes>;

export class mesa extends Model<mesaAttributes, mesaCreationAttributes> implements mesaAttributes {
  idMesa!: number;
  numero?: number;
  ocupada?: number;
  Estado_idEstado!: number;
  Restaurante_idRestaurante!: number;

  // mesa belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // mesa hasMany factura via Mesa_idMesa
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
  // mesa belongsTo restaurante via Restaurante_idRestaurante
  Restaurante_idRestaurante_restaurante!: restaurante;
  getRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToGetAssociationMixin<restaurante>;
  setRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToSetAssociationMixin<restaurante, restauranteId>;
  createRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToCreateAssociationMixin<restaurante>;

  static initModel(sequelize: Sequelize.Sequelize): typeof mesa {
    return mesa.init({
    idMesa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ocupada: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    Estado_idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado',
        key: 'idEstado'
      }
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
    tableName: 'mesa',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMesa" },
        ]
      },
      {
        name: "fk_Mesa_Estado1_idx",
        using: "BTREE",
        fields: [
          { name: "Estado_idEstado" },
        ]
      },
      {
        name: "fk_Mesa_Restaurante1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurante_idRestaurante" },
        ]
      },
    ]
  });
  }
}
