'use client';

import { calculateAge, transformImageUrl } from '@/lib/util';
import { Button, Card, CardFooter, Divider, Image } from '@nextui-org/react';
import { Member } from '@prisma/client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
    member: Member;
    navLinks: {name: string, href: string}[]
}

export default function MemberSidebar({member, navLinks} : Props) {
    const pathname = usePathname();

    return (
        <Card className='w-full mt-4 lg:mt-10 lg:h-[80vh]'>
            {/* Layout Mobile: horizontal, Desktop: vertical */}
            <div className='flex flex-row lg:flex-col lg:items-center p-4 lg:p-6'>
                
                {/* Profile Image */}
                <div className='flex-shrink-0 lg:flex-shrink lg:w-full lg:flex lg:justify-center'>
                    <Image
                        height={80}
                        width={80}
                        src={transformImageUrl(member.image) || 'images/user.png'}
                        alt='User profile main page'
                        className='rounded-full aspect-square object-cover lg:h-[200px] lg:w-[200px]'
                    />
                </div>

                {/* Profile Info + Navigation */}
                <div className='flex-1 ml-4 lg:ml-0 lg:w-full'>
                    
                    {/* Profile Info */}
                    <div className='flex flex-col lg:items-center lg:mt-4'>
                        <div className='text-lg lg:text-2xl font-semibold'>
                            {member.name}, {calculateAge(member.dateOfBirth)}
                        </div>
                        <div className='text-sm text-neutral-500 mb-3 lg:mb-0'>
                            {member.city}, {member.country}
                        </div>
                    </div>

                    <Divider className='my-3 lg:my-4'/>

                    {/* Navigation - Horizontal en mobile, vertical en desktop */}
                    <nav className='flex flex-row lg:flex-col lg:items-center gap-4 lg:gap-3'>
                        {navLinks.map(link => (
                            <Link 
                                href={link.href} 
                                key={link.name}
                                className={`text-sm lg:text-lg px-3 py-2 rounded-lg transition-colors ${
                                    pathname === link.href 
                                        ? 'text-secondary bg-secondary/10' 
                                        : 'hover:text-secondary/70 hover:bg-secondary/5'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Footer - Solo visible en desktop */}
            <CardFooter className='hidden lg:flex mt-auto'>
                <Button
                    as={Link}
                    href={'/members'}
                    fullWidth
                    color='secondary'
                    variant='bordered'
                >
                    Go back
                </Button>
            </CardFooter>
        </Card>
    )
}