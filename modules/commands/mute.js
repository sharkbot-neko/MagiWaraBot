import mute from "../lib/mute.js";
import isowner from "../lib/isowner.js";

export default {
    name: "mute",
    execute: async function (client, message, args) {
        if (!await isowner(message.from)) {
            await client.talk.sendMessage({
                to: message.to,
                text: `オーナー専用です。`
            })
            return;
        };

        try {
            let targetMid;

            if (args.length > 0) {
                targetMid = args.join(" ");
            } else {
                await client.talk.sendMessage({
                    to: message.to,
                    text: `使い方: !blacklist [mid]`
                })
                return;
            }

            const m_c = await mute.get(targetMid);
            
            if (!m_c) {
                await mute.add(targetMid);
                await client.talk.sendMessage({
                    to: message.to,
                    text: `ミュートリストに追加しました。`
                })
            } else {
                await mute.remove(targetMid);
                await client.talk.sendMessage({
                    to: message.to,
                    text: `ミュートリストから削除しました。`
                })
            }
        } catch (e) {
            await client.talk.sendMessage({
                to: message.to,
                text: `エラーが発生しました。`
            }) 
            return;
        }
    }
    
}