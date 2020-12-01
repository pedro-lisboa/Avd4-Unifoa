import { Router } from 'express';

import usersRouter from './users.routes';
import doctorsRouter from './doctors.routes';
import pacientsRouter from './pacients.routes';
import sessionsRouter from './sessions.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/doctors', doctorsRouter);
routes.use('/pacients', pacientsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
