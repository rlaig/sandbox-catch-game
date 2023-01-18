import { useState } from 'react'
import { useMount } from 'react-use'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import io from 'socket.io-client'
import MenuItem from "./components/menuItem"
import ScoreDialog from "./components/scoreDialog"
import LeaderboardsDialog from "./components/leaderboardsDialog"
import GuideDialog from "./components/guide"
import { scoresApi } from './api/scoresApi'

import {Game} from 'phaser'
import phaserGame from './components/PhaserGame'
import StartGameScene from './scenes/StartGameScene'

function App() {
  const socket = io(`${window.location.protocol}//${window.location.hostname}:3000`)
  const [phaser, setPhaser] = useState<Game>();
  const [showMainMenu, setShowMainMenu] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false)
  const [showLeaderboards, setShowLeaderboards] = useState<boolean>(false)
  const [showRank, setShowRank] = useState<string>()
  const [showGuide, setShowGuide] = useState<boolean>(false)

  const { isLoading, data: scoresData, refetch } = useQuery(['scores-top-100'],
    () => scoresApi.getTop100Scores()
  )

  const showMenu = (event: CustomEvent) => {
    console.log('CustomEvent showMenu', event)
    setShowMainMenu(event.detail)
  }
  const sendScore = (event: CustomEvent) => {
    console.log('CustomEvent sendScore', event)
    setScore(event.detail.score)
    setShowMainMenu(false)
    setShowScoreModal(true)
  }

  useMount(() => {
    if (!phaser) setPhaser(phaserGame())
    socket.on('scoreUpdated', updateScore)
    // add event listeners  
    window.addEventListener('show-menu', (showMenu) as EventListener);
    window.addEventListener('send-score', (sendScore) as EventListener);
  })

  const updateScore = async (row: any) => {
    console.log('[socket-io] `scoreUpdated` received', row)
    await refetch()
  }

  const handleLeaderboards = () => {
    setShowMainMenu(false)
    setShowLeaderboards(true)
  }
  const handleGuide = () => {
    setShowMainMenu(false)
    setShowGuide(true)
  }

  const handleStartGame = () => {
    if (phaser) {
      setShowMainMenu(false)
      setScore(0)
      const scene = phaser.scene.keys.startgame as StartGameScene
      phaser.scene.start(scene)
    }
  }

  const handleGuideClose = () => {
    setShowMainMenu(true)
    setShowGuide(false)
  }
  const handleLeaderboardsClose = () => {
    setShowRank(undefined)
    setShowMainMenu(true)
    setShowLeaderboards(false)
  }
  const handleScoreModalClose = (rank?: string) => {
    if(score > 0) {
      setShowLeaderboards(true)
      setShowRank(rank)
    } else setShowMainMenu(true)
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
          >
            <div className='menu-container'>
              <div className='menu-panel'>
                <div className='menu-title'>Sandbox VR: Catch Game</div>
                {
                  !!score && <div className='menu-text'>Previous Score: {score}</div>
                }
                <MenuItem label={"Start Game"} handleOnclick={handleStartGame}></MenuItem>
                <MenuItem label={"Leaderboards"} handleOnclick={handleLeaderboards}></MenuItem>
                <MenuItem label={"How to play"} handleOnclick={handleGuide}></MenuItem>
                <div className='menu-text'>by <a href="https://rlaig.com" target='_blank'>rlaig</a></div>
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
        {showScoreModal && <ScoreDialog handleClose={handleScoreModalClose} recordScore={score} refetch={refetch}></ScoreDialog>}
        {(showLeaderboards && !isLoading) && <LeaderboardsDialog handleClose={handleLeaderboardsClose} recordScores={scoresData} showRank={showRank}></LeaderboardsDialog>}
        {showGuide && <GuideDialog handleClose={handleGuideClose}></GuideDialog>}
      </AnimatePresence>
    </div>
  )
}

export default App
