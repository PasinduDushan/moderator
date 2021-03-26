# Moderation

Moderation is a free open-source npm package with lot of cool commands and features

## Installation

You can download our package from doing below command.

```bash
npm install moderation
```

## Commands

```bash
<PREFIX>kick - Kick a member from the serer by mention
<PREFIX>ban - Ban a member from the server by mention
<PREFIX>mute - Mute a member by mention
<PREFIX>unmute - Unmute a member by mention
<PREFIX>unban - Unban a member by ID
<PREFIX>clear - Clears up to 99 messages
<PREFIX>warn - Warn a member by mention
<PREFIX>lockdown - Lockdown the current channel
<PREFIX>release - Release lockdown in the current channel
```

## Usage

```bash
 const discord = require('moderation')

 discord('Your Bot TOKEN', 'Your bot(s) prefix', 'Your prefered embed colour')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
