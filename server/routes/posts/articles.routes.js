import { Router } from 'express';

import {
    createArticle,
    deleteArticle,
    getArticleById,
    getArticles,
    updateArticle,
} from '../../controllers/posts/articles.controller.js';
import { idValidator, validateErrors } from '../../config/middlewares/validators.js';
import { routeValidation } from '../../config/middlewares/auth.js';

const routerArticles = Router();

routerArticles.delete('/:id', idValidator(), validateErrors, routeValidation(), deleteArticle);
routerArticles.get('/:id', idValidator(), validateErrors, routeValidation(), getArticleById);
routerArticles.get('/', routeValidation(), getArticles);
routerArticles.post('/', routeValidation(), createArticle);
routerArticles.put('/:id', idValidator(), validateErrors, routeValidation(), updateArticle);

export default routerArticles;
