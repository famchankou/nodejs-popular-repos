import { Router } from 'express';
import { GithubController } from './controllers';

const router = Router();

router.get('/search', GithubController.search);
router.get('/language/:language/top/:per_page', GithubController.getByLang);

export default router;