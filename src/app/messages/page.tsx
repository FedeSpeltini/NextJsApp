import React from 'react'
import MessageSidebar from './MessageSidebar'
import { getMessagesByContainer } from '../actions/messageActions'
import MessageTable from './MessageTable';

export default async function MessagesPage({searchParams}: 
      {searchParams: Promise<{container: string}>}) {
    const {container} = await searchParams;
    const {messages, nextCursor} = await getMessagesByContainer(container);

    return (
        <div className='grid grid-cols-1 md:grid-cols-12 gap-5 mt-10 md:h-[80vh]'>
            <div className='md:col-span-2'>
                <MessageSidebar />
            </div>
            <div className='md:col-span-10'>
                <MessageTable initialMessages={messages} nextCursor={nextCursor} />
            </div>
        </div>
    );
}