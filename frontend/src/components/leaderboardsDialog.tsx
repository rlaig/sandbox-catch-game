import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { scoresApi } from '../api/scoresApi'
import Backdrop from './backdrop';
import { Score } from '../types/scores'

type Props = {
  recordScores?: Score[]
  handleClose: () => void
}

export const LeaderboardsDialog: React.FC<Props> = ({
  recordScores,
  handleClose
}) => {
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
          <div className="modal-score">Top 100</div>
          {
            recordScores != undefined 
            ? 
            <div className='modal-scoreslist'>
              {recordScores.map((value, i) => {
                return <div>{value.name} {value.score}</div>
              })}
            </div>
            :
            <div className='modal-text'>No Scores yet</div>
          }
          <motion.button 
            className="button close-button"
            onClick={handleClose}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            BACK TO MENU
          </motion.button>
        </motion.div>
    </Backdrop>
  );
}

export default LeaderboardsDialog