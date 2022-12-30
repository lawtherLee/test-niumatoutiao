<template>
  <div class="article-comments">
    <!--    评论列表-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="The End"
      @load="onload"
    >
      <van-cell v-for="item in list" :key="item.art_id">
        <!--        评论项-->
        <comment-item
          v-for="item in list"
          :key="item.art_id"
          :comment="item"
        ></comment-item>
        <!--        /评论项-->
      </van-cell>
    </van-list>
    <!--    /评论列表-->
  </div>
</template>

<script>
import { getCommentsAPI } from '@/api'
import CommentItem from '@/views/ArticleDetail/components/CommentItem'

export default {
  name: 'commentList',
  components: { CommentItem },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      offset: null, // 请求下一页数据的页码
      totalCount: 0 // 总数据条数,
    }
  },

  methods: {
    async onload () {
      const { data } = await getCommentsAPI({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.$route.query.articleID, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      // 将数据添加到列表
      const { results } = data.data
      this.list.push(...results)
      // 更新数据总条数
      this.totalCount = data.data.total_count
      // 3. 将加载更多的 loading 设置为 false
      this.loading = false
      // 4. 判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，关闭加载更多
      }
      this.$emit('onload-success', this.totalCount)
    }
  }
}
</script>

<style scoped></style>
