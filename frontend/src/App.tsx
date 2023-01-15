import { useState, useEffect } from 'react'
import { useMount } from 'react-use'
import './app.css'
import io, { Socket } from 'socket.io-client'
import { motion } from "framer-motion"
import menuItem from "./components/menuItem"

import phaserGame from './components/PhaserGame'
import {Game} from 'phaser'
import HelloWorldScene from './scenes/HelloWorldScene'
import StartGameScene from './scenes/StartGameScene'


function App() {

  type detailObject = {
    message: string
  }
  const [phaser, setPhaser] = useState<Game>();
  const [showMainMenu, setShowMainMenu] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const showMenu = (event: CustomEvent) => {
      setShowMainMenu(event.detail)
    }
    window.addEventListener('show-menu', (showMenu) as EventListener);

    const sendScore = (event: CustomEvent) => {
      setScore(event.detail)
    }
    window.addEventListener('send-score', (sendScore) as EventListener);

    return () => { 
      window.removeEventListener('show-menu', (showMenu) as EventListener)
      window.removeEventListener('send-score', (showMenu) as EventListener)
    }
  }, []);

  useEffect(()=>{
    const newSocket = io(`http://${window.location.hostname}:3000`)
    newSocket.on('scoreUpdated', row => {
      console.log('update call', row)
    })
    return () => { newSocket.close() }
  }, [])

  const onClickStart = () => {
    console.log('Start Game')
  }

  const onClickLeaderboards = () => {
    console.log('Leaderboard')
  }

  useMount(() => {
    if (!phaser) setPhaser(phaserGame())
  })

  const handleClick = () => {
    if (phaser) {
      const scene = phaser.scene.keys.helloworld as HelloWorldScene
      scene.createEmitter()
    }
  }
  const handleStartGame = () => {
    if (phaser) {
      setShowMainMenu(false)
      setScore(0)
      console.log(phaser)
      const scene = phaser.scene.keys.startgame as StartGameScene
      phaser.scene.start(scene)
    }
  }


  return (
    <div className='App'>
      <div id="game-container">
        {/* <button onClick={handleClick}>test</button> */}
      
        <div className='app-container'>
          <div className='menu'>
            <div className='menu-container'>
              <div className='menu-panel'  hidden={!showMainMenu}>
                <div className='menu-title'>Sandbox Test</div>
                { menuItem({label: 'Start Game', onclick: handleStartGame}) }
                { menuItem({label: 'Leaderboards', onclick: onClickLeaderboards}) }
                <div className='menu-title'>score {score}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
