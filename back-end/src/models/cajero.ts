import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usuario, usuarioId } from './usuario';

export interface cajeroAttributes {
  idCajero: number;
  Usuario_idUsuario: number;
}

export type cajeroPk = "idCajero";
export type cajeroId = cajero[cajeroPk];
export type cajeroOptionalAttributes = "idCajero";
export type cajeroCreationAttributes = Optional<cajeroAttributes, cajeroOptionalAttributes>;

export class cajero extends Model<cajeroAttributes, cajeroCreationAttributes> implements cajeroAttributes {
  idCajero!: number;
  Usuario_idUsuario!: number;

  // cajero belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cajero {
    return cajero.init({
    idCajero: {
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
    tableName: 'cajero',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCajero" },
        ]
      },
      {
        name: "fk_Cajero_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
