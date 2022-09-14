<template>
  <div>
    <!--    搜索框-->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button block icon="search" round size="small">搜索</van-button>
      </template>
    </van-nav-bar>

    <!--    选项卡/内容区-->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!--        文章详情-->
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>

    <!--    弹出层-->
    <van-popup
      v-model="isShow"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
      closeable
      position="bottom"
    >
      <channel-edit
        v-if="isShow"
        :my-channels="channels"
        @change-active="[(isShow = false), (active = $event)]"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
// 1. ?? 相当于 ｜｜ 常用于语句
// 2. ?. 可选链操作符，？前面是udf 那不会往后取值
// 引入API
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from '@/views/Home/components/ArticleList'
import ChannelEdit from '@/views/Home/components/ChannelEdit'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'index',

  components: { ArticleList, ChannelEdit },

  data() {
    return {
      active: 2,
      channels: [],
      isShow: false
    }
  },

  created() {
    this.initChannels()
  },

  computed: {
    ...mapGetters(['isLogin'])
  },

  methods: {
    ...mapMutations(['SET_MY_CHANNEL']),

    initChannels() {
      if (this.isLogin) {
        // 如果登录了 channels发请求获取用户自己的频道
        this.getChannel()
      } else {
        // 如果未登录 本地有数据 channels用本地数据
        // 没有数据发请求获取默认频道数据
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = myChannels
        }
      }
    },

    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('服务端异常请刷新')
        }
      }
    },

    // 删除频道
    async delChannel(id) {
      try {
        const newChannels = (this.channels = this.channels.filter(
          (item) => item.id !== id
        ))
        // 1.发送请求删除频道
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          this.SET_MY_CHANNEL(newChannels)
        }
        // 2 视图层删除频道
        this.channels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录在删除')
        } else {
          throw error
        }
      }
    },

    // 添加频道
    async addChannel(channel) {
      try {
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          this.SET_MY_CHANNEL([...this.channels, channel])
        }
        this.channels.push(channel)
        this.$toast.success('添加频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录在添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }

  .van-button--block {
    width: 7.4rem;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */

    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */

    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url("~@/assets/images/gradient-gray-line.png");
  }
}
</style>
