import request from '@/utils/request'
// import store from '@/store'

/**
 * 登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns {Promise}
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户基本信息(我的页面显示的数据接口)
 * @returns {Promise}
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // 在axios里统一配置请求头
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

/**
 *
 * @param file 裁剪过图片的file对象
 * @returns {Promise}
 */
export const uploadPhotoAPI = (file) => {
  // 文件格式
  const fm = new FormData()
  fm.append('photo', file)

  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 获取用户个人信息(编辑资料)
 * @returns {Promise}
 */
export const userProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 *
 * 编辑用户信息
 * @param dataObj 用户要修改的对象
 * @returns {*}
 */
export const editUserProfileAPI = (dataObj) => {
  const obj = {
    name: '',
    gender: 0,
    birthday: '',
    intro: ''
  }
  for (const prop in obj) {
    if (dataObj[prop] === undefined) {
      delete obj[prop]
    } else {
      obj[prop] = dataObj[prop]
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: dataObj
  })
}

/**
 * 关注用户接口
 * @param userID 用户id
 * @returns {*}
 */
export const userFollowedAPI = (userID) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userID
    }
  })
}

/**
 * 取消关注用户接口
 * @param userID 用户id
 * @returns {*}
 */
export const userUnFollowedAPI = (userID) => {
  return request({
    url: `/v1_0/user/followings/${userID}`,
    method: 'DELETE'
  })
}
