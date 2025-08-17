export default {
    name: "help",
    execute: async function (client, message, args) {
        await client.talk.sendMessage({
            to: message.to,
            text:
                "基本的なコマンド\n" +
                "!help .. ヘルプを表示します。\n" +
                "!omikuji .. おみくじを引きます。\n" + 
                "!test .. テストを実行します。\n" +
                
                "検索系のコマンド\n" +
                "!roominfo .. ルーム情報を取得します。\n" +
                "!lookup .. ユーザー情報を取得します。\n" +
                "!mid .. 実行した人のmidを取得します。\n" + 
                "!translate .. 翻訳をします。\n" + 
                "!wiki .. Wikipediaを検索します。\n" +

                "経済系のコマンド\n" +
                "!work .. コインを稼ぎます。\n" +
                "!money .. コイン残高を確認します。\n" +

                "グループオーナーのみが使えるコマンド\n" +
                "!ban .. メンバーをbanします。\n" +
                "!unban .. メンバーをunbanします。\n" +
                "!welcome .. 新しい人が参加するとお知らせします。\n"
        })
    }
    
}