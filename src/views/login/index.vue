<template>
  <div class="login-container">
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    />
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        clearable
        label="手机号:"
        maxlength="11"
        name="mobile"
        placeholder="请输入手机号"
        required
        type="number"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        :rules="userFormRules.code"
        label="验证码:"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        required
        type="number"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" native-type="button" round size="small" type="default" @click="onSendSms">
            发送验证码
          </van-button>
        </template>
      </van-field>

      <!--      提交按钮-->
      <div class="login-btn-wrap">
        <van-button block class="login-btn" native-type="submit" type="info">提交</van-button>
      </div>
      <!--/      提交按钮-->
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
import { Toast } from 'vant'

export default {
  // eslint-disable-next-line
  name: 'login',
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
          message: '手机格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }

    }
  },
  methods: {
    async onSubmit () {
      Toast({
        duration: 0,
        forbidClick: true,
        message: 'loading...'
      })
      try {
        const user = this.user
        const res = await loginAPI(user)
        Toast.success('登录成功')
        console.log('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
        if (err.response.status === 400) {
          Toast.fail('手机号或验证码错误')
        } else {
          Toast.fail('登录失败')
        }
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.login-container {
  ::v-deep .van-field__label {
    width: 4.9em !important;
  }

  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 170px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 20px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
