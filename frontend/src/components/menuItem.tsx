import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  label: string
  onclick?: () => void;
}

export const menuItem: React.FC<Props> = ({
  label,
  onclick
}) => {
  return <motion.div
    className='menu-item'
    onClick={onclick}
    whileHover={{ scale: 1 }}
    whileTap={{ scale: 0.9 }}
  >{label}</motion.div>
}

export default menuItem