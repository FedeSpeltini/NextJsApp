'use client';

import LikeButton from '@/components/LikeButton'
import { calculateAge, transformImageUrl } from '@/lib/util'
import { Card, CardFooter, Image } from '@nextui-org/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'


type Props = {
    member: Member
    likesIds: string[]
}

export default function MemberCard({member,likesIds}: Props) {
    const hasLiked = likesIds.includes(member.userId)

    const preventLinkAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }
  return (
    <Card 
        fullWidth
        as={Link}
        href={`/members/${member.userId}`}
        isPressable
        
    >     
    <div onClick={preventLinkAction}>
        <div className='absolute top-3 right-3 z-50'>
            <LikeButton targetId={member.userId} hasLiked={hasLiked}/>
        </div>
    </div>    

        <Image 
            isZoomed
            alt={member.name}
            width={300}
            src={transformImageUrl( member.image) || '/images/user.png'}
            className='aspect-square object-cover'
        />

        <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient'>
            <div className='flex flex-col text-white'>
                <span className='font-semibold'>{member.name}, {calculateAge(member.dateOfBirth)}</span>
                <span className='text-sm'>{member.city}</span>
            </div>
        </CardFooter>
    </Card>
  )
}
