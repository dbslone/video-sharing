const express = require('express')
const app = express()
const port = 3001

const videosAPI = require('./videos-api')

app.get('/videos/:videoId', async (req, res) => {
    try {
        const video = await videosAPI(req.params.videoId)
        res.json({ video })
    } catch (e) {
        res.status(404)
        res.json({ error: e })
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})