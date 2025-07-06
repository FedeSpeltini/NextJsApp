// "use client";

// import { NextUIProvider } from "@nextui-org/react";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <NextUIProvider>
//       <ToastContainer position="bottom-right" hideProgressBar className='z-50'/>
//       {children}

//     </NextUIProvider>
//     );
// }

'use client'

import { getUnreadMessageCount } from "@/app/actions/messageActions";
import { useNotificationChannel } from "@/app/hooks/seNotificationChannel";
import useMessageStore from "@/app/hooks/useMessageStore";
import { usePresenceChannel } from "@/app/hooks/usePresenceChannel";
import { HeroUIProvider } from "@heroui/react";
import { ReactNode, useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({children, userId}: {children: ReactNode, userId: string | null}) {
  const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);

  const setUnreadCount = useCallback((amount: number) => {
    updateUnreadCount(amount);
  }, [updateUnreadCount]);

  useEffect(() => {
    if (userId) {
      getUnreadMessageCount().then(count => {
        setUnreadCount(count)
      })
    }
  }, [setUnreadCount, userId]);
  
  usePresenceChannel();
  useNotificationChannel(userId);
  return (
    <HeroUIProvider>
      <ToastContainer position="bottom-right" hideProgressBar className='z-50' />
        {children}
    </HeroUIProvider>
  )
}