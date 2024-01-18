import express, { Request, Response } from 'express';
import { TestController } from '../controllers';
import exceptionHandler from '../middlewares/exceptionHandler';
import { Validator } from '../middlewares';
import { createTest } from '../validators';
// import { upload } from '../utils';

const router = express.Router();

router.post(
  '/',
  Validator.check(createTest),
  exceptionHandler(async (req: Request, res: Response) => {
    await TestController.create(req, res);
  })
);

router.get(
  '/qr',
  exceptionHandler(async (req: Request, res: Response) => {
    await TestController.getMyQR(req, res);
  })
);
router.get(
  '/',
  exceptionHandler(async (req: Request, res: Response) => {
    await TestController.findAll(req, res);
  })
);

export default router;
