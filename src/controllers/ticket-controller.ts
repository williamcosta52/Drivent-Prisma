import { Request, Response } from 'express';
import * as ticketService from '../services/tickets-service/tickets-service';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';

export async function getTicketType(_req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketService.getTicketTypeService();
    res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    res.sendStatus(httpStatus.NO_CONTENT);
  }
}
export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await ticketService.getUserTicketService(userId);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = req.body.ticketTypeId as number;
  const userId = req.userId as number;
  if (!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const result = await ticketService.createTicketService(ticketTypeId, userId);
    res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    res.send(httpStatus.NOT_FOUND);
  }
}
