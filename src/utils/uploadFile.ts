import multer from 'multer';
import * as path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const employeeImagesPath = path.resolve(__dirname, '../public/images');
        fs.mkdir(employeeImagesPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating directory:', err);
                callback(err, '');
            } else {
                console.log('Directory created:', employeeImagesPath);
                callback(null, employeeImagesPath);
            }
        });
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
  
  export const upload = multer({ storage: storage });