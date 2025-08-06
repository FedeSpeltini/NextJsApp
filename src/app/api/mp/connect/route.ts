import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, OAuth } from 'mercadopago';
import { updateMercadoPagoTokens } from '@/app/actions/userActions'; // Nueva import

// Configurar MercadoPago
const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
});

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  // NUEVA SECCIÓN: Manejar callback de MercadoPago
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  
  if (code) {
    // Es un callback - procesar el código
    try {
      const tokenResponse = await fetch('https://api.mercadopago.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID!,
          client_secret: process.env.MP_CLIENT_SECRET!,
          code: code,
          redirect_uri: process.env.MP_REDIRECT_URI!
        })
      });
      console.log('Token response:', tokenResponse);
      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const tokenData = await tokenResponse.json();

      await updateMercadoPagoTokens(
        session.user.id,
        tokenData.access_token,
        tokenData.refresh_token,
        tokenData.user_id?.toString()
      );

      return NextResponse.redirect(new URL('/members/edit/photos?success=connected', request.url));
    } catch (error) {
      console.error('MercadoPago callback error:', error);
      return NextResponse.redirect(new URL('/members/edit/photos?error=connection_failed', request.url));
    }
  }

  // CÓDIGO ORIGINAL: Generar URL de autorización (sin cambios)
  try {
    const url = new OAuth(mercadopago).getAuthorizationURL({
      options: {
        client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID!,
        redirect_uri: process.env.MP_REDIRECT_URI!,
      },
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating authorization URL:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}