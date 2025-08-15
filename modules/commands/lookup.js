export default {
    name: "lookup",
    execute: async function (client, message, args) {
        try {
            const mid = await client.talk.getContact({mid: args.join(" ")});
            await client.talk.sendMessage({
                to: message.to,
                text: `${mid.displayName}の情報\nMid: ${mid.mid}\nステータスメッセージ: ${mid.statusMessage}`
            })   
        } catch (e) {
            await client.talk.sendMessage({
                to: message.to,
                text: `メンバーが見つかりません。`
            }) 
            return;
        }
    }
    
}