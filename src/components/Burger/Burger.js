import React from 'react'
import {withRouter} from "react-router-dom"
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

function Burger(props) {
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_,i) => {
                return <BurgerIngredient key={igkey + i} type= {igkey} />
            })
        })
        .reduce((arr,el) => {
            return arr.concat(el)
        },[])

    if(transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default withRouter(Burger);
