import { notFoundError } from '../../errors';
import * as ticketRepository from '../../repositories/tickets-repository/tickets-repository';

export async function getTicketTypeService() {
  const result = await ticketRepository.getTicketTypeRepository();
  if (!result) throw notFoundError();
}
export async function getUserTicketService(userId: number) {
  const result = await ticketRepository.getUserTicketRepository(userId);
  if (!result) throw notFoundError();
}
export async function createTicketService(ticketTypeId: number, userId: number) {
  const verifyEnrollment = await ticketRepository.verifyEnrollmentRepository(ticketTypeId);

  if (!verifyEnrollment) throw notFoundError();

  return await ticketRepository.createTicketRepository(ticketTypeId, verifyEnrollment.id);
}
