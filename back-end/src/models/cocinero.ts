import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usuario, usuarioId } from './usuario';

export interface cocineroAttributes {
  idCocinero: number;
  Usuario_idUsuario: number;
}

export type cocineroPk = "idCocinero";
export type cocineroId = cocinero[cocineroPk];
export type cocineroOptionalAttributes = "idCocinero";
export type cocineroCreationAttributes = Optional<cocineroAttributes, cocineroOptionalAttributes>;

export class cocinero extends Model<cocineroAttributes, cocineroCreationAttributes> implements cocineroAttributes {
  idCocinero!: number;
  Usuario_idUsuario!: number;

  // cocinero belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cocinero {
    return cocinero.init({
    idCocinero: {
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
    tableName: 'cocinero',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCocinero" },
        ]
      },
      {
        name: "fk_Cocinero_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
