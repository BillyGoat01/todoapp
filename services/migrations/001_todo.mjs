import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("todo")
    .addColumn("todoid", "varchar", col => col.primaryKey())
    .addColumn("task", "varchar", col => col.notNull())
    .addColumn("complete_by", "varchar", col => col.notNull())
    .addColumn("completed", "boolean", col => col.defaultTo(false))
    .execute();

//   await db.schema
//     .createIndex("idx_article_created")
//     .on("article")
//     .column("created")
//     .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("todo").execute();
}

