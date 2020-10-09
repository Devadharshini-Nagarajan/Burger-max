import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function NavigationItems(props) {
  return (
    // <div >
    <ul className={classes.NavigationItems}>
      <NavigationItem>
        <Link to="/">Burger builder</Link>
      </NavigationItem>
      <NavigationItem>
        <Link to="/orders">Orders</Link>
      </NavigationItem>
      {props.isAuth !== null ? (
        <NavigationItem>
          <Link to="/logout">Logout</Link>
        </NavigationItem>
      ) : (
        <NavigationItem>
          <Link to="/auth">Authenticate</Link>
        </NavigationItem>
      )}
    </ul>
    // </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.userId,
  };
};

export default connect(mapStateToProps, null)(NavigationItems);
