import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import MemberPhotoGallery from '@/components/MemberPhotoGallery';
import { CardHeader, Divider, CardBody } from '@nextui-org/react'
import React from 'react'
export default async function PhotosPage({ params }: { params: { userId: string } }) {
    const photos = await getMemberPhotosByUserId(params.userId);
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <MemberPhotoGallery photos={photos} />
            </CardBody>
        </>
    )
}