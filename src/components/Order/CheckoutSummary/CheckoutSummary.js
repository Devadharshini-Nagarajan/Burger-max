import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.css";

function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>we hope it taste well</h1>
      <div style={{ width: "700px", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <button onClick={props.checkoutCancelled} style={{ marginRight: "20px" }}>
        Cancel
      </button>
      <button
        onClick={props.checkoutContinued}
        style={{ backgroundColor: "lightgreen" }}
      >
        Continue
      </button>
    </div>
  );
}

export default CheckoutSummary;
