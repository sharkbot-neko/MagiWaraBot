import welcome from "./../lib/welcome.js"

export default {
    name: "welcome",
    execute: async function (client, message, args) {
        const room = await client.talk.getChat({chatMid: message.to});
        if (room.extra.groupExtra.creator != message.from) return;

        if (args.length > 0) {
            if (args[0] == "on") {
                await welcome.setEnable(message.to);

                await client.talk.sendMessage({
                    to: message.to,
                    text: `よろしくメッセージを有効化しました。`
                })
            } else if (args[0] == "off") {
                await welcome.setDisable(message.to);

                await client.talk.sendMessage({
                    to: message.to,
                    text: `よろしくメッセージを無効化しました。`
                })
            } else {
                await client.talk.sendMessage({
                    to: message.to,
                    text: `引数が不正です。\non/offのどちらかで指定してください。`
                })
            }
        } else {
            await client.talk.sendMessage({
                to: message.to,
                text: `引数が足りません。\n!welcome [on/off]`
            })
            return;
        }
    }
    
}