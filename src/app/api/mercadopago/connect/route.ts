import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { updateMercadoPagoTokens } from '@/app/actions/userActions';
import {
  getAuthorizationUrl,
  exchangeCodeForToken,
} from '@/lib/mercadopago';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (code) {
    try {
      if (!state) {
        throw new Error('Missing state parameter');
      }
      const tokenData = await exchangeCodeForToken(code);
      await updateMercadoPagoTokens(
        state,
        tokenData.access_token,
        tokenData.refresh_token,
        tokenData.user_id?.toString(),
      );

      return NextResponse.redirect(
        new URL('/members/edit/photos?success=connected', request.url),
      );
    } catch (error) {
      console.error('MercadoPago callback error:', error);
      return NextResponse.redirect(
        new URL('/members/edit/photos?error=connection_failed', request.url),
      );
    }
  }

  const session = await auth();
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const url = getAuthorizationUrl(session.user.id);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating authorization URL:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}