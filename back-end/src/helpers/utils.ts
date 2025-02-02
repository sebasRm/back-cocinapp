import multer from "multer";
import path from "path";

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, "C:/Users/Sebastian Montenegro/Desktop/Desarrollo_software_restaurantes/back-end/server-back-end/src/img"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req:any, file:any, cb:any) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Solo permitir imágenes
  } else {
    cb(new Error("Solo se permiten imágenes"));
  }
};

export const upload = multer({ storage, fileFilter });

export function responseMessage(res:any, status:any, data:any, msg:any)
{
    let jsonData:object = {
        msg:msg,
        data:data
    }
    return res.status(status).send(jsonData);
}


