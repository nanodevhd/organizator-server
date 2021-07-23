import { Router } from 'express';

import agendaRoutes from './../routes/agenda.routes';
import socketsRoutes from './../routes/sockets.routes';
import todoRoutes from './../routes/todo.routes';
import usersRoutes from './../routes/users.routes';
import vocabularyRoutes from './../routes/vocabulary.routes';
import testRoutes from './../routes/test.route';
import authentificator from '../middlewares/authentificator.middleware';
import codeStatus from '../helpers/code.status';

const router = Router();

router.use('/auth/users', usersRoutes);
router.use('/todo', todoRoutes);
router.use('/agenda', agendaRoutes);
router.use('/vocab', vocabularyRoutes);
router.use('/sock', socketsRoutes);
router.use('/test', testRoutes);

function test(req: any, res: any) {
	return res.status(codeStatus.succes).json({ ok: true });
}
router.post('/testing', authentificator, test);

export default router;
