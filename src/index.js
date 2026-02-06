import { fileURLToPath } from 'url';
import { createWsServer } from './ws/ws-server.js';
import { registerTwitchListeners } from './listeners.js';

import dotenv from 'dotenv';
import path from 'path';
import { initStreamlabs } from './streamlabs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const TWITCH_USER_ID = process.env.TWITCH_USER_ID;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET = process.env.TWITCH_SECRET;
const STREAMLABS_SOCKET_TOKEN = process.env.STREAMLABS_SOCKET_TOKEN

createWsServer(8083);

registerTwitchListeners(TWITCH_USER_ID, TWITCH_CLIENT_ID, TWITCH_SECRET);
initStreamlabs(STREAMLABS_SOCKET_TOKEN);