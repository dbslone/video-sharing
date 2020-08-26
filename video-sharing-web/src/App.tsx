import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import VideoPlayer from './VideoPlayer'
import './App.css'

function App() {
  return (
    <div className="App-container">
      <Router>
        <Route path="/" exact>
          <div className="Home">
            <h1>Welcome</h1>
          </div>
        </Route>
        <Route path="/video/:videoId">
          <VideoPlayer />
        </Route>
        <Route path="/404" exact>
          <div className="NotFound">
            <h1>404</h1>
            <p>Unable to find a video</p>
          </div>
        </Route>
      </Router>
    </div>
  )
}

export default App
