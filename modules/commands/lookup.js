export default {
    name: "lookup",
    execute: async function (client, message, args) {
        try {
            let targetMid;

            // 引数がある場合
            if (args.length > 0) {
                targetMid = args.join(" ");
            } else {
                // 引数がない場合 → 自分を対象
                targetMid = message.from;
            }

            const midData = await client.talk.getContact({ mid: targetMid });

            await client.talk.sendMessage({
                to: message.to,
                text: `${midData.displayName}の情報\n` +
                    `Mid: ${midData.mid}\n` +
                    `ステータスメッセージ: ${midData.statusMessage || "なし"}\n` +
                    `アイコン:\nhttp://dl.profile.line-cdn.net${midData.picturePath || ""}`
            });

        } catch (e) {
            await client.talk.sendMessage({
                to: message.to,
                text: `メンバーが見つかりません。`
            });
        }

    }
    
}