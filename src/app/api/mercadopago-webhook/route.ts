import { updatePaymentStatus } from '@/app/actions/paymentActions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payment = body.data?.id;
    const status = body.type === 'payment.updated' ? body.data?.status : undefined;

    if (payment && status) {
      await updatePaymentStatus(payment.toString(), status);
    }

    return new Response('ok');
  } catch (error) {
    console.log(error);
    return new Response('error', { status: 500 });
  }
}