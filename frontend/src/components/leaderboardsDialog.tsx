import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { scoresApi } from '../api/scoresApi'
import Backdrop from './backdrop';
import { Score } from '../types/scores'

type Props = {
  showRank?: string,
  recordScores?: Score[]
  handleClose: () => void
}

export const LeaderboardsDialog: React.FC<Props> = ({
  showRank,
  recordScores,
  handleClose
}) => {
  const newspaper = {
    hidden: {
      transform: "scale(0) rotate(720deg)",
      opacity: 0,
      transition: {
        delay: 0.3,
      },
    },
    visible: {
      transform: " scale(1) rotate(0deg)",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      transform: "scale(0) rotate(-720deg)",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Backdrop>
        <motion.div
          onClick={(e) => e.stopPropagation()}  
          className="modal"
          variants={newspaper}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="modal-score">Top 100</div>
            <div className='modal-scoreslist'>
            {
              recordScores != undefined && recordScores.length != 0
              ? 
                <table>
                  <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                  </thead>
                  <tbody>
                  {recordScores.map((value, i) => {
                    return <tr key={i} className={(showRank && showRank == value.id) ? 'rank-highlight' : ''}>
                      <td>{i+1}</td>
                      <td>{value.name}</td>
                      <td>{value.score}</td>
                    </tr>
                  })}
                  </tbody>
                </table>
              :
              <div className='modal-text'>No Scores yet</div>
            }
            </div>
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