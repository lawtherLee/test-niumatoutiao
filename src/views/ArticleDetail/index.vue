<template>
  <div class="article-container markdown-body">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="detileObj.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ detileObj.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell :border="false" center class="user-info">
          <van-image
            slot="icon"
            :src="detileObj.aut_photo"
            class="avatar"
            fit="cover"
            round
          />
          <div slot="title" class="user-name">{{ detileObj.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ timeAgo(detileObj.pubdate) }}
          </div>
          <van-button
            v-if="detileObj.is_followed === false"
            class="follow-btn"
            color="#3296fa"
            icon="plus"
            round
            size="small"
            type="info"
            @click="followed(0)"
            >关注
          </van-button>
          <van-button
            v-else
            class="follow-btn"
            round
            size="small"
            @click="followed(1)"
            >已关注
          </van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" v-html="detileObj.content">
          这是文章内容
        </div>
        <van-divider>正文结束</van-divider>

        <!--        文章评论-->
        <comment-list @onload-success="totalCount = $event"></comment-list>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadDetile">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" round size="small" type="default"
        >写评论
      </van-button>
      <van-icon color="#777" info="123" name="comment-o" />
      <collect-article v-model="detileObj.is_collected"></collect-article>
      <van-icon color="#777" name="good-job-o" />
      <van-icon color="#777" name="share"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getDetailAPI, userFollowedAPI, userUnFollowedAPI } from '@/api'
import { timeAgo } from '@/utils/dayjs'
import 'github-markdown-css/github-markdown-dark.css'
import CollectArticle from './components/CollectArticle'
import CommentList from '@/views/ArticleDetail/components/CommentList'

export default {
  name: 'ArticleIndex',
  components: { CommentList, CollectArticle },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      detileObj: {},
      isLoading: true,
      errStatus: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDetail()
    this.loadDetile()
  },
  mounted () {},
  methods: {
    // 格式化时间
    timeAgo,

    // 请求文章详情数据
    async getDetail () {
      const { data } = await getDetailAPI(this.articleId)
      this.detileObj = data.data
      console.log(this.detileObj)
    },

    // 关注状态切换
    async followed (cut) {
      if (cut === 0) {
        // 用户点已关注按钮
        // 页面显示关注按钮
        // 业务 取关 调取关接口
        this.detileObj.is_followed = true
        await userFollowedAPI(this.detileObj.aut_id)
      } else {
        this.detileObj.is_followed = false
        await userUnFollowedAPI(this.detileObj.aut_id)
      }
    },

    // 首次加载展示状态
    async loadDetile () {
      try {
        await this.getDetail()
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取失败')
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .page-nav-bar {
    background-color: #5094f3;
    color: white;

    :deep(.van-nav-bar__title) {
      color: #fff !important;
    }

    :deep(.van-icon) {
      color: #fff !important;
    }
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    .van-icon {
      font-size: 40px;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
