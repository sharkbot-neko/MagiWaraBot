import ban from "./../lib/ban.js"

export default {
    name: "unban",
    execute: async function (client, message, args) {
        const room = await client.talk.getChat({chatMid: message.to});
        if (room.extra.groupExtra.creator != message.from) return;

        if (args.length > 0) {
            await ban.unban(args.join(" "), message.to);

            await client.talk.sendMessage({
                to: message.to,
                text: `Banを解除しました。`
            })
        } else {
            await client.talk.sendMessage({
                to: message.to,
                text: `引数が足りません。\n!unban [mid]`
            })
            return;
        }
    }
    
}