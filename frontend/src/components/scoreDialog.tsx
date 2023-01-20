import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { scoresApi } from '../api/scoresApi'
import Backdrop from './backdrop';
import { ScoreSubmitResult } from '../types/scores';

type Props = {
  recordScore: number
  handleClose: (rank?: string) => void
  refetch: () => void
}

export const ScoreDialog: React.FC<Props> = ({
  recordScore,
  handleClose,
  refetch
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

  const [inputName, setInputName] = useState<string>('')
  const [inputDirty, setInputDirty] = useState<boolean>(false)

  const handleOnSuccess = useCallback((data: ScoreSubmitResult)=>{
    console.log('handleOnSuccess', data)
    refetch()
    alert('Score Successfully Submitted!')
    handleClose(data['generated_keys'][0])
  },[])

  const { mutateAsync: submitScore, isLoading } = useMutation(scoresApi.submitScore,
    {
      onSuccess: handleOnSuccess,
      onError: ()=>{
        alert('Something went wrong!')
      }
    }
  )

  const handleNameChange = useCallback((e: any) => {
    setInputDirty(true)
    setInputName(e.target.value)
  },[setInputName])

  const handleSubmit = useCallback(
    async () => {
      setInputDirty(true)
      if (inputName.length != 0)
        submitScore({
          name: inputName,
          score: recordScore,
        })
    },
    [submitScore, inputName, recordScore]
  )


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
          <div className="modal-score">{ recordScore }</div>
          <p className="modal-text">{ recordScore <= 0 ? 'Oops try again..' : 'New Score Record!' }</p>
          {
            inputDirty && inputName.length === 0 &&
            <motion.div className="modal-validation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >Please Input your name</motion.div>
          }
          { 
            recordScore > 0 && 
            <>
              <input onChange={handleNameChange} type="text" placeholder="Enter your name" className="input-name" maxLength={10}></input>
              <motion.button 
                className="button submit-button"
                onClick={handleSubmit}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
              >
                Submit
              </motion.button>
            </>
          }
          
          <motion.button 
            className="button close-button"
            onClick={()=>{handleClose()}}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            { recordScore <= 0 ? 'BACK TO MENU' : 'DON\'T SEND' }
          </motion.button>
        </motion.div>
    </Backdrop>
  );
}

export default ScoreDialog