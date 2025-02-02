import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usuario, usuarioId } from './usuario';

export interface gerenteAttributes {
  idGerente: number;
  Usuario_idUsuario: number;
}

export type gerentePk = "idGerente";
export type gerenteId = gerente[gerentePk];
export type gerenteOptionalAttributes = "idGerente";
export type gerenteCreationAttributes = Optional<gerenteAttributes, gerenteOptionalAttributes>;

export class gerente extends Model<gerenteAttributes, gerenteCreationAttributes> implements gerenteAttributes {
  idGerente!: number;
  Usuario_idUsuario!: number;

  // gerente belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof gerente {
    return gerente.init({
    idGerente: {
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
    tableName: 'gerente',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idGerente" },
        ]
      },
      {
        name: "fk_Gerente_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
