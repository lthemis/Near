/* eslint-disable global-require */
import { NavLink } from "react-router-dom";
import { Logout } from "../Logout";
import { useAuth } from "../../utils/auth";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const auth = useAuth();

  const path = auth.checkIfAuthenticated() ? "store" : "/";

  return (
    <nav className={styles.navContainer}>
      <NavLink to={`${path}`}>
        <img src={require("../../assets/cover.png")} alt="logo" />
      </NavLink>

      {auth.checkIfAuthenticated() ? (
        <div>
          <NavLink to="/store">Store</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <Logout />
        </div>
      ) : (
        <div>
          <NavLink to="login">Login</NavLink>
          <NavLink to="register">Register</NavLink>
        </div>
      )}
    </nav>
  );
};
