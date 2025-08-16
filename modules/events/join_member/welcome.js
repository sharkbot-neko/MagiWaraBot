import welcome from "./../../lib/welcome.js"

export default async function _welcome(client, op) {
    const groupId = op.param1;
    const joinedUser = op.param2;

    if (!groupId || !joinedUser) {
        return;
    }
    
    if (await ban.isBanned(joinedUser, groupId)) return;

    if (await welcome.isEnabled(groupId)) {
        await client.talk.sendMessage({
            to: message.to,
            text: `誰かが参加したよ！`
        });
    }
}