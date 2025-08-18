import { ClientRequest } from "http";

function IsString(value) {
    return typeof value === "string" || value instanceof String;
}

var cooldowns = new Map();

const COOLDOWN_MS = 3000; // 3秒

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

async function runCommand(client, name, args, message, commands_) {
    // コマンド名を小文字化して統一
    const commandName = name.toLowerCase();

    // コマンド取得
    const command = commands_.get(commandName);
    if (!command) {
        return;
    }

    // コマンド実行
    try {
        if (typeof command.execute === "function") {
            await command.execute(client, message, args);
        } else if (typeof command === "function") {
            await command(client, message, args);
        } else {
            console.error(`Command "${commandName}" is not executable`);
        }
    } catch (err) {
        console.error(`Error executing command "${commandName}":`, err);
    }
}

export default async function handleCommand(client, message, commands_) {
    const text = message.text;

    if (message.from == client.profile.mid) return;

    if (!IsString(text)) return;

    if (!text.startsWith("!")) return;

    const cmd = text.replace("!", "");
    const name = cmd.split(" ")[0];

    try {
        if (text.split(" ").length == 0) {
            await runCommand(client, name, [], message);
            return;
        }
        const args = text.split(" ").slice(1);

        await runCommand(client, name, args, message, commands_);
    } catch (error) {
        console.error(error);
    }
}