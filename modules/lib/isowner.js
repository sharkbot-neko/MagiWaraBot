export default async function isowner(mid) {
    if (mid == process.env.bot_owner_mid) {
        return true;
    } else {
        return false;
    }
}