import React , {Component} from "react"
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxx'

const withErrorhandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }
        errorConfirmedHAndler = () => {
            this.setState({error: null})
        }
        render () {
            return (
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedHAndler}>
                        {this.state.error && this.state.error.message}</Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}
export default withErrorhandler;
