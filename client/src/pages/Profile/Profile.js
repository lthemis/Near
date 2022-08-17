/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ItemForm } from "../../components/ItemForm/ItemForm";
import { useAuth } from "../../hooks/useAuth";
import { Chart } from "../../components/Chart/Chart";
import styles from "./Profile.module.scss";
import { getUser } from "../../services/ApiService";
import { Button } from "../../components/Button/Button";

export const Profile = ({ flag, setLastItem }) => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  const [itemAction, setItemAction] = useState("sell");

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
            </h1>
            <div className={styles.btnContainer}>
              <Button
                btnRole="Sell an item"
                onClick={() => setItemAction("sell")}
              />
              <Button
                btnRole="See your items"
                onClick={() => setItemAction("display")}
              />
            </div>
            <div className={styles.itemActionContainer}>
              {itemAction === "sell" ? (
                <ItemForm flag={flag} setLastItem={setLastItem} />
              ) : null}
            </div>
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
