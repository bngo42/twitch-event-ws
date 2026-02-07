# Twitch Events

A Node.js application for monitoring and logging channel events in real-time. This server normalizes data from Twitch (via Twurple) and Streamlabs into a single, consistent format.

## Features

- **Unified Event Monitoring**: Real-time stream combining Twitch EventSub and Streamlabs Sockets.
- **Subscription & Donation Tracking**: Comprehensive logging of new subs, resubs, gifts, and monetary donations.
- **Engagement Tools**: Monitors poll and prediction lifecycles, and channel point redemptions.
- **Local Broadcast**: Re-emits all normalized events via a local WebSocket server (Port 8083).
- **Token Management**: Automatic OAuth token refresh and persistence.

## Prerequisites

- Node.js (v14 or higher)
- Twitch Developer Application (Client ID and Secret)
- Streamlabs Socket API Token

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd twitch-events
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
TWITCH_CLIENT_ID=your_client_id
TWITCH_SECRET=your_client_secret
TWITCH_USER_ID=your_user_id
STREAMLABS_SOCKET_TOKEN=your_streamlabs_socket_token
```

4. Set up token files in `src/tokens/`:
  - Create a JSON file named `tokens.{YOUR_USER_ID}.json` with your OAuth token data
  - The token file should contain your access token, refresh token, and expiry information

## Usage

### Development Mode
```bash
npm run dev
```
Runs the application with nodemon for auto-reloading on file changes.

### Production Mode
```bash
npm start
```
Runs the application in production mode.

## Required OAuth Scopes

The application requires the following Twitch API scopes:
 - `bits:read`
 - `channel:read:polls`
 - `channel:read:predictions`
 - `channel:read:redemptions`
 - `channel:read:subscriptions`
 - `moderator:read:followers`
 - `user:read:chat`

## Dependencies

- @twurple/api: Main client for Twitch Helix API interactions.
- @twurple/auth: Manages OAuth2 flows and automatic token refreshing.
- @twurple/eventsub-ws: Handles real-time Twitch events via WebSockets.
- socket.io: Powering the local server (Port 8083) to broadcast events to overlays.
- socket.io-client: Required specifically to connect to the Streamlabs Socket API.
- dotenv: Manages sensitive credentials via environment variables.

## How It Works

1. **Authentication**: The app uses `RefreshingAuthProvider` to manage OAuth tokens, automatically refreshing them when needed
2. **Event Subscription**: Creates a WebSocket connection to Twitch's EventSub service
3. **Event Handling**: Listens for specific events and logs them to the console
4. **Token Persistence**: Saves refreshed tokens to disk for future use

## Events

See [EVENTS.md](./EVENTS.md) for more informations on how to handle events

## License

ISC
