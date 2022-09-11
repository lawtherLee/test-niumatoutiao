<template>
  <div>
    <van-nav-bar class="nav-bar" title="登录"/>

    <van-form ref="form" class="form" @submit="onSubmit">
      <!--手机号-->
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        placeholder="请输入手机号"
      >
        <!--        字体图标-->
        <template #label><span class="toutiao toutiao-shouji"></span></template>
      </van-field>

      <!--验证码-->
      <van-field
        v-model="code"
        :rules="codeRules"
        name="code"
        placeholder="请输入验证码"
      >
        <!--        字体图标-->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span
          ></template>

        <!--        发送验证码-->
        <template #button>
          <van-button
            v-if="isShowCodeBtn"
            block
            class="btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="sendCode"
          >发送验证码
          </van-button>

          <!--          发送倒计时-->
          <van-count-down
            v-else
            :time="5 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>

      <!--      登录按钮-->
      <div style="margin: 16px">
        <van-button block native-type="submit" type="info">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from '@/views/Login/rule'
// 引入API
import { login, sendCodeAPI } from '@/api'
// 引入vuex
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    loading () {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
    },
    ...mapMutations(['SET_TOKEN']),
    // 表单校验通过后触发
    async onSubmit () {
      // loading 轻提示
      this.loading()
      try {
        // 登录
        const { data } = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        // 跳转页面
        this.$router.push('/profile')
        // 成功的提示s
        this.$toast.success('登录成功')
      } catch (error) {
        // error：1、js报错 2、axios封装的error对象
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 1.js导致报错
          // 2、507
          this.$toast.clear()
          throw error
        }
      }
    },

    async sendCode () {
      // 验证用户是否输入有效手机号
      //  - form绑定ref
      //  - $refs.form.validate()
      await this.$refs.form.validate('mobile')

      this.loading()
      // 发送请求
      try {
        await sendCodeAPI(this.mobile)

        // 显示倒计时组件
        this.isShowCodeBtn = false

        this.$toast.success('发送成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: white;
    font-weight: 400;
  }
}

:deep(.form) {
  .van-cell__title {
    flex: 1;
  }

  .van-cell__value {
    flex: 20;
  }

  .toutiao {
    font-size: 40px;
  }

  .btn {
    height: 0.64rem;
    background-color: #eee;
    color: #9a6e3a;
  }
}
</style>
