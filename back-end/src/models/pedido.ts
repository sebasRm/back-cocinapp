import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { factura, facturaId } from './factura';
import type { plato, platoId } from './plato';

export interface pedidoAttributes {
  idPedido: number;
  Plato_idPlato?: number;
  Factura_idFactura: number;
  observacion?: string;
  cantidad?: number;
  precio?: number;
}

export type pedidoPk = "idPedido";
export type pedidoId = pedido[pedidoPk];
export type pedidoOptionalAttributes = "idPedido" | "Plato_idPlato" | "observacion" | "cantidad" | "precio";
export type pedidoCreationAttributes = Optional<pedidoAttributes, pedidoOptionalAttributes>;

export class pedido extends Model<pedidoAttributes, pedidoCreationAttributes> implements pedidoAttributes {
  idPedido!: number;
  Plato_idPlato?: number;
  Factura_idFactura!: number;
  observacion?: string;
  cantidad?: number;
  precio?: number;

  // pedido belongsTo factura via Factura_idFactura
  Factura_idFactura_factura!: factura;
  getFactura_idFactura_factura!: Sequelize.BelongsToGetAssociationMixin<factura>;
  setFactura_idFactura_factura!: Sequelize.BelongsToSetAssociationMixin<factura, facturaId>;
  createFactura_idFactura_factura!: Sequelize.BelongsToCreateAssociationMixin<factura>;
  // pedido belongsTo plato via Plato_idPlato
  Plato_idPlato_plato!: plato;
  getPlato_idPlato_plato!: Sequelize.BelongsToGetAssociationMixin<plato>;
  setPlato_idPlato_plato!: Sequelize.BelongsToSetAssociationMixin<plato, platoId>;
  createPlato_idPlato_plato!: Sequelize.BelongsToCreateAssociationMixin<plato>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pedido {
    return pedido.init({
    idPedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Plato_idPlato: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'plato',
        key: 'idPlato'
      }
    },
    Factura_idFactura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'factura',
        key: 'idFactura'
      }
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pedido',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPedido" },
        ]
      },
      {
        name: "fk_Pedido_Plato1_idx",
        using: "BTREE",
        fields: [
          { name: "Plato_idPlato" },
        ]
      },
      {
        name: "fk_Pedido_Factura1_idx",
        using: "BTREE",
        fields: [
          { name: "Factura_idFactura" },
        ]
      },
    ]
  });
  }
}
