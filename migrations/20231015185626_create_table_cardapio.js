/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cardapio", (table) => {
    table.increments("id").primary();
    table.string("refeicao").notNullable();
    table.string("salada");
    table.string("guarnicao");
    table.string("leguminosas");
    table.string("carboidrato");
    table.string("tipo")
    table.string("sobremesa")
    table.dateTime("estimateAt");
    table.integer("userId").references("id").inTable("users").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cardapio");
};
