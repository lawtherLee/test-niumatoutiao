<template>
  <div class="article">
    <van-pull-refresh v-model="refreshingLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        :error.sync="error"
        :finished="finished"
        :immediate-check="false"
        error-text="加载失败请重试"
        finished-text="----我是有底线的----"
        offset="100"
        @load="getNextPageArticle"
      >
        <article-item
          v-for="item in articles"
          :key="item.id"
          :article="item"
          @goDetail="
            $router.push({
              path: '/detail',
              query: { articleID: item.art_id },
            })
          "
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from '@/views/Home/components/ArticleItem'

export default {
  name: 'ArticleList',

  props: {
    id: [Number, String]
  },

  data () {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshingLoading: false
    }
  },

  components: { ArticleItem },

  created () {
    this.getFirstPageArticle()
  },

  methods: {
    async getFirstPageArticle () {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
        // 保存下一页时间戳 用于分页
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js错误上抛 507原封不动上抛 400上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },

    // 滑动加载下一页
    async getNextPageArticle () {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 发送请求获取下一页数据
        const { data } = await getArticles(this.id, this.preTimestamp)
        // 如果没有数据 停止渲染页面 显示底部文案
        if (!data.data.pre_timestamp) this.finished = true
        // 将数据添加到 articles 判断用户上滑还是下拉
        if (this.refreshingLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 更改loading/refreshingLoading
        this.loading = false
        this.refreshingLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
