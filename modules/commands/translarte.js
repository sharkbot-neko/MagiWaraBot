import translate from "../lib/translate.js"

export default {
    name: "translate",
    execute: async function (client, message, args) {
        if (args.length >= 3) {
            try {
                const text = await translate(args[0], args[1], args.slice(2).join(" "));
                await client.talk.sendMessage({
                    to: message.to,
                    text: `翻訳結果\n[${args[0]} → ${args[1]}]\n\n${text}`
                });
            } catch (err) {
                await client.talk.sendMessage({
                    to: message.to,
                    text: "翻訳に失敗しました。"
                });
            }
        } else {
            await client.talk.sendMessage({
                to: message.to,
                text: `引数が足りません。\n!translate [翻訳元言語コード] [翻訳先言語コード] [テキスト]`
            });
        }
    }
};