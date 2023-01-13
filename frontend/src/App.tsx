import { useEffect } from 'react'
import './App.css'
import io, { Socket } from 'socket.io-client'
import { motion } from "framer-motion"

export const menuItem = (label: string, onclick?: ()=>void) => (
  <motion.div
    className="box"
    onClick={onclick}
    whileHover={{ scale: 1 }}
    whileTap={{ scale: 0.9 }}
  >{label}</motion.div>
)

function App() {

  useEffect(()=>{
    const newSocket = io(`http://${window.location.hostname}:3000`)
    newSocket.on('scoreUpdated', row => {
      console.log('update call', row)
    })
    return () => { newSocket.close() }
  }, [])

  return (
    <div className="App">
      { menuItem('Menu 1') }
      <br />
      { menuItem('Menu 2') }
      { String(import.meta.env.VITE_APP_API_BASE_URL || 'n/a') }
    </div>
  )
}

export default App
