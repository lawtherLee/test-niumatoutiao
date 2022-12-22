<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="isLogin" class="userInfo header">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image
            class="avatar"
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="name">黑马头条</span>
        </div>
        <div class="right">
          <van-button round size="mini" type="default">编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data"></div>
    </div>
    <!--    未登录-->
    <div v-else class="header">
      <img
        alt=""
        class="mobile-img"
        src="@/assets/images/mobile.png"
        @click="$router.push('/login')">
    </div>

    <div class="grid-nav"></div>
    <van-cell is-link title="消息通知" url=""/>
    <van-cell is-link title="实名认证" url=""/>
    <van-cell is-link title="用户反馈" url=""/>
    <van-cell is-link title="小智同学" url=""/>
    <van-cell is-link title="系统设置" url=""/>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  components: {},
  props: {},
  data () {
    return {
      isLogin: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.my-container {
  > .header {
    height: 361px;
    background: url("~@/assets/images/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .mobile-img {
      width: 132px;
      height: 132px;
    }
  }

  .header {
    width: 750px;
    height: 401px;
    background: url('~@/assets/images/banner.png');
    background-size: cover;
  }

  .userInfo {
    background: red;

    .base {
      height: 231px;
      padding: 76px 32px 23px;
      background: #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }

        .name {
          font-size: 29px;
          margin-left: 22px;
        }
      }
    }
  }
}
</style>
