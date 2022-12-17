<template>
  <div class="login-container">
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名:"
        name="用户名"
        placeholder="用户名"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        v-model="password"
        label="密码:"
        name="密码"
        placeholder="密码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
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
export default {
  // eslint-disable-next-line
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (val) {
      console.log(val)
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
