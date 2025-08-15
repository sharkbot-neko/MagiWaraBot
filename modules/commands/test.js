export default {
    name: "test",
    execute: async function (client, message, args) {
        await client.talk.sendMessage({
            to: message.to,
            text: "しっかり起動しています！"
        })
    }
    
}