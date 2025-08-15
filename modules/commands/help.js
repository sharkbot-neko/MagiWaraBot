export default {
    name: "help",
    execute: async function (client, message, args) {
        await client.talk.sendMessage({
            to: message.to,
            text:
                "全員が使えるコマンド\n" +
                "!help .. ヘルプを表示します。\n" +
                "!roominfo .. ルーム情報を取得します。\n" +
                "!test .. テストを実行します。"
        })
    }
    
}