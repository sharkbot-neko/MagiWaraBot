import money from "../lib/money.js"

export default {
    name: "work",
    execute: async function (client, message, args) {
        const m = Math.floor(Math.random()*1000)+500;
        await money.add(message.from, m);

        await client.talk.sendMessage({
            to: message.to,
            text: `${m}コイン稼ぎました。`
        }) 
        return;
    }
}