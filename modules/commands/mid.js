export default {
    name: "mid",
    execute: async function (client, message, args) {
        try {
            await client.talk.sendMessage({
                to: message.to,
                text: `あなたのmid: ${message.from}`
            })
        } catch (e) {
            await client.talk.sendMessage({
                to: message.to,
                text: `エラーが発生しました。`
            }) 
            return;
        }
    }
    
}