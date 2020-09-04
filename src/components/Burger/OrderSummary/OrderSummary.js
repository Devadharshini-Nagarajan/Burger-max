import React from 'react'
import Aux from '../../../hoc/Auxx.js'

function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>
            {igKey}</span> : {props.ingredients[igKey]}</li>;
        })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious Burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p>Total Price: {props.price}</p>
            <p>Continue to checkout ?</p>
            <button onClick={props.modalClosed}>CANCEL</button>
            <button onClick={props.continue}>CONTINUE</button>
        </Aux>
    )
}

export default OrderSummary
