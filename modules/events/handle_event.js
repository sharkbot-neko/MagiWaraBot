// メッセージ受信時
import command from "./message/command.js";

// メンバー参加時
import ban from "./join_member/ban.js";
import welcome from "./join_member/welcome.js";

import * as LINETypes from "@evex/linejs-types";

export default async function handle_event(client, op, commands) {

    // メッセージのイベント
	if (op.type === "RECEIVE_MESSAGE" || op.type === "SEND_MESSAGE") {
		const message = await client.e2ee.decryptE2EEMessage(op.message);

        // コマンド処理
        command(client, message, commands);
	} else if (op.type === "NOTIFIED_JOIN_CHAT") {
        await ban(client, op);
        await welcome(client, op);
    }
}