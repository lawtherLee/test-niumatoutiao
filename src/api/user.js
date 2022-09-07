import request from '@/utils/request'

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
