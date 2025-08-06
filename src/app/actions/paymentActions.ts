'use server';

import { prisma } from '@/lib/prisma';
import { getAuthUserId } from './authActions';

export async function hasPhotoAccess(creatorId: string) {
  const viewerId = await getAuthUserId();
  const payment = await prisma.photoAccessPayment.findFirst({
    where: {
      viewerId,
      creatorId,
      status: 'approved',
    },
  });
  return !!payment;
}

export async function createPaymentRecord(creatorId: string, amount: number, mpPaymentId?: string, status: string = 'pending') {
  const viewerId = await getAuthUserId();
  return prisma.photoAccessPayment.create({
    data: {
      viewerId,
      creatorId,
      amount,
      status,
      mpPaymentId,
    },
  });
}

export async function isCreatorConnected(userId: string) {
  const creator = await prisma.user.findUnique({
    where: { id: userId },
    select: { mpAccessToken: true },
  });
  return !!creator?.mpAccessToken;
}

export async function updatePaymentStatus(mpPaymentId: string, status: string) {
  return prisma.photoAccessPayment.updateMany({
    where: { mpPaymentId },
    data: { status },
  });
}