# Twitch Events

A Node.js application for monitoring and logging Twitch channel events in real-time using the Twurple library.

## Features

- **Real-time Event Monitoring**: Listens to Twitch EventSub WebSocket events
- **Subscription Tracking**: Logs new channel subscriptions with user details and tier information
- **Poll Management**: Monitors poll lifecycle events including:
  - Poll creation with choices
  - Real-time poll progress updates
  - Poll results with winner determination
- **Token Management**: Automatic OAuth token refresh and storage

## Prerequisites

- Node.js (v14 or higher)
- A Twitch Developer Application with Client ID and Secret
- Twitch OAuth tokens with appropriate scopes

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
TWITCH_USER_ID=your_user_id
TWITCH_CLIENT_ID=your_client_id
TWITCH_SECRET=your_client_secret
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
- `channel:read:subscriptions` - Read subscription events
- `channel:read:polls` - Read poll events
- `channel:read:redemptions` - Read channel point redemptions
- `chat:read` - Read chat messages

## Dependencies

- [@twurple/api](https://www.npmjs.com/package/@twurple/api) - Twitch API client
- [@twurple/auth](https://www.npmjs.com/package/@twurple/auth) - Twitch authentication
- [@twurple/eventsub-ws](https://www.npmjs.com/package/@twurple/eventsub-ws) - EventSub WebSocket listener
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management

## How It Works

1. **Authentication**: The app uses `RefreshingAuthProvider` to manage OAuth tokens, automatically refreshing them when needed
2. **Event Subscription**: Creates a WebSocket connection to Twitch's EventSub service
3. **Event Handling**: Listens for specific events and logs them to the console
4. **Token Persistence**: Saves refreshed tokens to disk for future use

## License

ISC
