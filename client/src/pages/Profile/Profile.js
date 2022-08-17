/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ItemForm } from "../../components/ItemForm/ItemForm";
import { useAuth } from "../../hooks/useAuth";
import { Chart } from "../../components/Chart/Chart";
import styles from "./Profile.module.scss";
import { getUser } from "../../services/ApiService";

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
              <br />
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
