import React, { Component } from "react";
import Input from "../../components/UI/Inputs/Input";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
    },
    isSignUp: true,
  };

  switchAuthHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  };
  inputChangeHandler = (e, controlName) => {
    const updatedOrderForm = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.controls[controlName].validation
        ),
      },
    };
    this.setState({ controls: updatedOrderForm });
    // console.log(updatedOrderForm)
  };

  loginHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({ id: key, config: this.state.controls[key] });
    }
    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }
    let auth = null;
    if (this.props.isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "12rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "50px",
            boxShadow: "3px 3px 5px 6px #ccc",
          }}
        >
          {auth}
          <form onSubmit={this.loginHandler}>
            {formElementArray.map((formElement) => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                changed={(e) => this.inputChangeHandler(e, formElement.id)}
              />
            ))}
            <button
              style={{
                margin: "20px 0",
                backgroundColor: "green",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Login
            </button>
            <br></br>
          </form>
          <button
            onClick={this.switchAuthHandler}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Switch to {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}{" "}
          </button>
          {errorMsg && (
            <p style={{ color: "red", margin: "10px 0", textAlign: "center" }}>
              {errorMsg}
            </p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isAuth: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
