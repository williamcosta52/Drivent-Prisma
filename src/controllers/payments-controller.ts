import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import * as payments from '../services/payments-service/payments-service';
import httpStatus from 'http-status';
import { Payment } from '../protocols';

export async function getPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.query;
  const userId = req.userId as number;
  if (!ticketId) res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const result = await payments.getPaymenService(Number(ticketId), userId);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
}
export async function payment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const paymentsInfo = req.body as Payment;
  const userId = req.userId as number;
  try {
    if (!paymentsInfo.cardData || !paymentsInfo.ticketId) res.sendStatus(httpStatus.BAD_REQUEST);

    const result = await payments.payment(paymentsInfo, userId);

    res.status(httpStatus.OK).send(result);
  } catch (err) {
    next(err);
  }
}
