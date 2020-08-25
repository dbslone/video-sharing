# Video Sharing

## Getting Started

All steps below assume you are running a Mac with Homebrew and NVM installed.

Requirements: 
- Postgres DB: `brew install postgresql` and follow the instructions on screen
- Yarn: `brew install yarn`
- Node v14.8.0: If your using nvm then in your terminal type `nvm install 14.8.0` Note: This may work on older versions > 8.10 but has not been tested.


## Initialize the DB

First you will need to create a database named `video-sharing` if you want to use the default connection string `postgresql://localhost/video-sharing`. If you desire to use a different database name then you will need to update the connection string in `/api.env`.

You will also need to have the PG Extension "uuid-ossp" enabled. If you do not have this enabled already inside psql cli type the following command: 
```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
```

```
# Create Database
createdb video-sharing
```

Once this is complete you are ready to create the required tables.
```
cd api
yarn install
yarn init:db
```

## Start API server

To start the API server:
```
# If not already in the API directory
cd api
yarn start # Assumes you ran yarn install in the previous step
```

## Uploading videos

To upload a video you will need to install the video upload script.
```
cd video-upload
yarn install
npm install -g .

# For help command
video-upload -h

# For version command
video-upload -v

# To upload a video
video-upload -f <location of video file> -d  <dir of video-sharing-web public folder> -t <title of video> -c <postgres connection string>

# The -c flag is not needed if `postgresql://localhost/video-sharing` string will work

# Example
video-upload -f /Users/davidslone/drone.mp4 -d  ~/Projects/video-sharing/video-sharing-web/public -t "Drone Footage"
```

To uninstall the script: `npm uninstall -g video-upload`

The video upload script requires that the input source be at least a 4k video it will then create 240p, 480p, 1080p and 4k and upload them to the video-sharing-web public folder where they will accessible by the web app.

## Starting the web server