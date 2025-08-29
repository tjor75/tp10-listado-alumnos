import fs from "fs";
import path from "path";
import multer from "multer";

const fotoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.params.id;
        const dir = path.join(process.cwd(), 'uploads', 'alumnos', id);
        // Crear carpeta si no existe
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.jpg';
        cb(null, `foto_${req.params.id}${ext}`);
    }
});

export const fotoUpload = multer({
    storage: fotoStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Solo se permiten imágenes'), false);
        }
        cb(null, true);
    }
});