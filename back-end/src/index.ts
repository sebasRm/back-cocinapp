import  express  from "express";
import cors from "cors";
import { sequelize } from "./db/conexionDB";
import { router } from "./rutas/rutas";
const path = require("path");


const app= express();
app.use(cors());
app.use(express.json());
app.use('',router);
app.use("/images", express.static(path.join("C:/Users/Sebastian Montenegro/Desktop/Desarrollo_software_restaurantes/back-end/server-back-end/", "src/img")))

const main = async()=>{
    let sequelizeConection:any = await sequelize;
    sequelizeConection.authenticate();
    app.listen(4000, ()=>{
        console.log("Server listening port 4000");
    });
}
main()