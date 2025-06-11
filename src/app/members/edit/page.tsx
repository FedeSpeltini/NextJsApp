import React from 'react'
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import CardInnerWraper from '@/components/CardInnerWraper';

export default async function MemberEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId)

    if(!member)  return notFound();
  return (

    <CardInnerWraper
      header='Edit Profile'
      body={<div>member.description</div>}
    />
  );
}
