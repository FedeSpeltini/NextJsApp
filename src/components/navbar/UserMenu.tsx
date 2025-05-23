'use client';

import { transformImageUrl } from '@/lib/util';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { Member } from '@prisma/client';
//import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

type Props = {
    //user: Session['user']
    user2?: Member | null
}

export const UserMenu = ({user2}: Props) => {
  return (
    <Dropdown placement='bottom-end'>
        <DropdownTrigger>
            <Avatar 
                isBordered
                as='button'
                className='transition-transform'
                color='secondary'
                name={user2?.name || 'Usuario'}
                size='sm'
                src={transformImageUrl(user2?.image)  || '/images/user.png'}
            />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User actions menu'>
            <DropdownSection showDivider>
                <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username' key={'username'}>
                    Signed in as {user2?.name}
                </DropdownItem>
            </DropdownSection>
            <DropdownItem as={Link} href='/members/edit' key={'edit-profile'}>Edit Profile</DropdownItem>
            <DropdownItem color='danger' onPress={async () => signOut()} key={'logout'}>Log out</DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}
