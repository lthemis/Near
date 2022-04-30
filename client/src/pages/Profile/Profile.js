import React, { useEffect, useState } from "react";
import { ItemForm } from "../../components/ItemForm/ItemForm";
import { getUser } from "../../services/ApiService";
import { useAuth } from "../../utils/auth";
import { Chart } from "../../components/Chart/Chart";
import styles from "./Profile.module.scss";

// export const Profile = ({setStoreRenderFlag, storeRenderFlag}) => {
export const Profile = ({ flag, setLastItem }) => {
  const auth = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUser(auth.getUserFromSession());
      setUser(result);
    };
    if (Object.keys(user).length === 0) {
      fetchData();
    }
  });

  return (
    <div className={styles.container}>
      {Object.keys(user).length !== 0 ? (
        <div className={styles.profileContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.headerSell}>
              Welcome <span className={styles.detail}>{user.userName}</span>!
              Time to sell something? <br /> Do it here!
            </h1>

            <ItemForm flag={flag} setLastItem={setLastItem} />
          </div>
          <div className={styles.chartContainer}>
            <Chart
              income={user.wallet.income}
              expenses={user.wallet.expenses}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
