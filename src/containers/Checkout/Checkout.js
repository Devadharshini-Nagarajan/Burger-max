import React, {Component} from "react"
import {Route, Redirect} from 'react-router-dom'
import { connect } from "react-redux"
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
// import * as actions from "../../store/actions/index"

class Checkout extends Component {
    // state={
    //     ingredients: {
    //         salad: 1,
    //         meat:1,
    //         bacon:1,
    //         cheese:1
    //     },
    //     totalPrice:0
    // }
    // componentWillMount() {
    //     this.props.onInitPurchase()
    // }
    // componentDidMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {}
    //     let totalPrice=0
    //     for (let param of query.entries()) {
    //         if(param[0] === 'price') {
    //             totalPrice = param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice:totalPrice
    //     })
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data/' )
    }
    render () {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (<>
            {purchasedRedirect}
            <CheckoutSummary 
                ingredients={this.props.ings} 
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                   component={ContactData} />
                   </>)
        }
        return (
            <div>
                {summary}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }
export default connect(mapStateToProps)(Checkout);