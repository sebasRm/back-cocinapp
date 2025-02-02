import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { mesa, mesaId } from './mesa';
import type { plato, platoId } from './plato';
import type { restaurante, restauranteId } from './restaurante';
import type { usuario, usuarioId } from './usuario';

export interface estadoAttributes {
  idEstado: number;
  nombre?: string;
}

export type estadoPk = "idEstado";
export type estadoId = estado[estadoPk];
export type estadoOptionalAttributes = "idEstado" | "nombre";
export type estadoCreationAttributes = Optional<estadoAttributes, estadoOptionalAttributes>;

export class estado extends Model<estadoAttributes, estadoCreationAttributes> implements estadoAttributes {
  idEstado!: number;
  nombre?: string;

  // estado hasMany mesa via Estado_idEstado
  mesas!: mesa[];
  getMesas!: Sequelize.HasManyGetAssociationsMixin<mesa>;
  setMesas!: Sequelize.HasManySetAssociationsMixin<mesa, mesaId>;
  addMesa!: Sequelize.HasManyAddAssociationMixin<mesa, mesaId>;
  addMesas!: Sequelize.HasManyAddAssociationsMixin<mesa, mesaId>;
  createMesa!: Sequelize.HasManyCreateAssociationMixin<mesa>;
  removeMesa!: Sequelize.HasManyRemoveAssociationMixin<mesa, mesaId>;
  removeMesas!: Sequelize.HasManyRemoveAssociationsMixin<mesa, mesaId>;
  hasMesa!: Sequelize.HasManyHasAssociationMixin<mesa, mesaId>;
  hasMesas!: Sequelize.HasManyHasAssociationsMixin<mesa, mesaId>;
  countMesas!: Sequelize.HasManyCountAssociationsMixin;
  // estado hasMany plato via Estado_idEstado
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
  // estado hasMany restaurante via Estado_idEstado
  restaurantes!: restaurante[];
  getRestaurantes!: Sequelize.HasManyGetAssociationsMixin<restaurante>;
  setRestaurantes!: Sequelize.HasManySetAssociationsMixin<restaurante, restauranteId>;
  addRestaurante!: Sequelize.HasManyAddAssociationMixin<restaurante, restauranteId>;
  addRestaurantes!: Sequelize.HasManyAddAssociationsMixin<restaurante, restauranteId>;
  createRestaurante!: Sequelize.HasManyCreateAssociationMixin<restaurante>;
  removeRestaurante!: Sequelize.HasManyRemoveAssociationMixin<restaurante, restauranteId>;
  removeRestaurantes!: Sequelize.HasManyRemoveAssociationsMixin<restaurante, restauranteId>;
  hasRestaurante!: Sequelize.HasManyHasAssociationMixin<restaurante, restauranteId>;
  hasRestaurantes!: Sequelize.HasManyHasAssociationsMixin<restaurante, restauranteId>;
  countRestaurantes!: Sequelize.HasManyCountAssociationsMixin;
  // estado hasMany usuario via Estado_idEstado
  usuarios!: usuario[];
  getUsuarios!: Sequelize.HasManyGetAssociationsMixin<usuario>;
  setUsuarios!: Sequelize.HasManySetAssociationsMixin<usuario, usuarioId>;
  addUsuario!: Sequelize.HasManyAddAssociationMixin<usuario, usuarioId>;
  addUsuarios!: Sequelize.HasManyAddAssociationsMixin<usuario, usuarioId>;
  createUsuario!: Sequelize.HasManyCreateAssociationMixin<usuario>;
  removeUsuario!: Sequelize.HasManyRemoveAssociationMixin<usuario, usuarioId>;
  removeUsuarios!: Sequelize.HasManyRemoveAssociationsMixin<usuario, usuarioId>;
  hasUsuario!: Sequelize.HasManyHasAssociationMixin<usuario, usuarioId>;
  hasUsuarios!: Sequelize.HasManyHasAssociationsMixin<usuario, usuarioId>;
  countUsuarios!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof estado {
    return estado.init({
    idEstado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(70),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'estado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEstado" },
        ]
      },
    ]
  });
  }
}
