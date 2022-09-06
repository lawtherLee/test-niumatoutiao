<template>
  <div>
    <van-nav-bar class="nav-bar" title="登录" />

    <van-form class="form" @submit="onSubmit">
      <!--手机号-->
      <van-field
        v-model="mobile"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式错误',
          },
        ]"
        name="mobile"
        placeholder="请输入手机号"
      >
        <template #label><span class="toutiao toutiao-shouji"></span></template>
      </van-field>

      <!--验证码-->
      <van-field
        v-model="code"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /0-9{6}/, message: '验证码格式错误' },
        ]"
        name="code"
        placeholder="请输入验证码"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span
        ></template>
      </van-field>

      <!--      登录按钮-->
      <div style="margin: 16px">
        <van-button block native-type="submit" type="info">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
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
}
</style>
