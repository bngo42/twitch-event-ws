import { io } from "socket.io-client";
import { handleEventMessage } from "./ws/ws-client.js";

export function handleDonation(data) {
  handleEventMessage('DONATION', {
    ...data
  });
}
export function handleFollow(data) {
  handleEventMessage('FOLLOW', {
    ...data
  });
}
export function handleSubscription(data) {
  handleEventMessage('SUB', {
    ...data
  });
}
export function handleBits(data) {
  handleEventMessage('BITS', {
    ...data
  });
}

export function initStreamlabs(STREAMLABS_SOCKET_TOKEN) {
    const streamlabsSocket = io(`https://sockets.streamlabs.com?token=${STREAMLABS_SOCKET_TOKEN}`, {
        transports: ['websocket']
    });

    streamlabsSocket.on('connect', () => {
      console.log('Connected to Streamlabs Event Socket');
    });

    streamlabsSocket.on('event', (eventData) => {
      if (!eventData.message) return;

      const type = eventData.type.toUpperCase();
      console.log(eventData);

      switch(type) {
        case 'DONATION':
          handleDonation(eventData.message);
          break;
        case 'FOLLOW':
          handleFollow(eventData.message);
          break;
        case 'RESUB':
        case 'SUBSCRIPTION':
        case 'SUBMYSTERYGIFT':
          handleSubscription(eventData.message);
          break;
        case 'BITS':
          handleBits(eventData.message);
          break;
      }
    });

    streamlabsSocket.on('error', (err) => console.error);

    return streamlabsSocket;
}