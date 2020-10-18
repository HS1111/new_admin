import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    transformResponse: [function(data) {
        // Do whatever you want to transform the data

        try {
            return JSONbig.parse(data)
        } catch {
            return data
        }

    }],
})


//请求拦截器加请求头
request.interceptors.request.use((config) => {

    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
        config.headers.Authorization = 'Bearer ' + user.token
    }
    return config
})

request.interceptors.response.use(config => {
    return config
})


export default request