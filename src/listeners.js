import { broadcast } from './ws/ws-client.js';
import { getAuthClient } from './auth-provider.js';
import { getEventListeners } from './events.js';

const handleEventMessage = (type, data) => {
    const payload = {
        type,
        data,
        timestamp: new Date().toISOString()
    };
    broadcast(payload);
};

export async function registerTwitchListeners(userId, clientId, clientSecret) {
    const apiClient = await getAuthClient(userId, clientId, clientSecret);
    const listener = await getEventListeners({ apiClient });

    listener.onChannelChatMessage(userId, userId, (e) => {
        handleEventMessage('CHAT_MESSAGE', {
            userId: e.chatterId,
            userName: e.chatterName,
            displayName: e.chatterDisplayName,
            text: e.messageText,
            color: e.color,
            isCheer: e.isCheer,
            bits: e.bits
        });
    });

    listener.onChannelFollow(userId, userId, (e) => {
        handleEventMessage('FOLLOW', {
            userId: e.userId,
            userName: e.userName,
            displayName: e.userDisplayName,
            followDate: e.followDate
        });
    });

    listener.onChannelCheer(userId, (e) => {
        handleEventMessage('BITS', {
            userId: e.userId,
            userName: e.userName,
            bits: e.bits,
            message: e.message
        });
    });

    listener.onChannelSubscription(userId, (e) => {
        handleEventMessage('SUB', {
            userId: e.userId,
            userName: e.userName,
            tier: e.tier,
            isGift: e.isGift
        });
    });

    listener.onChannelSubscriptionMessage(userId, (e) => {
        handleEventMessage('RESUB', {
            userId: e.userId,
            userName: e.userName,
            tier: e.tier,
            durationMonths: e.cumulativeMonths,
            streakMonths: e.streakMonths,
            message: e.messageText
        });
    });

    listener.onChannelSubscriptionGift(userId, (e) => {
        handleEventMessage('SUB_GIFT', {
            gifterId: e.gifterId,
            gifterName: e.gifterName,
            amount: e.amount,
            tier: e.tier,
            isAnonymous: e.isAnonymous
        });
    });

    listener.onChannelRedemptionAdd(userId, (e) => {
        handleEventMessage('REDEMPTION', {
            id: e.id,
            userId: e.userId,
            userName: e.userName,
            rewardId: e.rewardId,
            rewardTitle: e.rewardTitle,
            rewardCost: e.rewardCost,
            input: e.input
        });
    });

    listener.onChannelPollBegin(userId, (e) => {
        handleEventMessage('POLL_START', {
            id: e.id,
            title: e.title,
            choices: e.choices.map(c => ({ id: c.id, title: c.title })),
            endDate: e.endDate
        });
    });

    listener.onChannelPollEnd(userId, (e) => {
        if (e.status === 'completed' || e.status === 'terminated') {
            handleEventMessage('POLL_END', {
                id: e.id,
                status: e.status,
                choices: e.choices.map(c => ({ title: c.title, totalVotes: c.totalVotes }))
            });
        }
    });

    listener.onChannelPredictionBegin(userId, (e) => {
        handleEventMessage('PREDICTION_START', {
            id: e.id,
            title: e.title,
            outcomes: e.outcomes.map(o => ({ id: o.id, title: o.title, color: o.color })),
            lockDate: e.lockDate
        });
    });

    listener.onChannelPredictionEnd(userId, (e) => {
        if (['resolved', 'canceled'].includes(e.status)) {
            handleEventMessage('PREDICTION_END', {
                id: e.id,
                status: e.status,
                winningOutcomeId: e.winningOutcomeId
            });
        }
    });

    return listener;
}