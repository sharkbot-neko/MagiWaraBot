import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function make_db() {
    const db = await open({
        filename: "./../../data.db",
        driver: sqlite3.Database
    });

    // Ban情報
    await db.run(`
    CREATE TABLE IF NOT EXISTS ban (
        id TEXT PRIMARY KEY,
        mid TEXT,
        gid TEXT,
        reason TEXT
    )
    `);

    // よろしく情報
    await db.run(`
    CREATE TABLE IF NOT EXISTS welcome (
        id TEXT PRIMARY KEY,
        gid TEXT
    )
    `);

    // お金情報
    await db.run(`
    CREATE TABLE IF NOT EXISTS money (
        id TEXT PRIMARY KEY,
        mid TEXT,
        amount INTEGER,
    )
    `);

    await db.close();
}