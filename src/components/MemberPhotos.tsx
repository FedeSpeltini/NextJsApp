'use client';
import React, { useState } from 'react'
import MemberImage from './MemberImage';
import DeleteButton from './DeleteButton';
import StarButton from './StarButton';
import { Photo } from '@prisma/client';
import { deleteImage, setMainImage } from '@/app/actions/userActions';
import { useRouter } from 'next/navigation';
import MediaViewer from './MediaViewer';

type Props = {
    photos: Photo[] | null;
    editing?: boolean;
    mainImageUrl?: string | null;
}

export default function MemberPhotos({photos, editing, mainImageUrl} : Props) {
    const router = useRouter();
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState({
        type:'',
        isLoading: false,
        id: ''
    })

    const onSetMain = async (photo: Photo) => {
        if(photo.url === mainImageUrl) return null;
        setLoading({isLoading: true, id: photo.id, type:'main'});
        await setMainImage(photo);
        router.refresh();
        setLoading({isLoading: false, id: '', type: ''})
    }

    const onDelete = async (photo: Photo) => {
        if(photo.url === mainImageUrl) return null;
        setLoading({isLoading: true, id: photo.id, type:'delete'});
        await deleteImage(photo);
        router.refresh();
        setLoading({isLoading: false, id: '', type: ''})
    }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 p-2 sm:p-4">
        {photos &&
          photos.map((photo, index) => (
            <div key={photo.id} className="relative" onClick={() => setViewerIndex(index)}>
              <MemberImage photo={photo} />
              {editing && (
                <>
                  <div
                    onClick={() => onSetMain(photo)}
                    className="absolute top-2 left-2 z-50"
                  >
                    <StarButton
                      selected={photo.url === mainImageUrl}
                      loading={
                        loading.isLoading &&
                        loading.type === "main" &&
                        loading.id === photo.id
                      }
                    />
                  </div>
                  <div
                    onClick={() => onDelete(photo)}
                    className="absolute top-2 right-2 z-50"
                  >
                    <DeleteButton
                      loading={
                        loading.isLoading &&
                        loading.type === "delete" &&
                        loading.id === photo.id
                      }
                    />
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
            <MediaViewer
        photo={viewerIndex !== null && photos ? photos[viewerIndex] : null}
        onClose={() => setViewerIndex(null)}
        onNext={() =>
          viewerIndex !== null && photos
            ? setViewerIndex((viewerIndex + 1) % photos.length)
            : undefined
        }
        onPrev={() =>
          viewerIndex !== null && photos
            ? setViewerIndex((viewerIndex - 1 + photos.length) % photos.length)
            : undefined
        }
      />
    </>
  );
}