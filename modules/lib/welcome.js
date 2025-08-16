import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default {
    isEnabled: async function isEnabled(gid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        const row = await db.get(`SELECT mid FROM ban WHERE gid = ?`, [gid]);

        await db.close();
        return !!row;
    },

    setEnable: async function setEnable(gid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        await db.run(
            `INSERT OR REPLACE INTO ban (gid) VALUES (?)`,
            [gid]
        );

        await db.close();
        return;
    },

    setDisable: async function setDisable(gid) {
        const db = await open({
            filename: "./../../data.db",
            driver: sqlite3.Database
        });

        await db.run(`DELETE FROM ban WHERE gid = ?`, [gid]);

        await db.close();
        return;
    }
}