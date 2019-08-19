
exports.up = function(knex) {
  return knex.schema.table('palettes', table => {
    table.dropForeign('project_id')
    table.foreign('project_id').references('projects.id').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.table('palettes', table => {
    table.dropForeign('project_id')
    table.foreign('project_id').references('projects.id')
  })
};
