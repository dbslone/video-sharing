# LiveControl - Technical Interview Challenge

Rather than a whiteboard interview or an automated coding test, we have each candidate perform a medium sized interview challenge. This challenge is your opportunity to show off your skills and have insight into the type of technical tasks we will deal with on a daily basis at LiveControl.

## Intro to the Challenge

At LiveControl, our platform allows operators to remote into venues and control cameras in real time. Video from these operator controlled cameras are recorded and streamed to viewers, again all in real time. 

For this task you will be building a simplified version of our Web Viewer.

We estimate this challenge should take less than 3 hours from start to finish. Please note that this estimate is not a time constraint. You are free to take as little or much time as you feel comfortable with, we are only giving you an estimate so you know the level of effort we expect.

As a full stack engineer you will need to work on both sides of the stack, this challenge will test your skills on both the front-end and the back-end. 

## Product Spec

#### Context

For this ticket we will be building a single page application that will allow users to view pre-recorded videos in the following dimensions: 240p, 480p, 1080p, 4k.

**Web Viewer**

The web viewer should allow users to access a page at `http://127.0.0.1:8080/watch/:id` and view a video with the corresponding id in the database. In addition, the user should have the ability to set their desired video quality at 240p, 480p, 1080p, and 4k.

In the database we should store the title of the video, and a unique id for the video, no other meta data is required.

**Upload Script**

For the sake of time, and the sake of this ticket, the web viewer does not need to have upload functionality, however as an engineer you should write a script that can take in a video path as an argument, convert the video to the dimensions listed above, place those converted videos in a public folder that is accessible to the web viewer, and add an entry to the database that makes it accessible over the web viewer api.

Sample Video: If you are looking for a video to demo with, head over to https://peach.blender.org/download/ (1080p) and http://bbb3d.renderfarming.net/download.html (4k) to get a copy of "Big Buck Bunny".

#### Technical Spec

```
**1.0.0** Users should be able to watch an uploaded video on the Web Viewer
    
    **1.1.0** When a user loads a page at the path `/watch/:id` the `id` should be sent to an API that gets the title of the video from the database as well as the links to the video file in the following formats
        **1.1.1** 240p
        **1.1.2** 480p
        **1.1.3** 1080p
        **1.1.4** 4k

    **1.2.0** As a viewer, I should be able to select the video quality, by default I should see the quality in `480p`

    **1.3.0** As a viewer, when I load the page, I should see the title of the video

    **1.4.0** The page should have all of the functionality shown in the wireframe

**2.0.0** While uploading from the web interface is not necessary, it should be possible to "upload" a video using a script in the project files
    
    **2.1.0** Note for clarity: By "uploading" a video, we mean adding an entry to the database and putting the video files in a place that is accessible from the Web Viewer's HTTP server, it is not necessary to actually upload the videos to a third party.

    **2.2.0** The "upload script" should add an entry to the database for a new video
    
    **2.3.0** It should allow the person running the script to set the video title
    
    **2.4.0** It should resize the video to the following formats:
        **2.4.1** 240p
        **2.4.2** 480p
        **2.4.3** 1080p
        **2.4.4** 4k
    
    **2.4.0** It should place those resized videos in a directory that is accessible from the Web Viewer
    
    **2.5.0** It should output the URL where the video will be viewable (IE: `http://127.0.0.1:8080/watch/1`)
```

## Minimum Technical Requirements

- The written application must be a web-based application
- The application should demonstrate your proficiency with the following:
    - React.js
        - For state management feel free to use any library of your choice or no library at all if you feel the application simple enough, as a point of reference we use MobX
    - TypeScript
        - Ideally on the frontend and the backend
    - Relational Database (MySQL, PostgreSQL, etc) or NoSQL databases (MongoDB, CouchDB, etc)
        - As a point of reference we use PostgreSQL

## Submitting the Challenge

- Create a repository using your personal GitLab or GitHub account and send us the link. That's it!
- It is not necessary to pre-populate the "public" directory or have seeds for this project, just 
  have a readme that tells us how to: use the "Upload" script, configure the database, and setup the server.
  From that information, we'll demo with our own content.

Happy Hacking!