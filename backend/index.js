import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { fileURLToPath } from "node:url";
import * as schema from "./schema.js";


//ubica la db dentro del backend, independientemente de la carpeta donde se inicializa el servidor
const databasePath = fileURLToPath(
    new URL("./book_list.db", import.meta.url)
)

//instancia db
const sqlite = new Database('book_list.db');

//activa la comprobacion de claves foraneas en sqlite
sqlite.pragma("foreing_key = ON")

export const db = drizzle(sqlite, { schema });



