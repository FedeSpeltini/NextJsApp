import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

// /* eslint-disable no-var */
// declare global {
//   var pusherServerInstance: PusherServer | undefined;
//   var pusherClientInstance: PusherClient | undefined;
// }

// if (!global.pusherServerInstance) {
//   global.pusherServerInstance = new PusherServer({
//     appId: process.env.PUSHER_APP_ID!,
//     key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
//     secret: process.env.PUSHER_SECRET!,
//     cluster: 'us2',
//     useTLS: true,
//   });
// }

// if (!global.pusherClientInstance) {
//   global.pusherClientInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
//     // channelAuthorization: {
//     //   endpoint: '/us2/pusher-auth',
//     //   transport: 'ajax'
//     // },
//     cluster: 'us2',
//   });
// }

// export const pusherServer = global.pusherServerInstance;
// export const pusherClient = global.pusherClientInstance;



/* eslint-disable no-var */
declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance) {
  global.pusherServerInstance = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'us2',
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  global.pusherClientInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    channelAuthorization: {
      endpoint: '/api/pusher-auth',
      transport: 'ajax'
    },
    cluster: 'us2',
  });
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;