import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categoria, categoriaId } from './categoria';
import type { estado, estadoId } from './estado';
import type { pedido, pedidoId } from './pedido';
import type { restaurante, restauranteId } from './restaurante';

export interface platoAttributes {
  idPlato: number;
  Categoria_idCategoria: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  imagen?: string;
  Estado_idEstado: number;
  Restaurante_idRestaurante: number;
}

export type platoPk = "idPlato";
export type platoId = plato[platoPk];
export type platoOptionalAttributes = "idPlato" | "nombre" | "descripcion" | "precio" | "imagen";
export type platoCreationAttributes = Optional<platoAttributes, platoOptionalAttributes>;

export class plato extends Model<platoAttributes, platoCreationAttributes> implements platoAttributes {
  idPlato!: number;
  Categoria_idCategoria!: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  imagen?: string;
  Estado_idEstado!: number;
  Restaurante_idRestaurante!: number;

  // plato belongsTo categoria via Categoria_idCategoria
  Categoria_idCategoria_categorium!: categoria;
  getCategoria_idCategoria_categorium!: Sequelize.BelongsToGetAssociationMixin<categoria>;
  setCategoria_idCategoria_categorium!: Sequelize.BelongsToSetAssociationMixin<categoria, categoriaId>;
  createCategoria_idCategoria_categorium!: Sequelize.BelongsToCreateAssociationMixin<categoria>;
  // plato belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // plato hasMany pedido via Plato_idPlato
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
  // plato belongsTo restaurante via Restaurante_idRestaurante
  Restaurante_idRestaurante_restaurante!: restaurante;
  getRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToGetAssociationMixin<restaurante>;
  setRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToSetAssociationMixin<restaurante, restauranteId>;
  createRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToCreateAssociationMixin<restaurante>;

  static initModel(sequelize: Sequelize.Sequelize): typeof plato {
    return plato.init({
    idPlato: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Categoria_idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoria',
        key: 'idCategoria'
      }
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'plato',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPlato" },
        ]
      },
      {
        name: "fk_Plato_Categoria1_idx",
        using: "BTREE",
        fields: [
          { name: "Categoria_idCategoria" },
        ]
      },
      {
        name: "fk_Plato_Estado1_idx",
        using: "BTREE",
        fields: [
          { name: "Estado_idEstado" },
        ]
      },
      {
        name: "fk_Plato_Restaurante1_idx",
        using: "BTREE",
        fields: [
          { name: "Restaurante_idRestaurante" },
        ]
      },
    ]
  });
  }
}
