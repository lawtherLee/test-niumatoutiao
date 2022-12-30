import request from '@/utils/request'

export const getCommentsAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
