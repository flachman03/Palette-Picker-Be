exports.seed = function(knex) {
  return knex("palettes")
    .del()
    .then(() => knex("projects").del())
    .then(async () => {
      await knex.raw("TRUNCATE TABLE projects RESTART IDENTITY CASCADE");
      await knex.raw("TRUNCATE TABLE palettes RESTART IDENTITY CASCADE");
    })
    .then(function() {
      return knex("projects").insert([
        { title: "Example 1" },
        { title: "Example 2" }
      ]);
    })
    .then(() => {
      return knex("palettes").insert([
        {
          project_id: 1,
          color_1: "#403F4C",
          color_2: "#E84855",
          color_3: "#F9DC5C",
          color_4: "#3185FC",
          color_5: "#EFBCD5"
        },
        {
          project_id: 1,
          color_1: "#B1F8F2",
          color_2: "#BDC39C",
          color_3: "#FFFC99",
          color_4: "#EAFDCF",
          color_5: "#8E8358"
        },
        {
          project_id: 2,
          color_1: "#C9CEBD",
          color_2: "#B2BCAA",
          color_3: "#838E83",
          color_4: "#6C6061",
          color_5: "#64403E"
        }
      ]);
    });
};
