import { Router } from 'express';

import agendaRoutes from './../routes/agenda.routes';
import socketsRoutes from './../routes/sockets.routes';
import todoRoutes from './../routes/todo.routes';
import usersRoutes from './../routes/users.routes';
import vocabularyRoutes from './../routes/vocabulary.routes';

const router = Router();

router.use(usersRoutes);
router.use(todoRoutes);
router.use(agendaRoutes);
router.use(vocabularyRoutes);
router.use(socketsRoutes);

export default router;
