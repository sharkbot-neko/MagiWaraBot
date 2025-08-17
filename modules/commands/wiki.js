export default {
    name: "wiki",
    execute: async function (client, message, args) {
        if (args.length == 0) {
            await client.talk.sendMessage({
                to: message.to,
                text: `引数が足りません。\n!wiki [キーワード]`
            })
            return;
        }

        try {
            const wikipediaApiUrl = "https://ja.wikipedia.org/w/api.php";
            const params = new URLSearchParams({
                action: "query",
                format: "json",
                titles: word,
                prop: "info",
                inprop: "url"
            });

            const response = await fetch(`${wikipediaApiUrl}?${params.toString()}`);
            if (!response.ok) {
                await client.talk.sendMessage({
                    to: message.to,
                    text: `APIエラーが発生しました。`
                })
                return;
            }

            const data = await response.json();
            const pages = data?.query?.pages ?? {};
            if (Object.keys(pages).length === 0) {
                return interaction.editReply("Wikipedia記事が見つかりませんでした。");
            }

            const [pageId, pageInfo] = Object.entries(pages)[0];
            if (pageId === "-1") {
                return interaction.editReply("Wikipedia記事が見つかりませんでした。");
            }

            const shortUrl = `https://ja.wikipedia.org/w/index.php?curid=${pageId}`;
            
            await client.talk.sendMessage({
                to: message.to,
                text: `検索結果\n${shortUrl}`
            })
            return;
        } catch {
            await client.talk.sendMessage({
                to: message.to,
                text: `不明なエラーが発生しました。`
            })
            return;
        }
    }
};