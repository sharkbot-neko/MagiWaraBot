import command from "./message/command.js";

export default async function handle_event(client, op, commands) {

    // メッセージのイベント
	if (op.type === "RECEIVE_MESSAGE" || op.type === "SEND_MESSAGE") {
		const message = await client.e2ee.decryptE2EEMessage(op.message);

        // コマンド処理
        command(client, message, commands);
	}
}