import {RouterClass} from '../classes';
import { TestController } from '../controllers';
import exceptionHandler from '../middlewares/exceptionHandler';
import { Validator } from '../middlewares';
import { createTest } from '../validators';

 export class TestRouter extends RouterClass {
  constructor(){
    super()
  }
  
  define(): void {
    this.router
    .route("/")
    .get(exceptionHandler(TestController.findAll))
    .post(
      Validator.check(createTest),
      exceptionHandler(TestController.create)
    )

   this.router.get('/qr',exceptionHandler(TestController.getMyQR))
  }
 }

