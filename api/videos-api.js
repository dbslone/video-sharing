require('dotenv').config()

module.exports = function(videoId) {
    var pg = require('knex')({
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        searchPath: ['knex', 'public'],
    })

    return new Promise((resolve, reject) => {
        pg('videos').select('title').where({ id: videoId }).then((rows) => {
            if (rows[0]) {
                resolve(rows[0])
            } else {
                reject('Unable to find record')
            }
        })
    })
}