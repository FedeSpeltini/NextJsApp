import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.MP_CLIENT_ID as string,
    client_secret: process.env.MP_CLIENT_SECRET as string,
    code,
    redirect_uri: process.env.MP_REDIRECT_URI as string,
  });

  try {
    const res = await fetch('https://api.mercadopago.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) {
      console.log(await res.text());
      return new Response('Failed to obtain token', { status: 500 });
    }

    const data = await res.json();

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        mpUserId: data.user_id?.toString(),
        mpAccessToken: data.access_token,
        mpRefreshToken: data.refresh_token,
      },
    });

    return new Response('Connected');
  } catch (error) {
    console.log(error);
    return new Response('Error', { status: 500 });
  }
}