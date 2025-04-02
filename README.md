# Ghosted - Mastodon Bot

A Mastodon bot that simulates a "narcissistic + vulnerable + paranoid" digital boyfriend character. The bot posts 24 message groups (one per hour) to mimic someone who's being ghosted.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Mastodon API token:
   ```
   TOKEN=your_mastodon_api_token_here
   ```

## Running the Bot

### Local Development
```
node bot.js
```

### Production Deployment (DigitalOcean Droplet with pm2)
```
pm2 start bot.js --name ghosted
```

## How It Works

- The bot posts one message group per hour
- Each group contains multiple related messages posted with a 5-second delay between them
- Message content follows a progression of increasingly desperate and paranoid texts
- After all 24 message groups are posted, the bot automatically stops

## Monitoring

To check the status of your bot when running with pm2:
```
pm2 status
pm2 logs ghosted
``` 