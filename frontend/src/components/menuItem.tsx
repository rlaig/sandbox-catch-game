import React from 'react'
import { motion } from "framer-motion"

type Props = {
  label: string
  onclick?: ()=>void;
}

export const menuItem: React.FC<Props> = ({
  label,
  onclick
}) => {
  <motion.div
    className="box"
    onClick={onclick}
    whileHover={{ scale: 1 }}
    whileTap={{ scale: 0.9 }}
  >{label}</motion.div>
}