import { useState, useEffect } from 'react'
import { useMount } from 'react-use'
import './App.css'
import io, { Socket } from 'socket.io-client'
import menuItem from "./components/menuItem"
import ScoreDialog from "./components/scoreDialog"

import phaserGame from './components/PhaserGame'
import {Game} from 'phaser'
import StartGameScene from './scenes/StartGameScene'

import { scoresApi } from './api/scoresApi'

import { AnimatePresence } from 'framer-motion'

function App() {
  const socket = io(`${window.location.protocol}//${window.location.hostname}:3000`)
  const [phaser, setPhaser] = useState<Game>();
  const [showMainMenu, setShowMainMenu] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const showMenu = (event: CustomEvent) => {
    console.log('CustomEvent showMenu')
    setShowMainMenu(event.detail)
  }
  const sendScore = (event: CustomEvent) => {
    console.log('CustomEvent sendScore')
    setScore(event.detail.score)
  }

  // attach game container
  useMount(() => {
    // if (!phaser) setPhaser(phaserGame())
    socket.on('scoreUpdated', updateScore)
    // add event listener
    window.addEventListener('show-menu', (showMenu) as EventListener);
    window.addEventListener('send-score', (sendScore) as EventListener);
  })

  // add custom event listeners for react and phaser to communicate
  // useEffect(() => {
  //   window.addEventListener('show-menu', (showMenu) as EventListener);
  //   window.addEventListener('send-score', (sendScore) as EventListener);
  //   return () => { 
  //     window.removeEventListener('show-menu', (showMenu) as EventListener)
  //     window.removeEventListener('send-score', (showMenu) as EventListener)
  //   }
  // }, [])

  const updateScore = async (row: any) => {
    console.log('update call', row)
    const scores = await scoresApi.getTop100Scores()
    console.log('score api call', scores)
  }

  const onClickLeaderboards = () => {
    const sendScore = new CustomEvent('send-score', {
        detail: {
          score: 100
        },
    })
    window.dispatchEvent(sendScore)
    console.log('Leaderboard')
  }

  const handleStartGame = () => {
    if (phaser) {
      setShowMainMenu(false)
      setScore(0)
      const scene = phaser.scene.keys.startgame as StartGameScene
      phaser.scene.start(scene)
    }
  }

  const handleModalClose = () => {
    setShowModal()
    // https://fireship.io/lessons/framer-motion-modal/
  }

  return (
    <div className='App'>
      <div id="game-container">
      
        <div className='app-container'>

          <div className='menu' hidden={!showMainMenu}>
            <div className='menu-container'>
              <div className='menu-panel'>
                <div className='menu-title'>Sandbox</div>
                { menuItem({label: '1', onclick: handleStartGame}) }
                { menuItem({label: '2', onclick: onClickLeaderboards}) }
                <div className='menu-title'>{score}</div>
              </div>
            </div>
          </div>

          <div className="score-dialog">
            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {showModal && <ScoreDialog handleClose={handleModalClose} text="Modal Dialog"></ScoreDialog>}
            </AnimatePresence>
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
