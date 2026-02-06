import { io } from './ws-server.js';

export const broadcast = (payload) => {
  if (!io || !payload) return;

  io.emit(payload);
};

export const handleEventMessage = (type, data) => {
    const payload = {
        type,
        data,
        timestamp: new Date().toISOString()
    };
    broadcast(payload);
};