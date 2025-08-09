import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) return new Response(`OAuth error: ${error}`, { status: 400 });
  if (!code || !state) return new Response("Missing code/state", { status: 400 });

  let payload: { uid: string };
  try {
    payload = jwt.verify(state, process.env.MP_STATE_SECRET!) as { uid: string };
  } catch {
    return new Response("Invalid state", { status: 400 });
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.MP_CLIENT_ID!,
    client_secret: process.env.MP_CLIENT_SECRET!,
    code,
    redirect_uri: process.env.MP_REDIRECT_URI!, // EXACTA a la usada arriba
  });

  const res = await fetch("https://api.mercadopago.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("MP token error:", res.status, txt);
    return new Response("Failed to obtain token", { status: 502 });
  }

  const data = await res.json();

  await prisma.user.update({
    where: { id: payload.uid },
    data: {
      mpUserId: data.user_id?.toString(),
      mpAccessToken: data.access_token,
      mpRefreshToken: data.refresh_token,
    },
  });

  // Redirigís a donde quieras
  return NextResponse.redirect(new URL("/members/edit/photos?success=connected", process.env.NEXTAUTH_URL!));
}
