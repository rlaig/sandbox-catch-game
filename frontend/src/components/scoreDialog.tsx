import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation, useQuery } from '@tanstack/react-query'
import { scoresApi } from '../api/scoresApi'
import Backdrop from './backdrop';

type Props = {
  handleClose: () => void
  text: string
}

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

export const ScoreDialog: React.FC<Props> = ({
  handleClose,
  text,
}) => {
  const { isLoading, data: scoresData, refetch } = useQuery(['scores-top-100'],
    () => scoresApi.getTop100Scores()
  )

  return (
    <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}  
          className="modal orange-gradient"
          variants={flip}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p>{text}</p>
          <button onClick={handleClose}>Close</button>
        </motion.div>
    </Backdrop>
  );
}

export default ScoreDialog