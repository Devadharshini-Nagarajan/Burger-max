import React,{Component} from "react"
import Order from '../../components/Order/Order/Order'
import axios from '../../axios-orders'
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"

class Orders extends Component {

    // state={
    //     order:[]
    // }
    componentDidMount(){
        // const fetchOrders=[]
        // axios.get('/orders.json').then((res) => {
        //     for(let i in res.data){
        //         fetchOrders.push({...res.data[i],id: i})
        //     }
        //     this.setState({order:fetchOrders})
        // })
        // .catch(err => console.log(err))
        this.props.onFetchOrders(this.props.token)
    }
    render () {
        return (
            <div>
                {this.props.order?.map(el => (
                    <Order id={el.id} 
                        ingredients={el.ingredients}
                        price={el.price}/>
                ))}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        order: state.order.order,
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token) => dispatch(actions.fetchorder(token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders);