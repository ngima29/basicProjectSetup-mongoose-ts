"use strict";
// import multer from 'multer';
// import * as path from 'path';
// import fs from 'fs';
// import {Request} from 'express'
// import { any } from 'joi';
// const storage = multer.diskStorage({
//     destination: (req:Request, file:any, callback:any) => {
//         const employeeImagesPath = path.resolve(__dirname, '../public/images');
//         fs.mkdir(employeeImagesPath, { recursive: true }, (err:any) => {
//             if (err) {
//                 console.error('Error creating directory:', err);
//                 callback(err, '');
//             } else {
//                 console.log('Directory created:', employeeImagesPath);
//                 callback(null, employeeImagesPath);
//             }
//         });
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     },
// });
// export const upload = multer({ storage: storage });
