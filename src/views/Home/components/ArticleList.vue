<template>
  <div>
    <article-item
      v-for="item in articles"
      :key="item.id"
      :article="item"
    ></article-item>
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
      articles: []
    }
  },
  components: { ArticleItem },
  created () {
    this.firstPage()
  },
  methods: {
    async firstPage () {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
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
    }
  }
}
</script>

<style scoped></style>
