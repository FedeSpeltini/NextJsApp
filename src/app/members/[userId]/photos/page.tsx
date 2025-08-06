import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import { hasPhotoAccess, isCreatorConnected } from '@/app/actions/paymentActions';
import { getAuthUserId } from '@/app/actions/authActions';
import MemberPhotoGallery from '@/components/MemberPhotoGallery';
import PayButton from '@/components/PayButton';
import ConnectMpButton from '@/components/ConnectMpButton';
import { CardHeader, Divider, CardBody } from '@nextui-org/react'
import React from 'react'

export default async function PhotosPage({ params }: { params: { userId: string } }) {
    const photos = await getMemberPhotosByUserId(params.userId);
    const hasAccess = await hasPhotoAccess(params.userId);
    const userId = await getAuthUserId();
    const isOwner = userId === params.userId;
    const connected = isOwner ? await isCreatorConnected(userId) : true;
    const canView = isOwner || hasAccess;
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Photos
            </CardHeader>
            <Divider />
            <CardBody>
                {canView ? (
                    <MemberPhotoGallery photos={photos} />
                ) : isOwner ? (
                    connected ? (
                        <MemberPhotoGallery photos={photos} />
                    ) : (
                        <div className='flex justify-center'>
                            <ConnectMpButton />
                        </div>
                    )
                ) : (
                    <div className='flex justify-center'>
                        <PayButton creatorId={params.userId} />
                    </div>
                )}
            </CardBody>
        </>
    )
}