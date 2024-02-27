import multer from 'multer';
import path from 'path';
// Multer storage configuration
const storage = multer.diskStorage({
  destination: 'uploads/', // specify the folder where images will be stored
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
// Multer file filter
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};
// Multer configuration
const upload = multer({ storage,fileFilter });
export default upload;