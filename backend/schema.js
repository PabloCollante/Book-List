import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

//Tabla Principal
export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  author: text('author').notNull(),
  publisher: text('publisher').notNull(),
  rating: integer('rating'), //puntuacion del 1 al 5
  coverImage: text('cover_image'), //enlace de la imagen
  createdAt: integer('created_at', { mode: 'timestamp' })
});

//Tabla para los pasajes u opinones relacionadas a un libro 
export const quotes = sqliteTable('quotes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  bookId: integer('book_id').references(() => book.id), //foreingKey
  content: text('content').notNull(),
  page: integer('page')
});
