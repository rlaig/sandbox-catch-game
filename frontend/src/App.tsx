import { useState, useEffect, useCallback } from 'react'
import { useMount } from 'react-use'
import './App.css'
import io, { Socket } from 'socket.io-client'
import MenuItem from "./components/menuItem"
import ScoreDialog from "./components/scoreDialog"

import phaserGame from './components/PhaserGame'
import {Game} from 'phaser'
import StartGameScene from './scenes/StartGameScene'

import { scoresApi } from './api/scoresApi'

import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const socket = io(`${window.location.protocol}//${window.location.hostname}:3000`)
  const [phaser, setPhaser] = useState<Game>();
  const [showMainMenu, setShowMainMenu] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);

  const showMenu = (event: CustomEvent) => {
    console.log('CustomEvent showMenu', event)
    setShowMainMenu(event.detail)
  }
  const sendScore = (event: CustomEvent) => {
    console.log('CustomEvent sendScore', event)
    setScore(event.detail.score)
    handleScoreModalOpen()
  }

  // attach game container
  useMount(() => {
    if (!phaser) setPhaser(phaserGame())
    socket.on('scoreUpdated', updateScore)
    // add event listener
    window.addEventListener('show-menu', (showMenu) as EventListener);
    window.addEventListener('send-score', (sendScore) as EventListener);
  })

  const updateScore = async (row: any) => {
    console.log('update call', row)
    const scores = await scoresApi.getTop100Scores()
    console.log('score api call', scores)
  }

  const handleLeaderboards = () => {
    console.log('Leaderboard')
    handleScoreModalOpen()
  }

  const handleStartGame = () => {
    if (phaser) {
      setShowMainMenu(false)
      setScore(0)
      const scene = phaser.scene.keys.startgame as StartGameScene
      phaser.scene.start(scene)
    }
  }

  const handleScoreModalOpen = () => {
    setShowMainMenu(false)
    setShowScoreModal(true)
  }
  const handleScoreModalClose = () => {
    setShowMainMenu(true)
    setShowScoreModal(false)
  }

  return (
    <div className='App'>
      <div id="game-container">
      
        <div className='app-container'>

        { showMainMenu && 
          <motion.div className='menu'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
          >
            <div className='menu-container'>
              <div className='menu-panel'>
                <div className='menu-title'>Sandbox VR: Catch Game</div>
                <MenuItem label={"Start Game"} handleOnclick={handleStartGame}></MenuItem>
                <MenuItem label={"Leaderboards"} handleOnclick={handleLeaderboards}></MenuItem>
                {
                  !!score && <div className='menu-text'>Previous Score: {score}</div>
                }
              </div>
            </div>
          </motion.div>
        }
        </div>
      </div>

      <AnimatePresence
        initial={false}
        mode={'wait'}
        onExitComplete={() => null}
      >
        {showScoreModal && <ScoreDialog handleClose={handleScoreModalClose} score={score}></ScoreDialog>}
      </AnimatePresence>
    </div>
  )
}

export default App
