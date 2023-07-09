import { Router } from 'express';
import { createTicket, getTicketType, getUserTicket } from '../controllers/ticket-controller';
import { authenticateToken } from '../middlewares';

const ticketRouter = Router();

ticketRouter.get('/types', authenticateToken, getTicketType);
ticketRouter.get('/', authenticateToken, getUserTicket);
ticketRouter.post('/ticket', authenticateToken, createTicket);

export default ticketRouter;
