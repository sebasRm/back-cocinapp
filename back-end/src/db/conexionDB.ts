import { Sequelize } from "sequelize";
let sequelize: any;
// LOCAL
/*sequelize = new Sequelize("cocinApp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});*/
// NUBE
sequelize = new Sequelize("cocinApp", "root", "MiZZLgOUlYNCsLaLeewavGAvnkMTqiSd", {
  host: "mysql.railway.internal",
  dialect: "mysql",
});

export { sequelize };
