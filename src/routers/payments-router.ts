import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getPayment, payment } from '../controllers/payments-controller';

const PaymentRouter = Router();

PaymentRouter.get('/', authenticateToken, getPayment);
PaymentRouter.post('/process', authenticateToken, payment);

export default PaymentRouter;
