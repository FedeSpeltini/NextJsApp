import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createPaymentRecord } from '@/app/actions/paymentActions';


export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  try {
    const { creatorId, amount } = await request.json();
    const creator = await prisma.user.findUnique({
      where: { id: creatorId },
      select: { mpAccessToken: true },
    });
    if (!creator?.mpAccessToken) {
      return new Response('Creator not connected', { status: 400 });
    }

    const mpClient = new MercadoPagoConfig({ accessToken: creator.mpAccessToken });
    const preferenceClient = new Preference(mpClient);

    const response = await preferenceClient.create({
      body: {
        items: [{ id: 'testFede', title: 'Photo access', quantity: 1, unit_price: amount }],
        marketplace_fee: Math.round(
          amount * parseFloat(process.env.MP_OWNER_PERCENT || '20') / 100,
        ),
        back_urls: {
          success: process.env.MP_WEBHOOK_URL,
          failure: process.env.MP_WEBHOOK_URL,
        },
        auto_return: 'approved',
      },
    });

    await createPaymentRecord(creatorId, amount, String(response.id), 'pending');
    return NextResponse.json({ init_point: response.init_point });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}