/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ItemForm } from "../../components/ItemForm/ItemForm";
import { useAuth } from "../../hooks/useAuth";
import { Chart } from "../../components/Chart/Chart";
import styles from "./Profile.module.scss";
import { useHtml } from "../../hooks/useHtml";

export const Profile = ({ flag, setLastItem }) => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  const { isLoading, error, sendRequest } = useHtml();

  useEffect(() => {
    const usedId = auth.getUserFromSession();
    sendRequest({ route: `/getUser/${usedId}` }, setUser);
  }, [sendRequest, auth]);

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
