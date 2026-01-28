import { EventSubWsListener } from "@twurple/eventsub-ws";

export async function getEventListeners({ apiClient }) {
    const listener = new EventSubWsListener({ apiClient });    
    return listener;
}