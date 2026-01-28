import { fileURLToPath } from 'url';
import { createWsServer } from './ws/ws-server.js';
import { registerTwitchListeners } from './listeners.js';

import dotenv from 'dotenv';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const TWITCH_USER_ID = process.env.TWITCH_USER_ID;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET = process.env.TWITCH_SECRET;

createWsServer(8083);

const listener = await registerTwitchListeners(TWITCH_USER_ID, TWITCH_CLIENT_ID, TWITCH_SECRET);
listener.start();
