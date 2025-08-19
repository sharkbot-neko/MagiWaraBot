import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default {
    async get(mid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        const row = await db.get(
            `SELECT amount FROM mute WHERE mid = ?`,
            [mid]
        );

        await db.close();
        return row || null;
    },

    async add(mid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        await db.run(
            `INSERT OR REPLACE INTO mute (mid) VALUES (?);`,
            [mid]
        );

        await db.close();
    },

    async remove(mid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        await db.run(`DELETE FROM mute WHERE mid = ?`, [mid]);

        await db.close();
    }
};