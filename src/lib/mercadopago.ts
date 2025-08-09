import { MercadoPagoConfig, OAuth } from 'mercadopago';

// Single Mercado Pago client configured with application access token
export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

// Generate authorization URL for OAuth flow
export function getAuthorizationUrl(state: string) {
  return new OAuth(mercadopago).getAuthorizationURL({
    options: {
      client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID!,
      redirect_uri: process.env.MP_REDIRECT_URI!,
      state,
    },
  });
}

// Exchange authorization code for user credentials
export async function exchangeCodeForToken(code: string) {
  return new OAuth(mercadopago).create({
    body: {
      client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID!,
      client_secret: process.env.MP_CLIENT_SECRET!,
      code,
      redirect_uri: process.env.MP_REDIRECT_URI!,
    },
  });
}