'use client';
import { Photo } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  photo: Photo | null;
  onClose: () => void;
};

const isVideo = (src?: string | null) => {
  if (!src) return false;
  return /\.(mp4|webm|ogg)$/i.test(src);
};

export default function MediaViewer({ photo, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [photo]);

  if (!photo) return null;

  const source = photo.publicId || photo.url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
    >
      {/* Botón de cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        aria-label="Close media viewer"
      >
        <AiOutlineClose
          size={24}
          className="text-white"
        />
      </button>
      
      {/* Contenedor del media */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo(source) ? (
          <video
            src={photo.url || undefined}
            controls
            className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
            preload="metadata"
          />
        ) : photo.publicId ? (
          <CldImage
            src={photo.publicId}
            alt="Member media"
            width={1000}
            height={1000}
            className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            priority
          />
        ) : (
          <img
            src={photo.url || '/images/user.png'}
            alt="Member media"
            className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        )}
      </div>
    </div>
  );
}