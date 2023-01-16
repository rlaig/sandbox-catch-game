import React from 'react'
import { motion } from 'framer-motion'
import { useMutation, useQuery } from '@tanstack/react-query'
import { scoresApi } from '../api/scoresApi'

type Props = {
  hidden: string
  label: string
  onclick?: () => void;
}

export const scoreDialog: React.FC<Props> = ({
  label,
  onclick
}) => {
  const { isLoading, data: scoresData, refetch } = useQuery(['scores-top-100'],
    () => scoresApi.getTop100Scores()
  )

  return <motion.div
    className='menu-item'
    onClick={onclick}
    whileHover={{ scale: 1 }}
    whileTap={{ scale: 0.9 }}
  >{label}</motion.div>
}

export default scoreDialog