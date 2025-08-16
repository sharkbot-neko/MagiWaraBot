import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default {
    ban: async function ban(mid, gid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        await db.run(
            `INSERT OR REPLACE INTO ban (mid, gid) VALUES (?, ?)`,
            [mid, gid]
        );

        await db.close();
    },

    unban: async function unban(mid, gid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        await db.run(`DELETE FROM ban WHERE mid = ? AND gid = ?`, [mid, gid]);

        await db.close();
    },

    isBanned: async function isBanned(mid, gid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        const row = await db.get(`SELECT mid FROM ban WHERE mid = ? AND gid = ?`, [mid, gid]);

        await db.close();
        return !!row;
    }
}