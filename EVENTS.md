# Events Documentation

When you connect to the socket server, you should receive a welcome message:

```json
{
  "type": "welcome",
  "message": "Connected to the socket server"
}
```


The following message is sent each time an event is triggered:
```json
{
  "type": ...,
  "data": {
    ...
  },
  "timestamp": ...
}
```

The data provided in the message will depends on the event type, here's a list of payload you will receive:

### `CHAT_MESSAGE`
```json
{
  "user_id": "string",
  "user_name": "string",
  "display_name": "string",
  "text": "string",
  "color": "string",
  "badges": "object",
  "parent_message_username": "string",
  "parent_message_text": "string",
}
```

### `REDEMPTION`
```json
{
  "id": "string",
  "user_id": "string",
  "user_name": "string",
  "reward_id": "string",
  "reward_title": "string",
  "reward_cost": "number",
  "input": "string"
}
```
### `POLL_START`
```json
{
  "id": "string",
  "title": "string",
  "choices": [
    {
      "id": "string",
      "title": "string"
    }
  ],
  "end_date": "Date"
}
```
### `POLL_END`
```json
{
  "id": "string",
  "status": "string",
  "choices": [
    {
      "title": "string",
      "total_votes": "number"
    }
  ]
}
```
### `PREDICTION_START`
```json
{
  "id": "string",
  "title": "string",
  "outcomes": [
    {
      "id": "string",
      "title": "string",
      "color": "string"
    }
  ],
  "lock_date": "Date"
}
```
### `PREDICTION_END`
```json
{
  "id": "string",
  "status": "string",
  "winning_outcome_id": "string"
}
```

### `DONATION`
```json
{
  "id": "number",
  "user_name": "string",
  "amount": "number",
  "currency": "string",
  "message": "string",
  "from": "string",
  "from_user_id": "string"
}
```

### `FOLLOW`
```json
{
  "user_name": "string"
}
```

### `SUB`
```json
{
  "user_name": "string",
  "months": "number",
  "message": "string",
  "sub_plan": "string",
}
```

### `RESUB`
```json
{
  "user_name": "string",
  "months": "number",
  "streak_months": "number",
  "message": "string",
  "sub_plan": "string",
}
```

### `SUB_GIFT`
```json
{
  "user_name": "string", 
  "gifter": "string", 
  "months": "number",
  "sub_plan": "string",
  "message": "string"
}
```

### `COMMUNITY_GIFT`
```json
{
  "user_name": "string", 
  "amount": "number", 
  "sub_plan": "string",
  "id": "string"
}
```

### `BITS`
```json
{
  "user_name": "string",
  "amount": "number",
  "message": "string",
  "total_bits": "number"
}
```
