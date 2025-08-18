import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default {
    async get(mid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        const row = await db.get(
            `SELECT amount FROM money WHERE mid = ?`,
            [mid]
        );

        await db.close();
        return row ? row.amount : 0;
    },

    async add(mid, amount) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        await db.run(
            `INSERT INTO money (mid, amount)
             VALUES (?, ?)
             ON CONFLICT(mid) DO UPDATE SET amount = amount + excluded.amount`,
            [mid, amount]
        );

        await db.close();
    },

    async remove(mid, amount) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        await db.run(
            `UPDATE money
             SET amount = amount - ?
             WHERE mid = ?`,
            [amount, mid]
        );

        await db.close();
    }
};