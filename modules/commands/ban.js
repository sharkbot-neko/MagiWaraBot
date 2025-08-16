import ban from "./../lib/ban.js"

export default {
    name: "ban",
    execute: async function (client, message, args) {
        const room = await client.talk.getChat({chatMid: message.to});
        if (room.extra.groupExtra.creator != message.from) return;

        if (args.length > 0) {

            await ban.ban(args.join(" "), message.to);

            await client.talk.sendMessage({
                to: message.to,
                text: `Banしました。\n次回参加時に自動的にキックします。\n現在このトークにいる場合は手動でKickしてください。`
            })
        } else {
            await client.talk.sendMessage({
                to: message.to,
                text: `引数が足りません。\n!ban [mid]`
            })
            return;
        }
    }
    
}