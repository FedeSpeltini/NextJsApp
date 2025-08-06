import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId, getMemberPhotosByUserId } from '@/app/actions/memberActions';
import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react'
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberPhotos from '@/components/MemberPhotos';
import { isCreatorConnected } from '@/app/actions/paymentActions';
import ConnectMpButton from '@/components/ConnectMpButton';

export default async function PhotosPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(userId);
    const connected = await isCreatorConnected(userId);
  return (
    <>
      <CardHeader className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 sm:items-center">
        <div className="text-xl sm:text-2xl font-semibold text-secondary text-center sm:text-left">
          Edit Profile
        </div>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody className="p-3 sm:p-6">
        {connected ?         (<MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />) :
        (
                                <div className='flex justify-center'>
                                    <ConnectMpButton />
                                </div>
                            )
        
        }

      </CardBody>
    </>
  );
}