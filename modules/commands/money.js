import money from "../lib/money.js"

export default {
    name: "money",
    execute: async function (client, message, args) {
        const m = await money.get(message.from);

        await client.talk.sendMessage({
            to: message.to,
            text: `あなたの残高: ${m}コイン`
        }) 
        return;
    }
}