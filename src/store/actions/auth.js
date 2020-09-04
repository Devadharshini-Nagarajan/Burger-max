import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authSuccess = (token,id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token ,
        userId: id
    }
}

export const authStart = (authData) => {
    return {
        type: actionTypes.AUTH_START,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userid')
    return {
        type: actionTypes.AUTH_LOGOUT
    } 
}
export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expireTime * 1000);
    }
}

export const auth = (email,password,isSignUp) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAirZ0_3tK82oAsAn10-d_Q9NlYo7W8M88'
        if(!isSignUp) {
            url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAirZ0_3tK82oAsAn10-d_Q9NlYo7W8M88"
        }
        axios.post(url,authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token',res.data.idToken)
                localStorage.setItem('expirationDate',expirationDate)
                localStorage.setItem('userid',res.data.localId)
                dispatch(authSuccess(res.data.idToken,res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                // console.log(err)
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userid');
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout())
            } else {
                dispatch(authSuccess(token,userid))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()))/1000)
            }
        }
    }
}