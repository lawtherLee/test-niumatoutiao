<template>
  <div class="profile">
    <!--    头部-->
    <header>
      <!--      登录状态的结构-->
      <div v-if="isLogin" class="login banner">
        <!--        占位-->
        <van-row></van-row>
        <!--        用户信息-->
        <van-row>
          <van-col span="12">
            <van-row
              align="center"
              justify="space-around"
              style="height: 100%"
              type="flex"
            >
              <!--              用户头像-->
              <van-image
                :src="userInfo.photo"
                height="1.5rem"
                round
                width="1.5rem"
              />
              <!--              用户昵称-->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <!--          占位-->
          <van-col span="7"></van-col>
          <!--          编辑按钮-->
          <van-col span="5">
            <van-row
              align="center"
              justify="center"
              style="height: 100%"
              type="flex"
            >
              <van-button class="edit-btn" round size="mini"
                >编辑按钮
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <!--        用户信息-->
        <van-row>
          <van-grid :border="false" class="grad">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>

      <!--      未登录状态的结构-->
      <div v-else class="logout banner" @click="$router.push('/login')">
        <van-image :src="mobileSrc" height="1.76rem" width="1.76rem" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>

    <!--    主体-->
    <main>
      <van-grid clickable column-num="2">
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>

      <div class="link">
        <van-cell is-link title="消息通知" />
        <van-cell is-link title="小志同学" />
      </div>
    </main>

    <!--    底部退出-->
    <footer>
      <van-button v-if="isLogin" block style="color: red" @click="logout"
        >退出
      </van-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
import { getUserInfoAPI } from '@/api'

export default {
  name: 'My',
  data () {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  methods: {
    // 退出弹窗提示
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '黑马头条',
          message: '确认退出吗'
        })
        this.$store.commit('SET_TOKEN', {})
      } catch (err) {}
    },

    async getUserInfo () {
      try {
        // 用户登录了继续
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {
    // 判断用户是否登录了
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  background-color: #f5f7f9;

  .toutiao {
    font-size: 40px;
  }

  .toutiao-lishi {
    color: orange;
  }

  .toutiao-shoucang {
    color: orangered;
  }

  .link {
    margin: 20px 0;
  }
}

.banner {
  background: url("../../assets/images/banner.png") no-repeat 0 0 / cover;
  height: 5.33333rem;
  width: 100%;
}

.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    font-size: 30px;
    color: white;
    margin-top: 10px;
  }
}

.login {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;
  }

  .mobile {
    font-size: 30px;
    color: white;
  }

  .van-col {
    height: 100%;
  }

  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666666;
    border: 0 solid white;
  }

  :deep(.grad) {
    color: white;

    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }

    .van-grid-item__text {
      color: white;
    }
  }
}
</style>
