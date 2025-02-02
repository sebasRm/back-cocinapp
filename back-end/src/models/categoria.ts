import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { plato, platoId } from './plato';
import type { restaurante, restauranteId } from './restaurante';

export interface categoriaAttributes {
  idCategoria: number;
  nombre?: string;
  descripcion?: string;
  Restaurante_idRestaurante: number;
}

export type categoriaPk = "idCategoria";
export type categoriaId = categoria[categoriaPk];
export type categoriaOptionalAttributes = "idCategoria" | "nombre" | "descripcion";
export type categoriaCreationAttributes = Optional<categoriaAttributes, categoriaOptionalAttributes>;

export class categoria extends Model<categoriaAttributes, categoriaCreationAttributes> implements categoriaAttributes {
  idCategoria!: number;
  nombre?: string;
  descripcion?: string;
  Restaurante_idRestaurante!: number;

  // categoria hasMany plato via Categoria_idCategoria
  platos!: plato[];
  getPlatos!: Sequelize.HasManyGetAssociationsMixin<plato>;
  setPlatos!: Sequelize.HasManySetAssociationsMixin<plato, platoId>;
  addPlato!: Sequelize.HasManyAddAssociationMixin<plato, platoId>;
  addPlatos!: Sequelize.HasManyAddAssociationsMixin<plato, platoId>;
  createPlato!: Sequelize.HasManyCreateAssociationMixin<plato>;
  removePlato!: Sequelize.HasManyRemoveAssociationMixin<plato, platoId>;
  removePlatos!: Sequelize.HasManyRemoveAssociationsMixin<plato, platoId>;
  hasPlato!: Sequelize.HasManyHasAssociationMixin<plato, platoId>;
  hasPlatos!: Sequelize.HasManyHasAssociationsMixin<plato, platoId>;
  countPlatos!: Sequelize.HasManyCountAssociationsMixin;
  // categoria belongsTo restaurante via Restaurante_idRestaurante
  Restaurante_idRestaurante_restaurante!: restaurante;
  getRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToGetAssociationMixin<restaurante>;
  setRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToSetAssociationMixin<restaurante, restauranteId>;
  createRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToCreateAssociationMixin<restaurante>;

  static initModel(sequelize: Sequelize.Sequelize): typeof categoria {
    return categoria.init({
    idCategoria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(300),
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
    tableName: 'categoria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCategoria" },
        ]
      },
      {
        name: "fk_Categoria_Restaurante1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurante_idRestaurante" },
        ]
      },
    ]
  });
  }
}
