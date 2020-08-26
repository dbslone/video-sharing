import React, { useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import './VideoPlayer.css'

interface RouteParams {
    videoId: string
}

const videoOptions = ['4k', '1080p', '720p', '480p', '240p']

export default () => {
    const { videoId } = useParams<RouteParams>()
    const [video, setVideo] = useState({ title: '', folder: ''})
    const [version, setVersion] = useState(videoOptions[3])
    const history = useHistory()
    const videoEl = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        fetch(`http://localhost:3001/videos/${videoId}`).then((resp) => {
            return resp.json()
        }).then((data) => {
            if (data.error) {
                history.push('/404')
            } else {
                setVideo(data.video)
            }
        })
    }, [videoId, history])

    useEffect(() => {
        if (videoEl.current) {
            // Reload video player when changing quality
            videoEl.current.load()
        }
    }, [version])

    if (Object.keys(video).length === 0) {
        return null
    }

    return (
        <div className="VideoPlayer-container">
            <header>{video.title}</header>
            <section>
                <video controls ref={videoEl}>
                    <source src={`/videos/${video.folder}/${video.folder}-${version}.mp4`} type="video/mp4" />
                </video>
                <select onChange={(e) => setVersion(e.target.value)} value={version}>
                    {videoOptions.map((el) => (
                        <option key={el} value={el}>{el}</option>
                    ))}
                </select>
            </section>            
        </div>
    )
}