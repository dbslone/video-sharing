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
    table.string('folder')
}).then(() => {
    console.log('DB Table "videos" created sucessfully. You may now use the video upload script')
    process.exit()
}).catch(e => {
    console.error(e)
    process.exit(1)
  })