import money from "../lib/money.js"

var cooldowns = new Map();

export default {
    name: "work",
    execute: async function (client, message, args) {
        const COOLDOWN_MS = 1200000;

        async function checkCooldown(mid, commandName) {
            const key = `${mid}-${commandName}`;
            const now = Date.now();

            if (cooldowns.has(key)) {
                const lastUsed = cooldowns.get(key);
                const diff = now - lastUsed;

                if (diff < COOLDOWN_MS) {
                    const remaining = ((COOLDOWN_MS - diff) / 1000).toFixed(1);
                    return { onCooldown: true, remaining };
                }
            }

            cooldowns.set(key, now);
            return { onCooldown: false };
        }

        const cooldown_res = await checkCooldown(message.from, "work")

        if (cooldown_res.onCooldown) {
            await client.talk.sendMessage({
                to: message.to,
                text: `まだ稼げません。\n20分に一回稼げます。`
            });
            return;
        }

        const m = Math.floor(Math.random()*1000)+500;
        await money.add(message.from, m);

        await client.talk.sendMessage({
            to: message.to,
            text: `${m}コイン稼ぎました。`
        }) 
        return;
    }
}