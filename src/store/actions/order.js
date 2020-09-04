import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
import { act } from 'react-dom/test-utils'

export const purchaseburgerSuccess = (id, orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id.name,
        orderData: orderData
    }
}

// export const purchaseBurgerStart = () => {
//     return {
//         type: actionTypes.PURCHASE_BURGER_START
//     }
// }
export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        axios.post('/orders.json',orderData)
            .then(res => dispatch(purchaseburgerSuccess(res.data,orderData)))
            .catch(err => console.log(err))
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchorder = (token) => {
    return dispatch => {
        const fetchOrders=[]
        axios.get('/orders.json').then((res) => {
            for(let i in res.data){
                fetchOrders.push({...res.data[i],id: i})
            }
            dispatch(fetchOrderSuccess(fetchOrders))
        }) 
        .catch(err => console.log(err))
    }
}
