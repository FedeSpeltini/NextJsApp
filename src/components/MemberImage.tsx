'use client';

import { Photo } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import React from 'react'
import { Image } from '@nextui-org/react';
type Props = {
    photo: Photo | null;
}

export default function MemberImage({photo} : Props) {
  return (
    <div>
        {photo?.publicId ? (
            <CldImage
                alt='Image of a member'
                src={photo.publicId}
                width={220}
                height={220}
                crop='fill'
                gravity='faces'
                className="rounded-2xl w-[220px] h-[220px] object-cover"
                priority
            />
        ) : (
            <Image
            width={220}
            height={220}
            src={photo?.url || '/images/user.png'}
            alt='Image of user'
            className="rounded-2xl w-[220px] h-[220px] object-cover"
        />
        )}

    </div>
  )
}

