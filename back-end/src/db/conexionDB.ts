import { Sequelize } from "sequelize";
let sequelize: any;

sequelize = new Sequelize("cocinApp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize };
