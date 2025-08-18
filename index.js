// import { loginWithPassword } from "@evex/linejs";
import { BaseClient } from "@evex/linejs/base";
import { FileStorage } from "@evex/linejs/storage";
import dotenv from "dotenv";
import handle_event from "./modules/events/handle_event.js";
import make_db from "./modules/lib/make_db.js";

import path from "path";
import fs from "fs";

import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// console.log(process.env.email)
// console.log(process.env.password)

await make_db();

const storage = new FileStorage("./storage.json");

var client = new BaseClient({
    email: process.env.email,
    password: process.env.password,
    onPincodeRequest(pincode) {
        console.log('Enter this pincode to your LINE app:', pincode)
    },
    device: "DESKTOPWIN",
    storage: storage
})

client.on("update:authtoken", async (authToken) => {
	await storage.set(".auth", authToken);
});

// コマンド一覧
var commands = new Map();

// コマンドロード
async function load_command() {
    commands.clear();

    const commandsPath = path.join(__dirname, 'modules', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);

        const modulePath = pathToFileURL(filePath).href + `?update=${Date.now()}`;

        try {
            const module = await import(modulePath);
            const command = module.default || module;

            if ("name" in command && "execute" in command) {
                commands.set(command.name, command);
            } else {
                console.warn(`Warning: Command at ${filePath} is missing "name" or "execute".`);
            }
        } catch (err) {
            console.error(`Error loading command: ${filePath}`, err);
        }
    }
}

await load_command();

fs.watch('./modules/commands', async (eventType, filename) => {
    if (filename) {
        console.log(`コマンド変更を検知しました。リロードします。`);
        await load_command();
    }
});

await client.loginProcess.login({
	email: process.env.email,
    password: process.env.password,
    pincode: process.env.pincode
});

const polling = client.createPolling();

// イベント
for await (const op of polling.listenTalkEvents()) {
    // console.log(op)
    await handle_event(client, op, commands);
}