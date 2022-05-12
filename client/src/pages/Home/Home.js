import Lottie from "lottie-react";
import styles from "./Home.module.scss";

const codingLottie = require("../../assets/53084-store-location.json");

export const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <div className={styles.animationContainer}>
        <Lottie
          animationData={codingLottie}
          loop="true"
          className={styles.animation}
        />
      </div>
      <div className={styles.introContainer}>
        <div>
          <h1 className={styles.mainHeading}>
            Trade with your neighbours and support local community!
          </h1>
        </div>
      </div>
    </section>
  );
};
