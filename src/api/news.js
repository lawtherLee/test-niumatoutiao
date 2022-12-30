import request from '@/utils/request'

/**
 * 获取文章
 * @param id 频道的id
 * @param timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * @returns {*}
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}

/**
 * 获取文章详情
 * @param articleID 文章详情id
 * @returns {*}
 */
export const getDetailAPI = (articleID) => {
  return request({
    url: `/v1_0/articles/${articleID}`
  })
}

/**
 * 收藏文章接口
 * @param target 文章的id
 * @returns {*}
 */
export const addCollectAPI = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 * @param target 文章id
 * @returns {*}
 */
export const deleteCollectAPI = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
