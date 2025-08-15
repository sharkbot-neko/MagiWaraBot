export default {
    name: "roominfo",
    execute: async function (client, message, args) {
        const room = await client.talk.getChat({chatMid: message.to});
        await client.talk.sendMessage({
            to: message.to,
            text: `ルーム名: ${room.chatName}\nMID: ${room.chatMid}\n作成者のMID: ${room.extra.groupExtra.creator}`
        })
    }
    
}