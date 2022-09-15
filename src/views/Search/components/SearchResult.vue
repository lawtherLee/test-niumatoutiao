<template>
  <div class="result">
    <van-list
      v-model="loading"
      :error.sync="error"
      :finished="finished"
      error-text="出错了 点击刷新"
      finished-text="没有更多了"
      @load="getResults"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleID: item.art_id },
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'

export default {
  name: 'SearchResult',

  props: {
    keywords: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      loading: false,
      page: 1,
      perPage: 20,
      results: [],
      finished: false,
      error: false
    }
  },

  methods: {
    async getResults () {
      try {
        // 发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 保存数据
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        // 关闭loadi
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
