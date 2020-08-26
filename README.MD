# Video Sharing

## Getting Started

All steps below assume you are running a Mac with Homebrew and NVM installed.

Requirements: 
- Postgres DB: `brew install postgresql` and follow the instructions on screen
- Yarn: `brew install yarn`
- Node v14.8.0: If your using nvm then in your terminal type `nvm install 14.8.0` Note: This may work on older versions > 8.10 but has not been tested.


## Initialize the DB

First you will need to create a database named `video-sharing` if you want to use the default connection string `postgresql://localhost/video-sharing`. If you desire to use a different database name then you will need to update the connection string in `/api/.env`.

**IMPORTANT:** You will also need to have the PG Extension "uuid-ossp" enabled. If you do not have this enabled already inside psql cli type the following command: 
```shell
$ CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
```

```shell
# Create Database
$ createdb video-sharing
```

Once this is complete you are ready to create the required tables.
```shell
$ cd api
$ yarn install
$ yarn init:db
```

## Start API server

To start the API server:
```shell
$ cd api # If not already in the API directory
$ yarn start # Assumes you ran yarn install in the previous step
```

Note: If you are using a custom PG connection string you will need to update the `.env` file in the api directory.

## Uploading videos

To upload a video you will need to install the video upload script.
```shell
$ cd video-upload
$ yarn install
$ npm install -g . #yarn will not work for this so we use npm

# For help command
$ video-upload -h

# For version command
$ video-upload -v

# To upload a video
$ video-upload -f <location of video file> -d  <dir of video-sharing-web public folder> -t <title of video> -c <postgres connection string>

# The -c flag is not needed if `postgresql://localhost/video-sharing` string will work

# Example
$ video-upload -f /Users/davidslone/drone.mp4 -d  ~/Projects/video-sharing/video-sharing-web/public -t "Drone Footage"
```

To uninstall the script: `npm uninstall -g video-upload`

The video upload script requires that the input source be at least a 4k video it will then create 240p, 480p, 1080p and 4k and upload them to the video-sharing-web public folder where they will accessible by the web app.

NOTE: Since transcoding to different codecs could increase the time for conversion significantly the script also assumed you are providing a source codec that will play in a web browser.

Once the script completes sucessfully it will provide a media url. Once the web server is up and running you can use this url to view the uploaded content.

## Starting the web server

Once the following steps have been completed your ready to start the web application.

```shell
$ cd video-sharing-web
$ yarn install
$ yarn start
```

Once the server is up and running you can visit the media url provided by the upload script to view the content.