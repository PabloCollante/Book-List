import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { books, quotes } from './schema.js';
import { eq } from 'drizzel-orm';

//instancia db
const sqlite = new Database('book_list.db');
const db = drizzel(sqlite);


