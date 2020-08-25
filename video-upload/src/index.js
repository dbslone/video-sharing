/* eslint-disable new-cap */
const {Command, flags} = require('@oclif/command')
const ffmpeg = require('ffmpeg')
const chalk = require('chalk')
const fs = require('fs')

class VideoUploadCommand extends Command {
  async run() {
    const {flags} = this.parse(VideoUploadCommand)
    const file = flags.file
    const connectionString = flags.conn
    const cwd = process.cwd()
    const destination = flags.destination.replace(/\/$/, '')
    const epoch = Date.now()
    const exportDirectory = `${flags.destination}/videos/${epoch}`
    const videoFileName = file.split('/').reduce((accum, f) => f, '').split('.')[0]
    
    if (!destination.endsWith('video-sharing-web/public')) {
      this.error('Destination should be the public directory of the video-sharing-web folder')
    }

    // Establish Postgres connection
    var pg = require('knex')({
      client: 'pg',
      connection: connectionString,
      searchPath: ['knex', 'public'],
    })

    this.log(chalk.yellow('Establishing connection to Postgres...'))
    await pg('videos').select(['title']).limit(1).then(() => {
      this.log(chalk.green('Connection established'))
    }).catch(() => {
      this.error(chalk.red('Unable to establish connection to Postgres'))
    })

    try {
      const process = await new ffmpeg(file)
      .then(async video => {
        const resolution = video.metadata.video.resolution
        if (resolution.w < 3840 && resolution.h < 2160) {
          this.error(chalk.red('Video resolution must by 4k (3840x2160) or above'))
        }

        // Create the directory where all files will be exported
        await fs.mkdir(exportDirectory, {recursive: true}, err => {
          if (err) {
            this.error(err)
          }
          this.log(chalk.green(`Created directory ${exportDirectory}`))
        })

        // video.setVideoFormat('h264')
        video.addCommand('-b:v', '3M')
        video.addCommand('-acodec', 'copy')
        video.addCommand('-vcodec', 'copy')
        video.addCommand('-movflags', 'faststart')
        video.setVideoSize('3840x?', true, true, 'black')
        await video.save(`${exportDirectory}/${videoFileName}-4k.mp4`)
        .then((error, file) => {
          console.log('conversion complete')
        })
      })
    } catch (error) {
      this.log(error)
      if (error.code) {
        this.error(new Error(`Code: ${error.code}: ${error.msg}`))
      } else {
        this.error(error.message)
      }
    }

    this.exit()
  }
}

VideoUploadCommand.description = `Describe the command here
...
Uploads file to video-sharing-web and inserts record into Postgres DB
`

VideoUploadCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  file: flags.string({
    char: 'f',
    description: 'Path to video file',
    required: true,
  }),
  destination: flags.string({
    char: 'd',
    description: 'Desination for exported videos',
    required: true,
  }),
  conn: flags.string({
    char: 'c',
    description: 'Postgres connection string',
    default: 'postgresql://localhost/video-sharing',
  }),
}

module.exports = VideoUploadCommand
