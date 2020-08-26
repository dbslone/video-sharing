import React, { useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import './VideoPlayer.css'

export default () => {
    const { videoId } = useParams()
    const [video, setVideo] = useState({})
    const [version, setVersion] = useState('480p')
    const history = useHistory()
    const videoEl = useRef(null)

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
                    <option value="4k">4k</option>
                    <option value="1080p">1080p</option>
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                    <option value="240p">240p</option>
                </select>
            </section>            
        </div>
    )
}