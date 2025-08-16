import ban from "./../../lib/ban.js"

export default async function ban_check(client, op) {
    const groupId = op.param1;
    const joinedUser = op.param2;

    if (!groupId || !joinedUser) {
        console.error("groupId or joinedUser is null", { groupId, joinedUser });
        return;
    }
    if (await ban.isBanned(joinedUser, groupId)) {
        // await client.talk.deleteOtherFromChat({request: {
        //     chatMid: groupId,
        //     targetUserMids: [joinedUser],
        //     reqSeq: op.reqSeq
        // }});

        await client.talk.sendMessage({
            to: groupId,
            text: `Banされているメンバーが参加しました。`
        });
    }
}