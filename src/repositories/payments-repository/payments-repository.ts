import { prisma } from '../../config';
import { Payment } from '../../protocols';

export async function getPaymentRepository(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}
export async function insertPaymentRepository(paymentsInfo: Payment, price: number) {
  return prisma.payment.create({
    data: {
      ticketId: paymentsInfo.ticketId,
      value: price,
      cardIssuer: paymentsInfo.cardData.issuer,
      cardLastDigits: paymentsInfo.cardData.number.toString().substring(11, 16),
    },
  });
}
