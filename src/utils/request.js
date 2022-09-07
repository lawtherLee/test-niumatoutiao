// 下载引入并配置 axios
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})
export default request
