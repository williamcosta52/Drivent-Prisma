import { Enrollment } from '@prisma/client';
import { prisma } from '../../config';

export async function getTicketTypeRepository() {
  return await prisma.ticketType.findMany();
}
export async function getUserTicketRepository(userId: number) {
  return await prisma.ticket.findFirst({
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where: {
      Enrollment: {
        userId: userId,
      },
    },
  });
}
export async function getUserRepository(userId: number) {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
}
export async function verifyEnrollmentRepository(userId: number): Promise<Enrollment> {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}
export async function createTicketRepository(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
}
export async function getTicketById(ticketId: string | number) {
  return await prisma.ticket.findFirst({
    where: { id: Number(ticketId) },
  });
}
export async function getTicketTypeById(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({
    where: { id: ticketTypeId },
  });
}
export async function updateTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}
