import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import * as payments from '../services/payments-service/payments-service';
import httpStatus from 'http-status';
import { Payment } from '../protocols';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const userId = req.userId as number;
  if (!ticketId) res.sendStatus(httpStatus.NOT_FOUND);
  try {
    const result = await payments.getPaymenService(ticketId, userId);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err.name === 'RequestError') res.sendStatus(httpStatus.BAD_REQUEST);
    if (err.name === 'NotFoundError') res.sendStatus(httpStatus.NOT_FOUND);
    if (err.name === 'UnauthorizedError') res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
export async function payment(req: AuthenticatedRequest, res: Response) {
  const paymentsInfo = req.body as Payment;
  try {
    if (!paymentsInfo.cardData || !paymentsInfo.ticketId) res.sendStatus(httpStatus.BAD_REQUEST);

    const result = await payments.payment(paymentsInfo);

    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err.name === 'notFoundError') res.sendStatus(httpStatus.NOT_FOUND);
  }
}
