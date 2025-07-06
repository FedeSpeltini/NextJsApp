import { getMemberByUserId } from '@/app/actions/memberActions'
import CardInnerWraper from '@/components/CardInnerWraper';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function MemberDetailedPage({params} : {params : {userId : string}}) {
    const {userId} = await params;


  const member = await getMemberByUserId(params.userId);
  
  if(!member) return notFound();

  return (
    <CardInnerWraper
      header='Profile'
      body={<div>{member.description}</div>}
    />
  )
}
