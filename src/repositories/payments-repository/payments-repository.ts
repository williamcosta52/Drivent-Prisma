import { TicketType } from '@prisma/client';
import { prisma } from '../../config';
import { Payment } from '../../protocols';

export async function getPaymentRepository(ticketId: string) {
  return await prisma.ticket.findFirst({
    where: { id: Number(ticketId) },
  });
}
export async function insertPaymentRepository(paymentsInfo: Payment, ticketInfo: TicketType) {
  const LastDigits = [paymentsInfo.cardData.number.toString()];
  const digits = LastDigits.reverse();

  return await prisma.payment.create({
    data: {
      ticketId: paymentsInfo.ticketId,
      value: ticketInfo.price,
      cardIssuer: paymentsInfo.cardData.issuer,
      cardLastDigits: digits[0][1][2],
      createdAt: Date(),
      updatedAt: Date(),
    },
  });
}
