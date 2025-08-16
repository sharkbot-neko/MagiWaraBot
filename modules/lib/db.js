import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function db() {
    const db = await open({
        filename: "./../../data.db",
        driver: sqlite3.Database
    });

    return db;
}