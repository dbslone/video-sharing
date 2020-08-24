require('dotenv').config()

// If script fails because uuid_generate_v4 is not a function
// then need to enable the extension with the following command:
// CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

var pg = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
})

pg.schema.createTable('videos', (table) => {
    table.uuid('id').primary().defaultTo(pg.raw('uuid_generate_v4()'))
    table.string('title')
}).then(() => {
    pg('videos').insert({ title: 'Big Bunny'}).returning(['id', 'title']).then((rows) => {
        console.log('\n\n\n============')
        console.log('Use the following urls to view content in the web browser:')
        rows.map((row) => {
            console.log(`${row.title}: http://localhost:5000/watch/${row.id}`)
        })
        console.log('============\n\n\n')
        process.exit(0)
    })
}).catch(e => {
    console.error(e)
    process.exit(1)
  })