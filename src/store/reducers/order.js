import * as actionTypes from "../actions/actionTypes"


const initialState = {
    order: [],
    purchased: false
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,purchased: false
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const neworder = {
                ...action.orderData,id: action.orderId
            }
            // console.log("neworder",neworder)
            return {
                ...state,order: state.order.concat(neworder),purchased: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,order: action.orders
            }

        default:
            return state;
    }
}

export default reducer;