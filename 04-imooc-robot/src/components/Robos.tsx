import React from 'react'
import styles from './Robot.module.css'

interface RobotProps {
  id: number,
  name: string,
  email: string
}

const Robot: React.FC<RobotProps> = ({ id, name, email }) => {

  return (
    <div className={styles.cardContainer}>
      <img src={`https://robohash.org/${id}`} alt="机器人"/>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}

export default Robot