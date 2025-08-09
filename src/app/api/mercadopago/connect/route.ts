import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

import { updateMercadoPagoTokens } from '@/app/actions/userActions';
import { getAuthorizationUrl, exchangeCodeForToken } from '@/lib/mercadopago';

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
      const tokenData = await exchangeCodeForToken(code);

      if (!tokenData.access_token) {
        throw new Error('No access token received from MercadoPago');
      }
      await updateMercadoPagoTokens(
        session.user.id,
        tokenData.access_token,
        tokenData.refresh_token,
        tokenData.user_id?.toString(),
      );

      return NextResponse.redirect(new URL('/members/edit/photos?success=connected', request.url));
    } catch (error) {
      console.error('MercadoPago callback error:', error);
      return NextResponse.redirect(new URL('/members/edit/photos?error=connection_failed', request.url));
    }
  }

  try {
    const url = getAuthorizationUrl();
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating authorization URL:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}