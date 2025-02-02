import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categoria, categoriaId } from './categoria';
import type { estado, estadoId } from './estado';
import type { factura, facturaId } from './factura';
import type { mesa, mesaId } from './mesa';
import type { plato, platoId } from './plato';
import type { usuario, usuarioId } from './usuario';
import type { usuario_has_restaurante, usuario_has_restauranteId } from './usuario_has_restaurante';

export interface restauranteAttributes {
  idRestaurante: number;
  nombre?: string;
  descripcion?: string;
  pagado?: number;
  Estado_idEstado: number;
}

export type restaurantePk = "idRestaurante";
export type restauranteId = restaurante[restaurantePk];
export type restauranteOptionalAttributes = "idRestaurante" | "nombre" | "descripcion" | "pagado";
export type restauranteCreationAttributes = Optional<restauranteAttributes, restauranteOptionalAttributes>;

export class restaurante extends Model<restauranteAttributes, restauranteCreationAttributes> implements restauranteAttributes {
  idRestaurante!: number;
  nombre?: string;
  descripcion?: string;
  pagado?: number;
  Estado_idEstado!: number;

  // restaurante belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // restaurante hasMany categoria via Restaurante_idRestaurante
  categoria!: categoria[];
  getCategoria!: Sequelize.HasManyGetAssociationsMixin<categoria>;
  setCategoria!: Sequelize.HasManySetAssociationsMixin<categoria, categoriaId>;
  addCategorium!: Sequelize.HasManyAddAssociationMixin<categoria, categoriaId>;
  addCategoria!: Sequelize.HasManyAddAssociationsMixin<categoria, categoriaId>;
  createCategorium!: Sequelize.HasManyCreateAssociationMixin<categoria>;
  removeCategorium!: Sequelize.HasManyRemoveAssociationMixin<categoria, categoriaId>;
  removeCategoria!: Sequelize.HasManyRemoveAssociationsMixin<categoria, categoriaId>;
  hasCategorium!: Sequelize.HasManyHasAssociationMixin<categoria, categoriaId>;
  hasCategoria!: Sequelize.HasManyHasAssociationsMixin<categoria, categoriaId>;
  countCategoria!: Sequelize.HasManyCountAssociationsMixin;
  // restaurante hasMany factura via Restaurante_idRestaurante
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
  // restaurante hasMany mesa via Restaurante_idRestaurante
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
  // restaurante hasMany plato via Restaurante_idRestaurante
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
  // restaurante belongsToMany usuario via Restaurante_idRestaurante and Usuario_idUsuario
  Usuario_idUsuario_usuarios!: usuario[];
  getUsuario_idUsuario_usuarios!: Sequelize.BelongsToManyGetAssociationsMixin<usuario>;
  setUsuario_idUsuario_usuarios!: Sequelize.BelongsToManySetAssociationsMixin<usuario, usuarioId>;
  addUsuario_idUsuario_usuario!: Sequelize.BelongsToManyAddAssociationMixin<usuario, usuarioId>;
  addUsuario_idUsuario_usuarios!: Sequelize.BelongsToManyAddAssociationsMixin<usuario, usuarioId>;
  createUsuario_idUsuario_usuario!: Sequelize.BelongsToManyCreateAssociationMixin<usuario>;
  removeUsuario_idUsuario_usuario!: Sequelize.BelongsToManyRemoveAssociationMixin<usuario, usuarioId>;
  removeUsuario_idUsuario_usuarios!: Sequelize.BelongsToManyRemoveAssociationsMixin<usuario, usuarioId>;
  hasUsuario_idUsuario_usuario!: Sequelize.BelongsToManyHasAssociationMixin<usuario, usuarioId>;
  hasUsuario_idUsuario_usuarios!: Sequelize.BelongsToManyHasAssociationsMixin<usuario, usuarioId>;
  countUsuario_idUsuario_usuarios!: Sequelize.BelongsToManyCountAssociationsMixin;
  // restaurante hasMany usuario_has_restaurante via Restaurante_idRestaurante
  usuario_has_restaurantes!: usuario_has_restaurante[];
  getUsuario_has_restaurantes!: Sequelize.HasManyGetAssociationsMixin<usuario_has_restaurante>;
  setUsuario_has_restaurantes!: Sequelize.HasManySetAssociationsMixin<usuario_has_restaurante, usuario_has_restauranteId>;
  addUsuario_has_restaurante!: Sequelize.HasManyAddAssociationMixin<usuario_has_restaurante, usuario_has_restauranteId>;
  addUsuario_has_restaurantes!: Sequelize.HasManyAddAssociationsMixin<usuario_has_restaurante, usuario_has_restauranteId>;
  createUsuario_has_restaurante!: Sequelize.HasManyCreateAssociationMixin<usuario_has_restaurante>;
  removeUsuario_has_restaurante!: Sequelize.HasManyRemoveAssociationMixin<usuario_has_restaurante, usuario_has_restauranteId>;
  removeUsuario_has_restaurantes!: Sequelize.HasManyRemoveAssociationsMixin<usuario_has_restaurante, usuario_has_restauranteId>;
  hasUsuario_has_restaurante!: Sequelize.HasManyHasAssociationMixin<usuario_has_restaurante, usuario_has_restauranteId>;
  hasUsuario_has_restaurantes!: Sequelize.HasManyHasAssociationsMixin<usuario_has_restaurante, usuario_has_restauranteId>;
  countUsuario_has_restaurantes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof restaurante {
    return restaurante.init({
    idRestaurante: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    pagado: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Estado_idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado',
        key: 'idEstado'
      }
    }
  }, {
    sequelize,
    tableName: 'restaurante',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRestaurante" },
        ]
      },
      {
        name: "fk_Restaurante_Estado1_idx",
        using: "BTREE",
        fields: [
          { name: "Estado_idEstado" },
        ]
      },
    ]
  });
  }
}
