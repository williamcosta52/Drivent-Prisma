import { notFoundError, requestError, unauthorizedError } from '../../errors';
import { Payment } from '../../protocols';
import {
  getPaymentRepository,
  insertPaymentRepository,
} from '../../repositories/payments-repository/payments-repository';
import {
  getTicketById,
  getTicketTypeById,
  verifyEnrollmentRepository,
} from '../../repositories/tickets-repository/tickets-repository';

export async function getPaymenService(ticketId: string, userId: number) {
  const ticket = await getTicketById(ticketId);
  if (!ticket) throw notFoundError();
  const enrollment = await verifyEnrollmentRepository(userId);
  if (enrollment.id !== ticket.enrollmentId) throw unauthorizedError();
  const payment = await getPaymentRepository(ticketId);
  return payment;
}
export async function payment(paymentsInfo: Payment) {
  const ticket = await getTicketById(paymentsInfo.ticketId);
  if (!ticket) throw notFoundError();
  const ticketInfo = await getTicketTypeById(ticket.ticketTypeId);
  const insertPayment = await insertPaymentRepository(paymentsInfo, ticketInfo);
  return insertPayment;
}
