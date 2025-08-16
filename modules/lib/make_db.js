import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function make_db() {
    const db = await open({
        filename: "./../../data.db",
        driver: sqlite3.Database
    });

    await db.run(`
    CREATE TABLE IF NOT EXISTS ban (
        id TEXT PRIMARY KEY,
        mid TEXT,
        gid TEXT,
        reason TEXT
    )
    `);

    await db.close();
}