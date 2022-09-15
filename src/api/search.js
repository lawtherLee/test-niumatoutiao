import request from '@/utils/request'

/**
 * 搜索建议
 * @param q 搜索的关键词
 * @returns {*} Promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {Number} page 分页页数
 * @param {Number} per_page 每页条数
 * @param {String} q 搜索关键词
 * @returns {}
 */
export const getResultsAPI = (/*eslint-disable-line*/ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
