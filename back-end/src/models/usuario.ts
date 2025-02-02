import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cajero, cajeroId } from './cajero';
import type { cliente, clienteId } from './cliente';
import type { cocinero, cocineroId } from './cocinero';
import type { estado, estadoId } from './estado';
import type { factura, facturaId } from './factura';
import type { gerente, gerenteId } from './gerente';
import type { mesero, meseroId } from './mesero';
import type { restaurante, restauranteId } from './restaurante';
import type { usuario_has_restaurante, usuario_has_restauranteId } from './usuario_has_restaurante';

export interface usuarioAttributes {
  idUsuario: number;
  nombre?: string;
  correo?: string;
  celular?: string;
  contrasena?: string;
  direccion?: string;
  referencia?: string;
  Estado_idEstado: number;
}

export type usuarioPk = "idUsuario";
export type usuarioId = usuario[usuarioPk];
export type usuarioOptionalAttributes = "idUsuario" | "nombre" | "correo" | "celular" | "contrasena" | "direccion" | "referencia";
export type usuarioCreationAttributes = Optional<usuarioAttributes, usuarioOptionalAttributes>;

export class usuario extends Model<usuarioAttributes, usuarioCreationAttributes> implements usuarioAttributes {
  idUsuario!: number;
  nombre?: string;
  correo?: string;
  celular?: string;
  contrasena?: string;
  direccion?: string;
  referencia?: string;
  Estado_idEstado!: number;

