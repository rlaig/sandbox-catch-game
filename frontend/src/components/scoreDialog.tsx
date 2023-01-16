import React from 'react'
import { motion } from 'framer-motion'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import { scoresApi } from '../api/scoresApi'
import Backdrop from './backdrop';

type Props = {
  score: number
  handleClose: () => void
}

export const ScoreDialog: React.FC<Props> = ({
  score,
  handleClose
}) => {
  // const { isLoading, data: scoresData, refetch } = useQuery(['scores-top-100'],
  //   () => scoresApi.getTop100Scores()
  // )

  const flip = {
    hidden: {
      transform: "scale(0) rotateX(-360deg)",
      opacity: 0,
      transition: {
        delay: 0.3,
      },
    },
    visible: {
      transform: " scale(1) rotateX(0deg)",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      transform: "scale(0) rotateX(360deg)",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const handleSubmit = () => {
    console.log('handleSubmit')
  }

  return (
    <Backdrop>
        <motion.div
          onClick={(e) => e.stopPropagation()}  
          className="modal"
          variants={flip}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="modal-score">{score}</div>
          <p className="modal-text">New Score Record!</p>
          <input type="text" placeholder="Enter your name" className="input-name"></input>
          <motion.button 
            className="button submit-button"
            onClick={handleSubmit}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            Submit
          </motion.button>
          <motion.button 
            className="button close-button"
            onClick={handleClose}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            don't send
          </motion.button>
        </motion.div>
    </Backdrop>
  );
}

export default ScoreDialog