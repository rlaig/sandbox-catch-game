import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Backdrop from './backdrop';
import { Score } from '../types/scores'

import boat from '../assets/boat-small.png'
import left from '../assets/left.png'
import right from '../assets/right.png'
import e1 from '../assets/e1.png'
import e2 from '../assets/e2.png'
import p1 from '../assets/p1.png'
import p2 from '../assets/p2.png'
import p3 from '../assets/p3.png'
import p4 from '../assets/p4.png'

type Props = {
  recordScores?: Score[]
  handleClose: () => void
}

export const GuideDialog: React.FC<Props> = ({
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
          <div className="modal-score">How to play</div>
            <div className='modal-scoreslist'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Control the boat</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <img src={left}/>
                        </td>
                        <td>
                            <img src={boat}/>
                            <p>Move the boat using arrow keys LEFT and RIGHT or tapping on screen arrows on mobile.</p>
                        </td>
                        <td>
                            <img src={right}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>POINTS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        <br />
                                        Prevent catching these guys will deduct you 100 points
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={e1}/></td>
                                    <td><img src={e2}/></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <br />
                                        Gain 50 points by saving these guys!
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={p1}/></td>
                                    <td><img src={p2}/></td>
                                </tr>
                                <tr>
                                    <td><img src={p3}/></td>
                                    <td><img src={p4}/></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
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

export default GuideDialog