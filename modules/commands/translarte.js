import translate from "../lib/translate.js"

export default {
    name: "translate",
    execute: async function (client, message, args) {
        if (args.length > 1) {
            try {
                const text = translate(args[0], args[1], args.slice(2));
                await client.talk.sendMessage({
                    to: message.to,
                    text: `${args[0]} から ${args[1]} への翻訳結果:\n` + text
                })
            } catch {
                await client.talk.sendMessage({
                    to: message.to,
                    text: "翻訳に失敗しました。"
                })
                return;
            }
        } else {
            await client.talk.sendMessage({
                to: message.to,
                text: `引数が足りません。\n!translate [翻訳元言語コード] [翻訳先言語コード] [テキスト]`
            })
            return;
        }
    }
    
}