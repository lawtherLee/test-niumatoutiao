<template>
  <div>
    <van-icon
      :color="value ? '#ffa500' : ''"
      :name="value ? 'star' : 'star-o'"
      @click="onCollect"
    ></van-icon>
  </div>
</template>

<script>
import { addCollectAPI, deleteCollectAPI } from '@/api'

export default {
  name: 'collectArticle',

  data () {
    return {
      loading: false
    }
  },

  props: {
    value: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    async onCollect () {
      try {
        // 如果收藏了 业务为取消收藏
        if (this.value) {
          await deleteCollectAPI(this.$route.query.articleID)
        } else {
          await addCollectAPI(this.$route.query.articleID)
        }
        // 更新视图
        console.log(!this.value)
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (error) {
        this.$toast('操作失败请重试')
      }
    }
  }
}
</script>

<style scoped></style>
