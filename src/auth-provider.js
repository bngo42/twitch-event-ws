import path from 'path';

import { RefreshingAuthProvider } from '@twurple/auth';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { ApiClient } from '@twurple/api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAuthProvider(userId, clientId, clientSecret) {
    const tokenPath = path.join(__dirname, 'tokens', `tokens.${userId}.json`);
    const data = await fs.readFile(tokenPath, 'utf-8');
    const tokenData = JSON.parse(data);

    const authProvider = new RefreshingAuthProvider({
        clientId,
        clientSecret
    });

    authProvider.onRefresh(async (userId, newTokenData) => {
        const tokenPath = path.join(__dirname, 'tokens', `tokens.${userId}.json`);
        await fs.writeFile(tokenPath, JSON.stringify(newTokenData, null, 4));
    });

    await authProvider.addUser(userId, tokenData, [
        'channel:read:subscriptions', 
        'channel:read:polls',
        'channel:read:redemptions',
        'chat:read'
    ]);

    return authProvider;
}

export async function getAuthClient(userId, clientId, clientSecret) {
    const authProvider = await getAuthProvider(userId, clientId, clientSecret);
    return new ApiClient({ authProvider });
}