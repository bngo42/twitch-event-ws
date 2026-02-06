import { io } from "socket.io-client";
import { handleEventMessage } from "./ws/ws-client.js";

export function handleDonation(data) {
  handleEventMessage('DONATION', {
    id: data.id,
    name: data.name,
    amount: data.amount,
    currency: data.currency,
    message: data.message,
    from: data.from,
    from_user_id: data.from_user_id
  });
}

export function handleFollow(data) {
  handleEventMessage('FOLLOW', {
    name: data.name
  });
}

export function handleNewSubscription(data) {
  handleEventMessage('SUB', {
    name: data.name,
    months: data.months,
    message: data.message,
    sub_plan: data.sub_plan,
  });
}

export function handleResubscription(data) {
  handleEventMessage('RESUB', {
    name: data.name,
    months: data.months,
    streak_months: data.streak_months,
    message: data.message,
    sub_plan: data.sub_plan,
  });
}

export function handleSubGift(data) {
  handleEventMessage('SUB_GIFT', {
    name: data.name, 
    gifter: data.gifter, 
    months: data.months,
    sub_plan: data.sub_plan,
    message: data.message
  });
}

export function handleCommunityGift(data) {
  handleEventMessage('COMMUNITY_GIFT', {
    name: data.name, 
    amount: data.amount, 
    sub_plan: data.sub_plan,
  });
}

export function handleBits(data) {
  handleEventMessage('BITS', {
    name: data.name,
    amount: data.amount,
    message: data.message,
    total_bits: data.total_bits
  });
}

export function initStreamlabs(STREAMLABS_SOCKET_TOKEN) {
    const streamlabsSocket = io(`https://sockets.streamlabs.com?token=${STREAMLABS_SOCKET_TOKEN}`, {
        transports: ['websocket']
    });

    streamlabsSocket.on('connect', () => {
      console.log('Connected to Streamlabs events');
    });

    streamlabsSocket.on('event', (eventData) => {
      if (!eventData.message || eventData.message.length === 0) return;
      
      const type = eventData.type.toUpperCase();
      const message = eventData.message[0];

      switch(type) {
        case 'DONATION':
          handleDonation(message);
          break;
        case 'FOLLOW':
          handleFollow(message);
          break;
        case 'SUBMYSTERYGIFT':
          handleCommunityGift(message);
          break;
        case 'SUBSCRIPTION':
          if (message.sub_type === 'subgift') {
            handleSubGift(message);
          } else {
            handleNewSubscription(message);
          }
          break;
        case 'RESUB':
          handleResubscription(message);
          break;
        case 'BITS':
          handleBits(message);
          break;
      }
    });

    streamlabsSocket.on('error', (err) => console.error);

    return streamlabsSocket;
}