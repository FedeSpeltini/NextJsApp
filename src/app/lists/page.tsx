import React from 'react'
import ListTab from './ListTab'
import { fetchCurrentUserLikesIds, fetchLikedMembers } from '../actions/likeActions'

// export default async function ListsPages({searchParams}: {searchParams: {type: string}}) {
  
//   const likesIds = await fetchCurrentUserLikesIds();
//   const members = await fetchLikedMembers(searchParams.type);
//   return (
//     <div>
//       <ListTab members={members} likeIds={likesIds}/>
//     </div>
//   )
// }


export default async function ListsPage({searchParams}
    : {searchParams: Promise<{type: string}>}) {
      
    const {type} = await searchParams;

    const likeIds = await fetchCurrentUserLikesIds();
    const members = await fetchLikedMembers(type);

    return (
        <div>
            <ListTab members={members} likeIds={likeIds} />
        </div>
    );
}

// export default async function ListsPages({
//   searchParams,
// }: {
//   searchParams: Promise<{ type: string }>
// }) {
//   const [likesIds, { type }] = await Promise.all([fetchCurrentUserLikesIds(), searchParams])

//   const members = await fetchLikedMembers(type)

//   return (
//     <div>
//       <ListTab members={members} likeIds={likesIds} />
//     </div>
//   )
// }


