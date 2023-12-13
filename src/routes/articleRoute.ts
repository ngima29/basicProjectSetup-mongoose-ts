import express, { Request, Response } from 'express';
import { ArticleController } from '../controllers';
import exceptionHandler from '../middlewares/exceptionHandler';
import { Validator } from '../middlewares';
import { createArticle, updateArticle } from '../validators';
import { upload } from '../utils';

const router = express.Router();

router.post(
  '/',
  upload.single('image'),
  Validator.check(createArticle),
  exceptionHandler(async (req: Request, res: Response) => {
    await ArticleController.create(req, res, req.file?.path);
  })
);

router.patch(
  '/:id',
  Validator.check(updateArticle),
  exceptionHandler(async (req: Request, res: Response) => {
    await ArticleController.update(req, res);
  })
);

router.delete(
  '/:id',
  exceptionHandler(async (req: Request, res: Response) => {
    await ArticleController.remove(req, res);
  })
);

router.get(
  '/:id',
  exceptionHandler(async (req: Request, res: Response) => {
    await ArticleController.getById(req, res);
  })
);

router.get(
  '/',
  exceptionHandler(async (req: Request, res: Response) => {
    await ArticleController.findAll(req, res);
  })
);

export default router;
