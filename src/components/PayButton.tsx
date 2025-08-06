'use client';

import React, { useTransition } from 'react';

export default function PayButton({ creatorId }: { creatorId: string }) {
  const [pending, startTransition] = useTransition();

  const handlePay = async () => {
    const res = await fetch('/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creatorId, amount: 10 }), // default amount 10
    });
    if (res.ok) {
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } else {
      alert('Creator has not connected Mercado Pago');
    }
  };

  return (
    <button
      onClick={() => startTransition(handlePay)}
      disabled={pending}
      className="px-4 py-2 bg-primary text-white rounded"
    >
      {pending ? 'Redirecting...' : 'Pay to view photos'}
    </button>
  );
}