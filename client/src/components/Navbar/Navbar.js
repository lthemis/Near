/* eslint-disable global-require */
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.scss";
import { Button } from "../Button/Button";

export const Navbar = () => {
  const auth = useAuth();
  const clickHandler = () => {
    auth.logout();
  };
  const path = auth.checkIfAuthenticated() ? "store" : "/";

  return (
    <nav className={styles.navContainer}>
      <NavLink to={`${path}`}>
        <img src={require("../../assets/cover.png")} alt="logo" />
      </NavLink>

      {auth.checkIfAuthenticated() ? (
        <div>
          <NavLink to="/store">
            <Button btnRole="Store" />
          </NavLink>
          <NavLink to="/profile">
            <Button btnRole="Profile" />
          </NavLink>
          <Button btnRole="Logout" onClick={clickHandler} />
        </div>
      ) : (
        <div>
          <NavLink to="login">
            <Button btnRole="Login" />
          </NavLink>
          <NavLink to="register">
            <Button btnRole="Register" />
          </NavLink>
        </div>
      )}
    </nav>
  );
};
