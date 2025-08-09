import { auth } from "@/auth";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const state = jwt.sign(
    { uid: session.user.id, n: crypto.randomUUID() },
    process.env.MP_STATE_SECRET!,
    { expiresIn: "10m" }
  );

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.MP_CLIENT_ID!,
    redirect_uri: process.env.MP_REDIRECT_URI!, // Debe ser EXACTA
    state,
    // scope si aplica: "offline_access read write"
  });

  const url = `https://auth.mercadopago.com/authorization?${params.toString()}`;
  return NextResponse.json({ url });
}
