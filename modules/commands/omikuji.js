export default {
    name: "omikuji",
    execute: async function (client, message, args) {
        const fortuneArr = ["大凶" ,"凶", "吉", "中吉", "大吉"];
        const result = fortuneArr[Math.floor(Math.random() * fortuneArr.length)];


        await client.talk.sendMessage({
            to: message.to,
            text: `おみくじ結果: ${result}`
        });
    }
    
}