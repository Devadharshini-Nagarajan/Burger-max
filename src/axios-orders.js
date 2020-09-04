import axios from 'axios';;

const instance = axios.create({
    baseURL: 'https://burger-max-5563e.firebaseio.com/'
})

export default instance;