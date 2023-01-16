import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  label: string
  handleOnclick?: () => void;
}

export const MenuItem: React.FC<Props> = ({
  label,
  handleOnclick
}) => {
  return <motion.button
    className="button submit-button"
    onClick={handleOnclick}
    whileHover={{ scale: 1 }}
    whileTap={{ scale: 0.9 }}
  >{label}</motion.button>
}

export default MenuItem