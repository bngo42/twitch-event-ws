import { handleEventMessage } from './ws/ws-client.js';
import { getAuthClient } from './auth-provider.js';
import { EventSubWsListener } from '@twurple/eventsub-ws';

export async function registerTwitchListeners(userId, clientId, clientSecret) {
    const apiClient = await getAuthClient(userId, clientId, clientSecret);
    const listener = new EventSubWsListener({ apiClient });

    listener.onUserSocketConnect((id) => {
        console.log('Connected to Twitch events');
    });

    listener.onChannelChatMessage(userId, userId, (e) => {
        handleEventMessage('CHAT_MESSAGE', {
            user_id: e.chatterId,
            user_name: e.chatterName,
            display_name: e.chatterDisplayName,
            text: e.messageText,
            color: e.color,
            badges: e.badges,
        });
    });

    listener.onChannelRedemptionAdd(userId, (e) => {
        handleEventMessage('REDEMPTION', {
            id: e.id,
            user_id: e.userId,
            user_name: e.userName,
            reward_id: e.rewardId,
            reward_title: e.rewardTitle,
            reward_cost: e.rewardCost,
            input: e.input
        });
    });

    listener.onChannelPollBegin(userId, (e) => {
        handleEventMessage('POLL_START', {
            id: e.id,
            title: e.title,
            choices: e.choices.map(c => ({ id: c.id, title: c.title })),
            end_date: e.endDate
        });
    });

    listener.onChannelPollEnd(userId, (e) => {
        if (e.status === 'completed' || e.status === 'terminated') {
            handleEventMessage('POLL_END', {
                id: e.id,
                status: e.status,
                choices: e.choices.map(c => ({ 
                    title: c.title, 
                    total_votes: c.totalVotes 
                }))
            });
        }
    });

    listener.onChannelPredictionBegin(userId, (e) => {
        handleEventMessage('PREDICTION_START', {
            id: e.id,
            title: e.title,
            outcomes: e.outcomes.map(o => ({ 
                id: o.id, 
                title: o.title, 
                color: o.color 
            })),
            lock_date: e.lockDate
        });
    });

    listener.onChannelPredictionEnd(userId, (e) => {
        if (['resolved', 'canceled'].includes(e.status)) {
            handleEventMessage('PREDICTION_END', {
                id: e.id,
                status: e.status,
                winning_outcome_id: e.winningOutcomeId
            });
        }
    });

    listener.start();

    return listener;
}