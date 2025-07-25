"use client";
import React, { useState } from 'react';
import { Photo } from '@prisma/client';
import MemberImage from './MemberImage';
import MediaViewer from './MediaViewer';

export type MemberPhotoGalleryProps = {
    photos: Photo[] | null;
};

export default function MemberPhotoGallery({ photos }: MemberPhotoGalleryProps) {
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 p-2 sm:p-4">
                {photos && photos.map((photo, index) => (
                    <div key={photo.id} className="relative" onClick={() => setViewerIndex(index)}>
                        <MemberImage photo={photo} />
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