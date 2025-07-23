import { getMemberByUserId } from '@/app/actions/memberActions'
import { Card } from '@nextui-org/react';
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react'
import MemberSidebar from '../MemberSidebar';
import { getAuthUserId } from '@/app/actions/authActions';

//Children es el contenido de page.tsx
export default async function Layout({children}: {children: ReactNode}) {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    if (!member) return notFound();

    const basePath = `/members/edit`;

    const navLinks = [
        {name: 'Edit Profile', href: `${basePath}`},
        {name: 'Update Photos', href: `${basePath}/photos`}
    ]
    
    return (
        <div className='flex flex-col lg:grid lg:grid-cols-12 gap-5 min-h-[80vh]'>
            {/* Sidebar - En mobile: horizontal arriba, en desktop: columna izquierda */}
            <div className='w-full lg:col-span-3'>
                <MemberSidebar member={member} navLinks={navLinks}/>
            </div>
            
            {/* Contenido principal */}
            <div className='w-full lg:col-span-9'>
                <Card className='w-full mt-4 lg:mt-10 min-h-[60vh] lg:h-[80vh]'>
                    {children} 
                </Card>
            </div>
        </div>
    )
}