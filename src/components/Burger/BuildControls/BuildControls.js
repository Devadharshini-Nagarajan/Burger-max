import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControls/BuildControl'

function BuildControls(props) {
    const controls = [
        {label: "Salad", type: "salad"},
        {label: "Bacon", type: "bacon"},
        {label: "Cheese", type: "cheese"},
        {label: "Meat", type: "meat"},
    ]
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
            {controls.map(ctrl => {
                return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    disabled={props.disabledInfo[ctrl.type]}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)} />
            })}
            {/* {props.price.toFixed(2) !== "4.00" &&  */}
            {/* {props.purchase && */}
                <button className={classes.OrderButton} disabled={!props.purchase} onClick={props.ordered}>ORDER NOW</button> 
            {/* } */}
        </div>
    )
}

export default BuildControls
