<template>
  <div>
    <!--    没有图片-->
    <van-cell
      v-if="article.cover.type === 0"
      :label="label"
      :title="article.title"
    />
    <!--    一张图片-->
    <van-cell
      v-else-if="article.cover.type === 1"
      :label="label"
      :title="article.title"
    >
      <van-image :src="article.cover.images[0]" height="100" width="100" />
    </van-cell>
    <!--    三张图片-->
    <van-cell v-else :title="article.title">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          :src="item"
          height="100"
          width="100"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    /* eslint-disable */
    label() {
      const { aut_name, comm_count, pubdate } = this.article;
      return `${aut_name} ${comm_count}评论 ${pubdate}`;
    },
  },
};
</script>

<style scoped></style>
