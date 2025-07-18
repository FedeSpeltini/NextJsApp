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
    <div className="w-full aspect-square overflow-hidden rounded-2xl bg-gray-100">
        {photo?.publicId ? (
            <CldImage
                alt='Image of a member'
                src={photo.publicId}
                width={300}
                height={300}
                crop='fill'
                gravity='faces'
                className="w-full h-full object-cover"
                priority
            />
        ) : (
            <Image
                width={300}
                height={300}
                src={photo?.url || '/images/user.png'}
                alt='Image of user'
                className="w-full h-full object-cover rounded-none"
                removeWrapper
            />
        )}
    </div>
  )
}