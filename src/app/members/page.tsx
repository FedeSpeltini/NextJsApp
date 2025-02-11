import React from 'react'
import { getMembers } from '../actions/memberActions';
import MemberCard from './MemberCard';
import { fetchCurrentUserLikesIds } from '../actions/likeActions';

export default async function MembersPages() {

  const members = await getMembers();
  const likesIds = await fetchCurrentUserLikesIds();

  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
        {members && members.map(member => (
          <MemberCard member={member} key={member.id} likesIds={likesIds}/>
        ))}
    </div>
  )
}
