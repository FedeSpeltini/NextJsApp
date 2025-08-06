import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// Configuración del cliente
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN as string 
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  try {
    const { creatorId, amount } = await request.json();
    
    // Crear instancia de Preference
    const preference = new Preference(client);
    
    const preferenceData = {
      items: [
        { 
          id: 'photo_access',
          title: 'Photo access', 
          quantity: 1, 
          unit_price: amount,
          currency_id: 'ARS' // o la moneda que uses
        },
      ],
      marketplace_fee: Math.round(
        amount * parseFloat(process.env.MP_OWNER_PERCENT || '20') / 100,
      ),
      // El ID de la cuenta del creador como collector_id
      collector_id: creatorId,
      back_urls: {
        success: process.env.MP_WEBHOOK_URL,
        failure: process.env.MP_WEBHOOK_URL,
        pending: process.env.MP_WEBHOOK_URL,
      },
      auto_return: 'approved' as const,
    };

    const response = await preference.create({ body: preferenceData });
    return NextResponse.json({ init_point: response.init_point });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}