  // usuario belongsTo estado via Estado_idEstado
  Estado_idEstado_estado!: estado;
  getEstado_idEstado_estado!: Sequelize.BelongsToGetAssociationMixin<estado>;
  setEstado_idEstado_estado!: Sequelize.BelongsToSetAssociationMixin<estado, estadoId>;
  createEstado_idEstado_estado!: Sequelize.BelongsToCreateAssociationMixin<estado>;
  // usuario hasMany cajero via Usuario_idUsuario
  cajeros!: cajero[];
  getCajeros!: Sequelize.HasManyGetAssociationsMixin<cajero>;
  setCajeros!: Sequelize.HasManySetAssociationsMixin<cajero, cajeroId>;
  addCajero!: Sequelize.HasManyAddAssociationMixin<cajero, cajeroId>;
  addCajeros!: Sequelize.HasManyAddAssociationsMixin<cajero, cajeroId>;
  createCajero!: Sequelize.HasManyCreateAssociationMixin<cajero>;
  removeCajero!: Sequelize.HasManyRemoveAssociationMixin<cajero, cajeroId>;
  removeCajeros!: Sequelize.HasManyRemoveAssociationsMixin<cajero, cajeroId>;
  hasCajero!: Sequelize.HasManyHasAssociationMixin<cajero, cajeroId>;
  hasCajeros!: Sequelize.HasManyHasAssociationsMixin<cajero, cajeroId>;
  countCajeros!: Sequelize.HasManyCountAssociationsMixin;
  // usuario hasMany cliente via Usuario_idUsuario
  clientes!: cliente[];
  getClientes!: Sequelize.HasManyGetAssociationsMixin<cliente>;
  setClientes!: Sequelize.HasManySetAssociationsMixin<cliente, clienteId>;
  addCliente!: Sequelize.HasManyAddAssociationMixin<cliente, clienteId>;
  addClientes!: Sequelize.HasManyAddAssociationsMixin<cliente, clienteId>;
  createCliente!: Sequelize.HasManyCreateAssociationMixin<cliente>;
  removeCliente!: Sequelize.HasManyRemoveAssociationMixin<cliente, clienteId>;
  removeClientes!: Sequelize.HasManyRemoveAssociationsMixin<cliente, clienteId>;
  hasCliente!: Sequelize.HasManyHasAssociationMixin<cliente, clienteId>;
  hasClientes!: Sequelize.HasManyHasAssociationsMixin<cliente, clienteId>;
  countClientes!: Sequelize.HasManyCountAssociationsMixin;
  // usuario hasMany cocinero via Usuario_idUsuario
  cocineros!: cocinero[];
  getCocineros!: Sequelize.HasManyGetAssociationsMixin<cocinero>;
  setCocineros!: Sequelize.HasManySetAssociationsMixin<cocinero, cocineroId>;
  addCocinero!: Sequelize.HasManyAddAssociationMixin<cocinero, cocineroId>;
  addCocineros!: Sequelize.HasManyAddAssociationsMixin<cocinero, cocineroId>;
  createCocinero!: Sequelize.HasManyCreateAssociationMixin<cocinero>;
  removeCocinero!: Sequelize.HasManyRemoveAssociationMixin<cocinero, cocineroId>;
  removeCocineros!: Sequelize.HasManyRemoveAssociationsMixin<cocinero, cocineroId>;
  hasCocinero!: Sequelize.HasManyHasAssociationMixin<cocinero, cocineroId>;
  hasCocineros!: Sequelize.HasManyHasAssociationsMixin<cocinero, cocineroId>;
  countCocineros!: Sequelize.HasManyCountAssociationsMixin;
  // usuario hasMany factura via Usuario_idUsuario
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
  // usuario hasMany gerente via Usuario_idUsuario
  gerentes!: gerente[];
  getGerentes!: Sequelize.HasManyGetAssociationsMixin<gerente>;
  setGerentes!: Sequelize.HasManySetAssociationsMixin<gerente, gerenteId>;
  addGerente!: Sequelize.HasManyAddAssociationMixin<gerente, gerenteId>;
  addGerentes!: Sequelize.HasManyAddAssociationsMixin<gerente, gerenteId>;
  createGerente!: Sequelize.HasManyCreateAssociationMixin<gerente>;
  removeGerente!: Sequelize.HasManyRemoveAssociationMixin<gerente, gerenteId>;
  removeGerentes!: Sequelize.HasManyRemoveAssociationsMixin<gerente, gerenteId>;
  hasGerente!: Sequelize.HasManyHasAssociationMixin<gerente, gerenteId>;
  hasGerentes!: Sequelize.HasManyHasAssociationsMixin<gerente, gerenteId>;
  countGerentes!: Sequelize.HasManyCountAssociationsMixin;
  // usuario hasMany mesero via Usuario_idUsuario
  meseros!: mesero[];
  getMeseros!: Sequelize.HasManyGetAssociationsMixin<mesero>;
  setMeseros!: Sequelize.HasManySetAssociationsMixin<mesero, meseroId>;
  addMesero!: Sequelize.HasManyAddAssociationMixin<mesero, meseroId>;
  addMeseros!: Sequelize.HasManyAddAssociationsMixin<mesero, meseroId>;
  createMesero!: Sequelize.HasManyCreateAssociationMixin<mesero>;
  removeMesero!: Sequelize.HasManyRemoveAssociationMixin<mesero, meseroId>;
  removeMeseros!: Sequelize.HasManyRemoveAssociationsMixin<mesero, meseroId>;
  hasMesero!: Sequelize.HasManyHasAssociationMixin<mesero, meseroId>;
  hasMeseros!: Sequelize.HasManyHasAssociationsMixin<mesero, meseroId>;
  countMeseros!: Sequelize.HasManyCountAssociationsMixin;
  // usuario belongsToMany restaurante via Usuario_idUsuario and Restaurante_idRestaurante
  Restaurante_idRestaurante_restaurantes!: restaurante[];
  getRestaurante_idRestaurante_restaurantes!: Sequelize.BelongsToManyGetAssociationsMixin<restaurante>;
  setRestaurante_idRestaurante_restaurantes!: Sequelize.BelongsToManySetAssociationsMixin<restaurante, restauranteId>;
  addRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToManyAddAssociationMixin<restaurante, restauranteId>;
  addRestaurante_idRestaurante_restaurantes!: Sequelize.BelongsToManyAddAssociationsMixin<restaurante, restauranteId>;
  createRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToManyCreateAssociationMixin<restaurante>;
  removeRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToManyRemoveAssociationMixin<restaurante, restauranteId>;
  removeRestaurante_idRestaurante_restaurantes!: Sequelize.BelongsToManyRemoveAssociationsMixin<restaurante, restauranteId>;
  hasRestaurante_idRestaurante_restaurante!: Sequelize.BelongsToManyHasAssociationMixin<restaurante, restauranteId>;
  hasRestaurante_idRestaurante_restaurantes!: Sequelize.BelongsToManyHasAssociationsMixin<restaurante, restauranteId>;
  countRestaurante_idRestaurante_restaurantes!: Sequelize.BelongsToManyCountAssociationsMixin;
  // usuario hasMany usuario_has_restaurante via Usuario_idUsuario
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

  static initModel(sequelize: Sequelize.Sequelize): typeof usuario {
    return usuario.init({
    idUsuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    celular: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    contrasena: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    referencia: {
      type: DataTypes.STRING(45),
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
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "fk_Usuario_Estado1_idx",
        using: "BTREE",
        fields: [
          { name: "Estado_idEstado" },
        ]
      },
    ]
  });
  }
}
