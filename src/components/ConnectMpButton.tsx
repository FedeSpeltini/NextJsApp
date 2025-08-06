'use client';
import React, { useTransition, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ConnectMpButton() {
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success === 'connected') {
      // Limpiar la URL y recargar para mostrar las fotos
      router.replace('/members/edit/photos');
      window.location.reload(); // Forzar recarga para actualizar el estado
    } else if (error) {
      console.error('MercadoPago connection error:', error);
      // Opcional: mostrar un mensaje de error al usuario
    }
  }, [searchParams, router]);

  const handleConnect = async () => {
    try {
      const res = await fetch('/api/mp/connect');
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        console.error('Failed to get connection URL');
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <button
      onClick={() => startTransition(handleConnect)}
      disabled={pending}
      className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
    >
      {pending ? 'Redirecting...' : 'Connect Mercado Pago'}
    </button>
  );
}