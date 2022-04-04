import React from 'react'
import { CardFace } from '../../components/svg/CardFace';
import Lottie from "lottie-react";
import styles from './Home.module.css';
import { style } from '@mui/system';
const codingLottie = require('../../assets/53084-store-location.json')

export const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <div className={styles.animationContainer}>
        <Lottie animationData={codingLottie} loop="true" className={styles.animation}></Lottie>
      </div>
      <div className={styles.introContainer}>
        <div>
          <h1 className={styles.mainHeading}>Trade with your neighbours and support local community!</h1>
        </div>
        <div>
          <h2 className={styles.subHeading}>Buy and sell from people living nearby! Collect effortlessly, without commute or waiting for a courier! </h2>
        </div>
      </div>
    </section>
  )
}



