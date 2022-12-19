import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

request.interceptors.request.use(config => {
  const token = store.state.user
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response
}, async error => {
  console.dir(error)

  if (error.response && error.response.status === 401) {
    const user = store.state.user
    if (!user || !user.refresh_token) {
      await router.push('/login')
    }
    try {
      const res = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log('刷新token成功', res)

      store.commit('SET_TOKEN', {
        token: res.data.data.token,
        refresh_token: user.refresh_token
      })
      return request(error.config)
    } catch (err) {
      console.log('请求刷新token失败', err)
      await router.push('/login')
    }
  }
  return Promise.reject(error)
})
export default request
