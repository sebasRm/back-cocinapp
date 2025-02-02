import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { restaurante, restauranteId } from './restaurante';
import type { usuario, usuarioId } from './usuario';

export interface usuario_has_restauranteAttributes {
  Usuario_idUsuario: number;
  Restaurante_idRestaurante: number;
}

export type usuario_has_restaurantePk = "Usuario_idUsuario" | "Restaurante_idRestaurante";
export type usuario_has_restauranteId = usuario_has_restaurante[usuario_has_restaurantePk];
export type usuario_has_restauranteCreationAttributes = usuario_has_restauranteAttributes;

export class usuario_has_restaurante extends Model<usuario_has_restauranteAttributes, usuario_has_restauranteCreationAttributes> implements usuario_has_restauranteAttributes {
  Usuario_idUsuario!: number;
  Restaurante_idRestaurante!: number;

  // usuario_has_restaurante belongsTo restaurante via Restaurante_idRestaurante
  Restaurante_idRestaurante_restaurante!: restaurante;
  getRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToGetAssociationMixin<restaurante>;
  setRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToSetAssociationMixin<restaurante, restauranteId>;
  createRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToCreateAssociationMixin<restaurante>;
  // usuario_has_restaurante belongsTo usuario via Usuario_idUsuario
  Usuario_idUsuario_usuario!: usuario;
  getUsuario_idUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setUsuario_idUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof usuario_has_restaurante {
    return usuario_has_restaurante.init({
    Usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    Restaurante_idRestaurante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'restaurante',
        key: 'idRestaurante'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario_has_restaurante',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
          { name: "Restaurante_idRestaurante" },
        ]
      },
      {
        name: "fk_Usuario_has_Restaurante_Restaurante1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurante_idRestaurante" },
        ]
      },
      {
        name: "fk_Usuario_has_Restaurante_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "Usuario_idUsuario" },
        ]
      },
    ]
  });
  }
}
