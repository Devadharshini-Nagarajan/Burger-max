import React from "react";
import { Link } from "react-router-dom";
import classes from "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";

function Toolbar() {
  return (
    <header className={classes.Toolbar}>
      {/* <Link to="/">
        <div style={{ color: "white" }}>Menu</div>
      </Link> */}
      <div><b>BURGER APP</b></div>
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default Toolbar;
