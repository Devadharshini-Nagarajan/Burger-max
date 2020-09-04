import React, { Component } from "react";
import { connect } from 'react-redux';
import Aux from "../../hoc/Auxx.js";
import withErrorHandler from "../../hoc/withErrorHandlers/withErrorHandler";
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import * as actions from "../../store/actions/index"

const INGREDIENT_PRICES = {
    bacon: 0.7,
    cheese: 0.4,
    salad: 0.5,
    meat: 1.3
}
class BurgerBuilder extends Component {
    state = {
        // ingredients:null,
        // totalPrice:4,
        // purchaseable: false,
        purchasing: false
    }
componentDidMount() {
    // axios.get('https://burger-max-5563e.firebaseio.com/ingredients.json')
    // .then(res => {
    //     this.setState({ingredients: res.data})
    // })
    this.props.onInitIngredients()
}
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum,el) => {
                return sum + el
            },0)
        return sum > 0
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceReduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceReduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true})
        this.props.onInitPurchase()
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // const queryparams = []
        // for (let i in this.state.ingredients ) {
        //     queryparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryparams.push('price=' + this.props.price)
        // const queryString = queryparams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search:'?' + queryString
        // })
        this.props.history.push("/checkout")
    }

    render () {
        const disabledInfo = {...this.props.ings}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                {this.props.ings && (
                <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.props.ings} 
                        modalClosed={this.purchaseCancelHandler}
                        continue = {this.purchaseContinueHandler}
                        price={this.props.price}/>
                </ Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={this.props.price}
                    purchase={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler} />
                </div>)}
            </Aux>
        )
    }
} 

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.iniitIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))