import { RouterClass} from '../classes'
import { ArticleController } from '../controllers';
import exceptionHandler from '../middlewares/exceptionHandler';
import { Validator } from '../middlewares';
import { createArticle, updateArticle } from '../validators';


export class ArticleRoute extends RouterClass{
  constructor(){
    super();
  }

  define(): void {
    this.router
    .route("/")
    .get(exceptionHandler(ArticleController.findAll))
    .post(
      Validator.check(createArticle),
      exceptionHandler(ArticleController.create))

    this.router
    .route("/:id")
    .get(exceptionHandler(ArticleController.getById))
    .patch(exceptionHandler(ArticleController.update))
    .delete(exceptionHandler(ArticleController.remove))
  }

}

