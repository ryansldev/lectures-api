import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { subjectsEnum } from '../enums/subjects'

// ENUMS
export const subjects = subjectsEnum;
export type Subject = typeof subjects[number]

export const noteTypes = ['TEXT'] as const
export type NoteType = typeof noteTypes[number]

// TABLES
export const lessonsTable = sqliteTable('lessons', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  subject: text('subject', { enum: subjects }).notNull(),
  title: text('title').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const notesTable = sqliteTable('notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type', { enum: noteTypes }).notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  lessonId: integer('lesson_id').references(() => lessonsTable.id).notNull(),
})
