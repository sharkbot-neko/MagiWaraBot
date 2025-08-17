import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default {
    get: async function get(mid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        const row = await db.get(`SELECT amount FROM money WHERE mid = ?`, [mid]);

        await db.close();
        return row || 0;
    },

    add: async function add(mid, amount) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        const am = await this.get(mid);

        await db.run(
            `INSERT OR REPLACE INTO money (mid, amount) VALUES (?, ?)`,
            [mid, am + amount]
        );

        await db.close();
    },

    delete: async function delete_(mid, amount) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        const am = await this.get(mid);

        await db.run(
            `INSERT OR REPLACE INTO money (mid, amount) VALUES (?, ?)`,
            [mid, am - amount]
        );

        await db.close();
    }
}